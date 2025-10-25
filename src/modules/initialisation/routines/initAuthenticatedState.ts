import { UsersRecord } from "../../../types/pb_types";
import { useAppState } from "../../state/useAppState";

export const initAuthenticatedState = async (user: UsersRecord) => {
    const { fetchEvents, fetchRoles, fetchMembers, fetchPreferences } =
        useAppState.getState();

    if (user) {
        await Promise.allSettled([
            fetchEvents(),
            fetchRoles(),
            fetchMembers(),
            fetchPreferences(),
        ]);

        useAppState.setState({ orgId: user.org_ids?.[0] });
    }
};
