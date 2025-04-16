import { createSelector } from 'reselect';
import { StateCreator } from 'zustand';
import { EventsRecord } from '../../../types/pb_types';
import pb from '../../pocketbase/pb';
import { useAppState } from '../useAppState';
import { subscribeToCollection } from '../utils/subscribeToCollection';

type EventsState = {
    events: Array<EventsRecord>;
    loading: boolean;
};

type EventsActions = {
    fetchEvents: () => Promise<void>;
    addEvent: (event: Omit<EventsRecord, 'id' | 'user_id' | 'org_id' | 'owner_id' | 'created' | 'updated'>) => Promise<void>;
    updateEvent: (id: string, event: Partial<EventsRecord>) => Promise<void>;
    removeEvent: (id: string) => Promise<void>;
};

export type EventsSlice = EventsState & EventsActions;

export const createEventsSlice: StateCreator<EventsSlice, [], [], EventsSlice> = set => {
    subscribeToCollection('events', '*', set);

    return {
        // State
        events: [],
        loading: false,

        // Actions
        fetchEvents: async () => {
            set({ loading: true });
            try {
                const events = await pb.collection<EventsRecord>('events').getFullList();
                set({ events, loading: false });
            } catch (error: unknown) {
                console.error('Error fetching events:', error);
                set({ loading: false });
            }
        },

        addEvent: async event => {
            try {
                const org_id = useAppState.getState().orgId;
                const createdEvent = await pb.collection<EventsRecord>('events').create({ ...event, org_id });
                handlers.create(createdEvent);
            } catch (error: unknown) {
                console.error('Error adding event:', error);
            }
        },

        updateEvent: async (id, event) => {
            try {
                const org_id = useAppState.getState().orgId;
                const updatedEvent = await pb.collection<EventsRecord>('events').update(id, { ...event, org_id });
                handlers.update(updatedEvent);
            } catch (error: unknown) {
                console.error('Error updating event:', error);
            }
        },

        removeEvent: async id => {
            try {
                await pb.collection('events').delete(id);
                handlers.delete(id);
            } catch (error: unknown) {
                console.error('Error removing event:', error);
            }
        },
    };
};

export const selectEvents = createSelector(
    (state: EventsSlice) => state.events,
    events => events,
);
