import { createScopedLogger } from '../../utils/logger';
import { isAuthed } from '../auth/isAuthed';
import { useAppState } from '../state/useAppState';
import { hijackFetch } from './routines/hijackFetch';
import { subscribeToConnectionStatus } from './routines/subscribeToConnectionStatus';

/**
 * Function to initialise agnostic services or state
 */
export const initialise = () => {
    const logger = createScopedLogger('initialise');

    const startTime = Date.now();
    logger.info('Initialising application...');

    const { fetchEvents, fetchRoles, fetchMembers, fetchPreferences } = useAppState.getState();

    if (isAuthed()) {
        fetchEvents();
        fetchRoles();
        fetchMembers();
        fetchPreferences();
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
