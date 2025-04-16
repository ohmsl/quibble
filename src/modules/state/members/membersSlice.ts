import { StateCreator } from 'zustand';
import { MembersRecord } from '../../../types/pb_types';
import pb from '../../pocketbase/pb';
import { subscribeToCollection } from '../utils/subscribeToCollection';

export type MembersState = {
    members: Array<MembersRecord>;
    loading: boolean;
};

export type MembersActions = {
    fetchMembers: () => Promise<void>;
    addMember: (member: Omit<MembersRecord, 'id'>) => Promise<void>;
    updateMember: (id: string, member: Partial<MembersRecord>) => Promise<void>;
    removeMember: (id: string) => Promise<void>;
};

export type MembersSlice = MembersState & MembersActions;

export const createMembersSlice: StateCreator<MembersSlice, [], [], MembersSlice> = set => {
    subscribeToCollection('members', '*', set);

    return {
        members: [],
        loading: false,

        fetchMembers: async () => {
            set({ loading: true });
            try {
                const members = await pb.collection<MembersRecord>('members').getFullList();
                set({ members, loading: false });
            } catch (error: unknown) {
                console.error('Error fetching members:', error);
                set({ loading: false });
            }
        },

        /**
         * Add a new member.
         * @param member - Member data without the id.
         */
        addMember: async (member: Omit<MembersRecord, 'id'>) => {
            try {
                const createdMember = await pb.collection<MembersRecord>('members').create(member);
                set(state => ({ members: [...state.members, createdMember] }));
            } catch (error: unknown) {
                console.error('Error adding member:', error);
            }
        },

        /**
         * Update an existing member.
         * @param id - ID of the member.
         * @param member - Partial member data to update.
         */
        updateMember: async (id: string, member: Partial<MembersRecord>) => {
            try {
                const updatedMember = await pb.collection<MembersRecord>('members').update(id, member);
                set(state => ({
                    members: state.members.map(p => (p.id === id ? updatedMember : p)),
                }));
            } catch (error: unknown) {
                console.error('Error updating member:', error);
            }
        },

        /**
         * Remove a member.
         * @param id - ID of the member to remove.  */
        removeMember: async (id: string) => {
            try {
                await pb.collection('members').delete(id);
                set(state => ({
                    members: state.members.filter(p => p.id !== id),
                }));
            } catch (error: unknown) {
                console.error('Error removing member:', error);
            }
        },
    };
};
