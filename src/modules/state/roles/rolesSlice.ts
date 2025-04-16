import { createSelector } from 'reselect';
import type { StateCreator } from 'zustand';
import type { Role } from '../../../types/Role';
import { Collections, type RolesRecord } from '../../../types/pb_types';
import pb from '../../pocketbase/pb';
import { useAppState } from '../useAppState';
import { subscribeToCollection } from '../utils/subscribeToCollection';

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

export const createRolesSlice: StateCreator<RolesSlice, [], [], RolesSlice> = (set, get) => {
    subscribeToCollection('roles', '*', set);

    return {
        // State
        roles: [],
        loading: false,

        // Actions
        fetchRoles: async () => {
            set({ loading: true });
            try {
                const roles = await pb.collection<RolesRecord>(Collections.Roles).getFullList();
                set({ roles, loading: false });
            } catch (error) {
                console.error('Error fetching roles:', error);
                set({ loading: false });
            }
        },

        addRole: async (role: RolesRecord) => {
            try {
                const org_id = useAppState.getState().orgId;

                const createdRole = await pb.collection(Collections.Roles).create({ ...role, org_id });
                set(state => ({ roles: [...state.roles, createdRole] }));
            } catch (error) {
                console.error('Error adding role:', error);
            }
        },

        updateRole: async (id: string, role: RolesRecord) => {
            try {
                const org_id = useAppState.getState().orgId;

                await pb.collection<RolesRecord>(Collections.Roles).update(id, { ...role, org_id });
                set(state => ({
                    roles: state.roles.map(r => (r.id === id ? role : r)),
                }));
            } catch (error) {
                console.error('Error updating role:', error);
            }
        },

        removeRole: async (id: string) => {
            try {
                await pb.collection<RolesRecord>(Collections.Roles).delete(id);
                const filteredRoles = get().roles.filter(role => role.id !== id);

                set({ roles: filteredRoles });
            } catch (error) {
                console.error('Error removing role:', error);
            }
        },
    };
};

export const selectRoles = createSelector(
    (state: RolesSlice) => state.roles,
    roles => roles,
);
