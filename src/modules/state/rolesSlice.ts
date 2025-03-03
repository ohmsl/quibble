import { StateCreator } from "zustand";
import { Role } from "../../types/Role";

type RolesState = {
    roles: Array<Role>;
};

type RolesActions = {
    addRole: (role: Role) => void;
    updateRole: (role: Role) => void;
    removeRole: (id: string) => void;
};

export type RolesSlice = RolesState & RolesActions;

export const createRolesSlice: StateCreator<RolesSlice, [], [], RolesSlice> = (
    set,
) => ({
    // State
    roles: [],

    // Actions
    addRole: (role: Role) => {
        set((state) => ({ roles: [...state.roles, role] }));
    },
    updateRole: (role: Role) => {
        set((state) => ({
            roles: state.roles.map((r) => (r.name === role.name ? role : r)),
        }));
    },
    removeRole: (name: string) => {
        set((state) => ({
            roles: state.roles.filter((role) => role.name !== name),
        }));
    },
});
