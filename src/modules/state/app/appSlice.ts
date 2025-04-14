import { StateCreator } from 'zustand';

/**
 * Represents the application state.
 */
export type AppSlice = {
    orgId: string | null;
    connectionStatus: 'online' | 'unavailable' | 'offline' | null;
    loading: boolean;
    initialised: boolean;
};

/**
 * Creates the app slice for Zustand store, handling network connection status and intercepting HTTP requests
 * to automatically manage the loading state.
 *
 * @param set - Function to update the state.
 * @returns The app slice with connection and loading states.
 */
export const createAppSlice: StateCreator<AppSlice, [], [], AppSlice> = () => {
    // Define the initial state for the app slice.
    const initialState: AppSlice = {
        orgId: null,
        connectionStatus: null,
        loading: false,
        initialised: false,
    };

    return initialState;
};
