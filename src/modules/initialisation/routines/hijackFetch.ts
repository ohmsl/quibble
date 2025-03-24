import { logger } from '../../../utils/logger';
import { useAppState } from '../../state/useAppState';

export const hijackFetch = (): (() => void) => {
    const set = useAppState.setState;
    const originalFetch: typeof fetch = window.fetch.bind(window);

    let activeRequests = 0;
    let loadingDebounceTimer: ReturnType<typeof setTimeout> | null = null;

    const startHttpRequest = (): void => {
        activeRequests += 1;
        set({ loading: true });
    };

    const finishHttpRequest = (): void => {
        activeRequests = Math.max(0, activeRequests - 1);
        if (activeRequests === 0) {
            if (loadingDebounceTimer !== null) {
                clearTimeout(loadingDebounceTimer);
            }

            loadingDebounceTimer = setTimeout(() => {
                set({ loading: false });
                loadingDebounceTimer = null;
            }, 1000);
        }
    };

    const hijackedFetch = async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
        startHttpRequest();
        try {
            const response: Response = await originalFetch(input, init);
            return response;
        } catch (error: unknown) {
            // biome-ignore lint: Preserve stack trace.
            throw error;
        } finally {
            finishHttpRequest();
        }
    };

    // Replace the global fetch with the hijacked version
    window.fetch = hijackedFetch;

    /**
     * Restores the original fetch function and clears internal state.
     */
    const restore = (): void => {
        window.fetch = originalFetch;
        if (loadingDebounceTimer !== null) {
            clearTimeout(loadingDebounceTimer);
            loadingDebounceTimer = null;
        }
        activeRequests = 0;
        set({ loading: false });
        logger.info('Fetch hijack restored');
    };

    return restore;
};
