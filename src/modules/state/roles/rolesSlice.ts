import { createSelector } from "reselect";
import { toast } from "sonner";
import type { StateCreator } from "zustand";
import { Collections, type RolesRecord } from "../../../types/pb_types";
import { generateId } from "../../../utils/generateId";
import { createScopedLogger } from "../../../utils/logger";
import pb from "../../pocketbase/pb";
import { useAppState } from "../useAppState";
import { createScopedCrudMethods } from "../utils/crud/createScopedCrudMethods";
import { subscribeToCollection } from "../utils/subscribeToCollection";

type RolesState = {
    roles: Array<RolesRecord>;
    loading: boolean;
};

type RolesActions = {
    fetchRoles: () => Promise<void>;
    addRole: (role: RolesRecord) => Promise<void>;
    updateRole: (id: string, role: RolesRecord) => void;
    removeRole: (id: string) => void;
};

export type RolesSlice = RolesState & RolesActions;

export const createRolesSlice: StateCreator<RolesSlice, [], [], RolesSlice> = (
    set,
    get,
) => {
    subscribeToCollection("roles", "*", set, get);
    const logger = createScopedLogger("rolesSlice");
    const { insert, upsert, remove } = createScopedCrudMethods(
        set,
        get,
        "roles",
    );

    return {
        // State
        roles: [],
        loading: false,

        // Actions
        fetchRoles: async () => {
            set({ loading: true });
            try {
                const roles = await pb
                    .collection<RolesRecord>(Collections.Roles)
                    .getFullList();
                set({ roles, loading: false });
            } catch (error) {
                logger.error("Error fetching roles:", error);
                toast.error("Failed to fetch roles");
                set({ loading: false });
            }
        },

        addRole: async (roleData: RolesRecord) => {
            const org_id = useAppState.getState().orgId;
            const id = generateId();

            const role: RolesRecord = {
                ...roleData,
                org_id,
                id,
            };

            try {
                insert(role);
                await pb.collection(Collections.Roles).create(role);
            } catch (error) {
                logger.error("Error adding role:", error);
                toast.error("Failed to add role");

                remove(role.id);
            }
        },

        updateRole: async (id: string, role: RolesRecord) => {
            const originalRecord = get().roles.find((r) => r.id === id);

            try {
                upsert(role);

                await pb
                    .collection<RolesRecord>(Collections.Roles)
                    .update(id, role);
            } catch (error) {
                logger.error("Error updating role:", error);
                toast.error("Failed to update role");

                if (originalRecord) upsert(originalRecord);
            }
        },

        removeRole: async (id: string) => {
            const originalRecord = get().roles.find((r) => r.id === id);

            try {
                remove(id);
                await pb.collection<RolesRecord>(Collections.Roles).delete(id);
            } catch (error) {
                logger.error("Error removing role:", error);
                toast.error("Failed to remove role");

                if (originalRecord) insert(originalRecord);
            }
        },
    };
};

export const selectRoles = createSelector(
    (state: RolesSlice) => state.roles,
    (roles) => roles,
);
