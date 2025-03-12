import { v4 as uuid } from "uuid";
import { StateCreator } from "zustand";
import { StoredEvent } from "../../../types/Events/Event";

type EventsState = {
    events: Array<StoredEvent>;
};

type EventsActions = {
    addEvent: (event: Omit<StoredEvent, "id">) => void;
    updateEvent: (id: string, event: Partial<StoredEvent>) => void;
    removeEvent: (id: string) => void;
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

    // Actions
    addEvent: (event) => {
        set((state) => ({
            events: [...state.events, { ...event, id: uuid() }],
        }));
    },
    updateEvent: (id, event) => {
        set((state) => ({
            events: state.events.map((e) => (e.id === id ? { ...e, ...event } : e)),
        }));
    },
    removeEvent: (id) => {
        set((state) => ({
            events: state.events.filter((event) => event.id !== id),
        }));
    },
});

export const selectEvents = (state: EventsSlice) => state.events;
