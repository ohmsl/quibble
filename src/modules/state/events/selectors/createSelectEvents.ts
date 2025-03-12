import { createSelector } from "reselect";
import { EnrichedEvent } from "../../../../types/Events/Event";
import { Role } from "../../../../types/Role";
import { selectRoles } from "../../rolesSlice";
import { selectEvents } from "../eventsSlice";

export const createSelectEvents = createSelector(
    [selectEvents, selectRoles],
    (events, roles) => {
        // TODO: Add projected UI events based on an inputted date range
        const uiEvents = new Array<EnrichedEvent>();

        for (const event of events) {
            const requiredRoles = new Array<Role>();

            for (const roleId of event.requiredRoleIds) {
                const role = roles.find((r) => r.id === roleId);
                if (role) requiredRoles.push(role);
            }

            uiEvents.push({ ...event, requiredRoles });
        }

        return uiEvents;
    },
);
