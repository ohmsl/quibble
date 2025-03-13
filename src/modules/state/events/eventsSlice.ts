import { StateCreator } from "zustand";
import { EventsRecord } from "../../../types/pb_types";
import pb from "../../pocketbase/pb";

type EventsState = {
    events: Array<EventsRecord>;
    loading: boolean;
};

type EventsActions = {
    fetchEvents: () => Promise<void>;
    addEvent: (event: Omit<EventsRecord, "id">) => Promise<void>;
    updateEvent: (id: string, event: Partial<EventsRecord>) => Promise<void>;
    removeEvent: (id: string) => Promise<void>;
};

export type EventsSlice = EventsState & EventsActions;

export const createEventsSlice: StateCreator<
    EventsSlice,
    [],
    [],
    EventsSlice
> = (set) => ({
    // State
    events: [],
    loading: false,

    // Actions
    fetchEvents: async () => {
        set({ loading: true });
        try {
            const events = await pb
                .collection<EventsRecord>("events")
                .getFullList();
            set({ events, loading: false });
        } catch (error: unknown) {
            console.error("Error fetching events:", error);
            set({ loading: false });
        }
    },

    addEvent: async (event) => {
        try {
            const createdEvent = await pb
                .collection<EventsRecord>("events")
                .create(event);
            set((state) => ({ events: [...state.events, createdEvent] }));
        } catch (error: unknown) {
            console.error("Error adding event:", error);
        }
    },

    updateEvent: async (id, event) => {
        try {
            const updatedEvent = await pb
                .collection<EventsRecord>("events")
                .update(id, event);
            set((state) => ({
                events: state.events.map((e) =>
                    e.id === id ? updatedEvent : e,
                ),
            }));
        } catch (error: unknown) {
            console.error("Error updating event:", error);
        }
    },

    removeEvent: async (id) => {
        try {
            await pb.collection("events").delete(id);
            set((state) => ({
                events: state.events.filter((e) => e.id !== id),
            }));
        } catch (error: unknown) {
            console.error("Error removing event:", error);
        }
    },
});

export const selectEvents = (state: EventsSlice) => state.events;
