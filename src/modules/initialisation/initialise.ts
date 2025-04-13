import { createScopedLogger } from "../../utils/logger";
import { getUser } from "../auth/getUser";
import { usePbStore } from "../state/pocketbase/usePbStore";
import { useAppState } from "../state/useAppState";
import { hijackFetch } from "./routines/hijackFetch";
import { subscribeToConnectionStatus } from "./routines/subscribeToConnectionStatus";

/**
 * Function to initialise agnostic services or state
 */
export const initialise = () => {
    const logger = createScopedLogger("initialise");

    const startTime = Date.now();
    logger.info("Initialising application...");

    usePbStore.getState().syncUserWithServer();

    const { fetchEvents, fetchRoles, fetchMembers, fetchPreferences } =
        useAppState.getState();

    const user = getUser();

    if (user) {
        fetchEvents();
        fetchRoles();
        fetchMembers();
        fetchPreferences();

        useAppState.setState({ orgId: user.org_ids?.[0] });
    }

    const restoreFetch = hijackFetch();
    const unsubscribeConnectionStatus = subscribeToConnectionStatus();

    logger.info(`Initialisation completed in ${Date.now() - startTime}ms`);

    const unsubscribe = () => {
        restoreFetch();
        unsubscribeConnectionStatus();
    };

    return unsubscribe;
};
