import type { UIEvent } from "../../../types/Events/Event";
import type { Role } from "../../../types/Role";
import { useAppState } from "../useAppState";

export type ProjectedMeetingEvent = UIEvent & {
    projected: true;
};

/**
 * Concretises a projected event by converting it into a concrete event record.
 * This function is called when a user modifies an instance of a recurring event,
 * such as assigning roles or triggering auto assign.
 *
 * @param event - The projected event to concretise. Must include the `projected` flag.
 * @returns A new concrete meeting event that can be modified independently.
 * @throws Error if the event provided is not a projected event.
 */
export function concretiseProjectedEvent(event: UIEvent) {
    if (!(event as ProjectedMeetingEvent).projected) {
        throw new Error(
            "The event is not projected and does not require concretisation.",
        );
    }

    useAppState.getState().addEvent({
        ...event,
        requiredRoleIds: event.requiredRoles.map((role: Role) => role.id),
    });
}
