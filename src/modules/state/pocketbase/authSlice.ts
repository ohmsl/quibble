import { jwtDecode } from "jwt-decode";
import type { StateCreator } from "zustand";
import {
    LoginParams,
    OauthLoginParams,
    PasswordLoginParams,
} from "../../../types/auth/LoginParams";
import {
    Collections,
    MembersRecord,
    OrganisationsRecord,
    UsersRecord,
} from "../../../types/pb_types";
import pb from "../../pocketbase/pb";

export interface AuthSlice {
    isAuthenticated: boolean;
    user: UsersRecord | null;
    token: string | null;

    // Auth state indicators
    isLoading: boolean;
    error: string | null;

    // Actions
    registerUser: (data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) => Promise<void>;

    registerOrganisation: (name: string) => Promise<void>;

    login: (params: LoginParams) => Promise<void>;
    logout: () => void;
    refreshToken: () => Promise<void>;
    refreshAuthState: () => void;
}

const fiveMinutesInMs = 5 * 60 * 1000;

async function loginWithPassword(data: PasswordLoginParams) {
    return await pb
        .collection("users")
        .authWithPassword(data.email, data.password);
}

async function loginWithOauth(data: OauthLoginParams) {
    return await pb
        .collection("users")
        .authWithOAuth2({ provider: data.provider });
}

export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => {
    const initializeAuthState = () => {
        set({
            isAuthenticated: pb.authStore.isValid,
            user: pb.authStore.record as any,
            token: pb.authStore.token,
        });
    };

    const startProactiveTokenRefresh = () => {
        const intervalId = setInterval(async () => {
            const { token, refreshToken } = get();
            if (!token) return;

            const decoded = jwtDecode<{ exp: number }>(token);
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);

            // Refresh if the token is close to expiring
            if (decoded.exp - currentTimeInSeconds <= 5 * 60) {
                try {
                    await refreshToken();
                } catch (error) {
                    console.error(
                        "Token refresh failed, this may cause an unexpected logout.",
                        error,
                    );
                }
            }
        }, fiveMinutesInMs);

        return intervalId;
    };

    pb.authStore.onChange((token, user) => {
        set({
            token,
            user: user as any,
            isAuthenticated: pb.authStore.isValid,
        });

        if (token) {
            startProactiveTokenRefresh();
        }
    });

    return {
        isAuthenticated: pb.authStore.isValid,
        user: pb.authStore.record as any,
        token: pb.authStore.token,
        isLoading: false,
        error: null,

        registerUser: async (data) => {
            set({ isLoading: true, error: null });
            try {
                await pb.collection("users").create({
                    name: `${data.firstName} ${data.lastName}`,
                    email: data.email,
                    password: data.password,
                    passwordConfirm: data.password,
                });

                const result = await loginWithPassword({
                    email: data.email,
                    password: data.password,
                });

                if (!result.record) {
                    throw new Error("Registration failed");
                }

                set({ isLoading: false, error: null });
            } catch (error) {
                set({
                    isLoading: false,
                    // error: error instanceof Error ? error.message : 'Registration failed',
                });
                throw error;
            }
        },

        registerOrganisation: async (name) => {
            const userId = get().user?.id;
            if (!userId) throw new Error("Not logged in");

            set({ isLoading: true, error: null });
            try {
                await pb
                    .collection<OrganisationsRecord>(Collections.Organisations)
                    .create({ name, owner_id: userId });

                set({ isLoading: false, error: null });
            } catch (error) {
                set({
                    isLoading: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Failed to register organisation",
                });
                throw error;
            }
            set({ isLoading: false, error: null });
        },

        login: async (params) => {
            set({ isLoading: true, error: null });
            try {
                switch (params.method) {
                    case "password":
                        await loginWithPassword(params);
                        break;
                    case "oauth":
                        await loginWithOauth(params);
                        break;
                    default:
                        throw new Error("Invalid login method");
                }

                set({ isLoading: false, error: null });
            } catch (error) {
                set({
                    isLoading: false,
                    // error: error instanceof Error ? error.message : 'Login failed',
                });
                throw error;
            }
        },

        logout: () => {
            pb.authStore.clear();
            set({ user: null, token: null, isAuthenticated: false });
            clearInterval(startProactiveTokenRefresh());
        },

        createOrganisation: async (data: { name: string }) => {
            try {
                await pb
                    .collection<OrganisationsRecord>(Collections.Organisations)
                    .create(data);
            } catch {
                set({ isLoading: false });
            }
        },

        refreshToken: async () => {
            try {
                const authData = await pb
                    .collection("users")
                    .authRefresh<UsersRecord>();
                set({
                    token: authData.token,
                    user: authData.record,
                    isAuthenticated: true,
                });
            } catch (error) {
                console.error("Token refresh failed:", error);
                throw error;
            }
        },

        refreshAuthState: () => {
            initializeAuthState();
        },
    };
};
