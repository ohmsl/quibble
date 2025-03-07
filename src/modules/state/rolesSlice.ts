import { v4 as uuid } from "uuid";
import { StateCreator } from "zustand";
import { Role } from "../../types/Role";

type RolesState = {
    roles: Array<Role>;
};

type RolesActions = {
    addRole: (role: Role) => void;
    updateRole: (id: string, role: Role) => void;
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
        set((state) => ({
            roles: [...state.roles, { ...role, id: uuid() }],
        }));
    },
    updateRole: (id: string, role: Role) => {
        set((state) => ({
            roles: state.roles.map((r) => (r.id === id ? role : r)),
        }));
    },
    removeRole: (id: string) => {
        set((state) => ({
            roles: state.roles.filter((role) => role.id !== id),
        }));
    },
});

export const selectRoles = (state: RolesSlice) => state.roles;
