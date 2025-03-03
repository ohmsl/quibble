import { StateCreator } from "zustand";
import { MeetingEvent } from "../../types/Events/MeetingEvent";

type EventsState = {
    events: Array<MeetingEvent>;
};

type EventsActions = {
    addEvent: (event: MeetingEvent) => void;
    updateEvent: (id: string, event: MeetingEvent) => void;
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
    addEvent: (event: MeetingEvent) => {
        set((state) => ({ events: [...state.events, event] }));
    },
    updateEvent: (id: string, event: MeetingEvent) => {
        set((state) => ({
            events: state.events.map((e) => (e.id === id ? event : e)),
        }));
    },
    removeEvent: (id: string) => {
        set((state) => ({
            events: state.events.filter((event) => event.id !== id),
        }));
    },
});
