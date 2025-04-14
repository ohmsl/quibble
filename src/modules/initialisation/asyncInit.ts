import { NavigateFunction } from 'react-router';
import { logger } from '../../utils/logger';
import { getUser } from '../auth/getUser';
import pb from '../pocketbase/pb';
import { useAppState } from '../state/useAppState';

/**
 * Function to initialise agnostic services or state
 */
export const asyncInit = async (startTime: number, navigate: NavigateFunction) => {
    try {
        await pb.collection('users').authRefresh();
    } catch (error) {
        logger.warn(error);
        pb.authStore.clear();
    }

    const { fetchEvents, fetchRoles, fetchMembers, fetchPreferences } = useAppState.getState();

    const user = getUser();

    if (user) {
        await Promise.allSettled([fetchEvents(), fetchRoles(), fetchMembers(), fetchPreferences()]);

        useAppState.setState({ orgId: user.org_ids?.[0] });
    }

    // ===============
    //  Route Decider
    // ===============
    let targetRoute = '/';

    const loggedIn = !!user;
    const hasOrg = (user?.org_ids || []).length > 0;

    console.log('logged in:', loggedIn);
    console.log('has org:', hasOrg);

    if (!loggedIn) targetRoute = '/login';
    else if (loggedIn && !hasOrg) targetRoute = '/register/organisation';
    else targetRoute = '/schedule';

    const shouldOverridePath = !loggedIn;

    if (location.pathname.length === 1 || shouldOverridePath) {
        navigate(targetRoute, { replace: true });
    }

    useAppState.setState({ initialised: true });
    logger.info(`Initialisation completed in ${Date.now() - startTime}ms`);
};
