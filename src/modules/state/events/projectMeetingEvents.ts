import { addDays, startOfDay } from "date-fns";
import { v4 as uuid } from "uuid";
import { EventsRecord } from "../../../types/pb_types";
import { ProjectedEvent } from "./concretiseProjectedEvent";

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
        midweekRequiredRoles?: Array<string>;
        weekendRequiredRoles?: Array<string>;
    },
    rangeStart: Date,
    rangeEnd: Date,
): Array<EventsRecord> {
    if (rangeEnd < rangeStart) {
        throw new Error("rangeEnd must be greater than or equal to rangeStart");
    }
    const projectedEvents = new Array<ProjectedEvent>();

    // Iterate through each day in the date range.
    for (
        let currentDate: Date = startOfDay(rangeStart);
        currentDate <= rangeEnd;
        currentDate = addDays(currentDate, 1)
    ) {
        const weekday: number = currentDate.getDay();

        if (weekday === settings.midweekMeetingDay) {
            projectedEvents.push({
                title: "Midweek Meeting",
                date: currentDate.toISOString(),
                required_role_ids: settings.midweekRequiredRoles || [],
                projected: true,
            });
        } else if (weekday === settings.weekendMeetingDay) {
            projectedEvents.push({
                title: "Weekend Meeting",
                date: currentDate.toISOString(),
                required_role_ids: settings.weekendRequiredRoles || [],
                projected: true,
            });
        }
    }

    return projectedEvents;
}
