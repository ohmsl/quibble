import { isSameDay } from "date-fns";
import type { EventsRecord } from "../../../types/Events/Event";

export const areEventsOnDay = (events: Array<EventsRecord>, day: Date) => {
    const dayEvents = events.filter((event) => {
        const date = new Date(event.date);
        return isSameDay(date, day);
    });
    return dayEvents.length > 0;
};
