// modules/state/events/projectMeetingEvents.ts

import { addDays, startOfDay } from "date-fns";
import type { EnrichedEvent } from "../../../types/Events/Event";
import { ProjectedMeetingEvent } from "./concretiseProjectedEvent";

/**
 * Generates projected meeting events based on the provided settings.
 *
 * @param settings - The user's meeting settings.
 * @param rangeStart - The start date of the projection range.
 * @param rangeEnd - The end date of the projection range.
 * @returns An array of projected meeting events.
 * @throws Error if rangeEnd is earlier than rangeStart.
 */
export function projectMeetingEvents(
    settings: {
        midweekMeetingDay: number;
        weekendMeetingDay: number;
    },
    rangeStart: Date,
    rangeEnd: Date,
): Array<EnrichedEvent> {
    if (rangeEnd < rangeStart) {
        throw new Error("rangeEnd must be greater than or equal to rangeStart");
    }
    const projectedEvents = new Array<ProjectedMeetingEvent>();

    // Iterate through each day in the date range.
    for (
        let currentDate: Date = startOfDay(rangeStart);
        currentDate <= rangeEnd;
        currentDate = addDays(currentDate, 1)
    ) {
        const weekday: number = currentDate.getDay();

        if (weekday === settings.midweekMeetingDay) {
            projectedEvents.push({
                id: "",
                title: "Midweek Meeting",
                date: currentDate.toISOString(),
                requiredRoles: [],
                type: "midweek",
                projected: true,
            });
        } else if (weekday === settings.weekendMeetingDay) {
            projectedEvents.push({
                id: "",
                title: "Weekend Meeting",
                date: currentDate.toISOString(),
                requiredRoles: [],
                type: "weekend",
                projected: true,
            });
        }
    }

    return projectedEvents;
}
