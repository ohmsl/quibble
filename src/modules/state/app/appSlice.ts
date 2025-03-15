// General app state

import { StateCreator } from 'zustand';
import pb from '../../pocketbase/pb';

/**
 * Represents the application state.
 */
export type AppSlice = {
    connectionStatus: 'online' | 'unavailable' | 'offline' | null;
    loading: boolean;
    subscribeToConnectionStatus: () => () => void;
};

/**
 * Creates the app slice for Zustand store, handling network connection status and intercepting HTTP requests
 * to automatically manage the loading state.
 *
 * @param set - Function to update the state.
 * @returns The app slice with connection and loading states.
 */
export const createAppSlice: StateCreator<AppSlice, [], [], AppSlice> = (set, get) => {
    // Define the initial state for the app slice.
    const initialState: AppSlice = {
        connectionStatus: null,
        loading: false,
        subscribeToConnectionStatus: (): (() => void) => {
            // Handler to update connection status based on browser online/offline events.
            const handleNetworkChange = (): void => {
                const online = navigator.onLine;

                set({ connectionStatus: online ? 'online' : 'offline' });
            };

            window.addEventListener('online', handleNetworkChange);
            window.addEventListener('offline', handleNetworkChange);

            const interval = setInterval(async () => {
                try {
                    if (get().connectionStatus === 'offline') return;

                    const response = await pb.health.check();

                    if (response.code === 200) {
                        set({ connectionStatus: 'online' });
                    } else {
                        set({ connectionStatus: 'unavailable' });
                    }
                } catch {
                    set({ connectionStatus: 'unavailable' });
                }
            }, 10000);

            set({ connectionStatus: navigator.onLine ? 'online' : 'offline' });

            // Return unsubscribe function to remove event listeners.
            return (): void => {
                window.removeEventListener('online', handleNetworkChange);
                window.removeEventListener('offline', handleNetworkChange);
                clearInterval(interval);
            };
        },
    };

    ((): void => {
        const originalFetch: typeof fetch = window.fetch.bind(window);
        let activeRequests = 0;

        const startHttpRequest = (): void => {
            activeRequests += 1;
            set({ loading: true });
        };

        const finishHttpRequest = (): void => {
            activeRequests = Math.max(0, activeRequests - 1);
            if (activeRequests === 0) {
                set({ loading: false });
            }
        };

        window.fetch = async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
            startHttpRequest();
            try {
                const response: Response = await originalFetch(input, init);
                return response;
            } catch (error: unknown) {
                // biome-ignore lint: Propagate the error to the caller.
                throw error;
            } finally {
                finishHttpRequest();
            }
        };
    })();

    return initialState;
};
