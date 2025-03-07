import { v4 as uuid } from "uuid";
import { StateCreator } from "zustand";
import { Event } from "../../../types/Events/Event";

type EventsState = {
    events: Array<Event>;
};

type EventsActions = {
    addEvent: (event: Omit<Event, "id">) => void;
    updateEvent: (id: string, event: Event) => void;
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
            events: state.events.map((e) => (e.id === id ? event : e)),
        }));
    },
    removeEvent: (id) => {
        set((state) => ({
            events: state.events.filter((event) => event.id !== id),
        }));
    },
});

export const selectEvents = (state: EventsSlice) => state.events;
