import { createSelector } from "reselect";
import { toast } from "sonner";
import { StateCreator } from "zustand";
import { EventsRecord } from "../../../types/pb_types";
import { generateId } from "../../../utils/generateId";
import { createScopedLogger } from "../../../utils/logger";
import pb from "../../pocketbase/pb";
import { useAppState } from "../useAppState";
import { createScopedCrudMethods } from "../utils/crud/createScopedCrudMethods";
import { subscribeToCollection } from "../utils/subscribeToCollection";

type EventsState = {
    events: Array<EventsRecord>;
    loading: boolean;
};

type EventsActions = {
    fetchEvents: () => Promise<void>;
    addEvent: (event: EventsRecord) => Promise<void>;
    updateEvent: (id: string, event: EventsRecord) => Promise<void>;
    removeEvent: (id: string) => Promise<void>;
};

export type EventsSlice = EventsState & EventsActions;

export const createEventsSlice: StateCreator<
    EventsSlice,
    [],
    [],
    EventsSlice
> = (set, get) => {
    subscribeToCollection("events", "*", set, get);
    const logger = createScopedLogger("eventsSlice");
    const { insert, upsert, remove } = createScopedCrudMethods(
        set,
        get,
        "events",
    );

    return {
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

        addEvent: async (eventData) => {
            const id = generateId();
            const org_id = useAppState.getState().orgId;
            if (!org_id) throw new Error("Organization ID not found");

            const event = {
                ...eventData,
                org_id,
                id,
            } as EventsRecord;

            try {
                insert(event);

                await pb
                    .collection<EventsRecord>("events")
                    .create({ ...event, org_id });
            } catch (error) {
                console.error("Error adding event:", error);
                toast.error("Failed to add event");

                remove(event.id);
            }
        },

        updateEvent: async (id, event) => {
            const originalRecord = get().events.find((r) => r.id === id);

            try {
                upsert(event);

                await pb.collection<EventsRecord>("events").update(id, event);
            } catch (error) {
                console.error("Error updating event:", error);
                toast.error("Failed to update event");

                if (originalRecord) upsert(originalRecord);
            }
        },

        removeEvent: async (id) => {
            const originalRecord = get().events.find((r) => r.id === id);

            try {
                remove(id);

                await pb.collection("events").delete(id);
                set({ events: get().events.filter((e) => e.id !== id) });
            } catch (error) {
                console.error("Error removing event:", error);
                toast.error("Failed to remove event");

                if (originalRecord) upsert(originalRecord);
            }
        },
    };
};

export const selectEvents = createSelector(
    (state: EventsSlice) => state.events,
    (events) => events,
);
