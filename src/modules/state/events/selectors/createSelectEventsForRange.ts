import { createSelector } from "reselect";
import { EnrichedEvent } from "../../../../types/Events/Event";
import { Role } from "../../../../types/Role";
import { selectRoles } from "../../rolesSlice";
import { selectMeetingSettings } from "../../settings/settingsSlice";
import { selectEvents } from "../eventsSlice";
import { projectMeetingEvents } from "../projectMeetingEvents";

/**
 * Creates a selector that returns the merged list of concrete events and projected meeting events
 * for the specified date range.
 *
 * @param rangeStart - The start date of the projection range.
 * @param rangeEnd - The end date of the projection range.
 * @returns A memoised selector that outputs an array of UIEvent.
 */
export const createSelectEventsForRange = (rangeStart: Date, rangeEnd: Date) =>
    createSelector(
        [selectEvents, selectRoles, selectMeetingSettings],
        (events, roles, settings): Array<EnrichedEvent> => {
            // Filter concrete events to only include those within the date range and map them to UIEvents with their associated roles.
            const concreteUIEvents: Array<EnrichedEvent> = events
                .filter((event) => {
                    const eventDate = new Date(event.date);
                    return eventDate >= rangeStart && eventDate <= rangeEnd;
                })
                .map((event) => {
                    const requiredRoles: Array<Role> = [];
                    for (const roleId of event.requiredRoleIds) {
                        const role = roles.find((r) => r.id === roleId);
                        if (role) requiredRoles.push(role);
                    }
                    return { ...event, requiredRoles };
                });

            // Generate projected meeting events based on user settings and the provided date range.
            const projectedEvents: Array<EnrichedEvent> = projectMeetingEvents(
                {
                    midweekMeetingDay: settings.midweekMeetingDay,
                    weekendMeetingDay: settings.weekendMeetingDay,
                },
                rangeStart,
                rangeEnd,
            );

            // Merge the concrete events with the projected events.
            const allEvents = [...concreteUIEvents, ...projectedEvents];

            // Sort events chronologically.
            allEvents.sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime(),
            );
            return allEvents;
        },
    );
