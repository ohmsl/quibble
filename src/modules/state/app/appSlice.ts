// General app state

import { StateCreator } from 'zustand';

/**
 * Represents the application state.
 */
export type AppSlice = {
    connectionStatus: 'online' | 'unavailable' | 'offline' | null;
    loading: boolean;
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
        connectionStatus: null,
        loading: false,
    };

    return initialState;
};
