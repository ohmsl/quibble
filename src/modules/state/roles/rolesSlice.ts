import { StateCreator } from "zustand";
import { Role } from "../../../types/Role";
import { Collections, RolesRecord } from "../../../types/pb_types";
import pb from "../../pocketbase/pb";

type RolesState = {
    roles: Array<RolesRecord>;
    loading: boolean;
};

type RolesActions = {
    fetchRoles: () => Promise<void>;
    addRole: (role: Role) => Promise<void>;
    updateRole: (id: string, role: Role) => void;
    removeRole: (id: string) => void;
};

export type RolesSlice = RolesState & RolesActions;

export const createRolesSlice: StateCreator<RolesSlice, [], [], RolesSlice> = (
    set,
) => ({
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
            console.error("Error fetching roles:", error);
            set({ loading: false });
        }
    },

    addRole: async (role: Role) => {
        try {
            const createdRole = await pb
                .collection<RolesRecord>(Collections.Roles)
                .create(role);
            set((state) => ({ roles: [...state.roles, createdRole] }));
        } catch (error) {
            console.error("Error adding role:", error);
        }
    },

    updateRole: async (id: string, role: Role) => {
        try {
            await pb
                .collection<RolesRecord>(Collections.Roles)
                .update(id, role);
            set((state) => ({
                roles: state.roles.map((r) => (r.id === id ? role : r)),
            }));
        } catch (error) {
            console.error("Error updating role:", error);
        }
    },

    removeRole: async (id: string) => {
        try {
            await pb.collection<RolesRecord>(Collections.Roles).delete(id);
            set((state) => ({
                roles: state.roles.filter((role) => role.id !== id),
            }));
        } catch (error) {
            console.error("Error removing role:", error);
        }
    },
});

export const selectRoles = (state: RolesSlice) => state.roles;
