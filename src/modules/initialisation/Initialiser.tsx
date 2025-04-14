import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { createScopedLogger } from '../../utils/logger';
import { asyncInit } from './asyncInit';
import { hijackFetch } from './routines/hijackFetch';
import { subscribeToConnectionStatus } from './routines/subscribeToConnectionStatus';

export const Initialiser = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const startTime = Date.now();
        const logger = createScopedLogger('init');

        logger.info('Initialising application...');

        const restoreFetch = hijackFetch();
        const unsubscribeConnectionStatus = subscribeToConnectionStatus();

        asyncInit(startTime, navigate);

        return () => {
            restoreFetch();
            unsubscribeConnectionStatus();
        };
    }, []);

    return null;
};
