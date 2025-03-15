import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AppSlice, createAppSlice } from './app/appSlice';
import { createEventsSlice, type EventsSlice } from './events/eventsSlice';
import { createMembersSlice, type MembersSlice } from './members/membersSlice';
import { createPreferencesSlice, type PreferencesSlice } from './members/preferencesSlice';
import { createRolesSlice, type RolesSlice } from './roles/rolesSlice';
import { createSettingsSlice, type SettingsSlice } from './settings/settingsSlice';
import { createSelectors } from './utils/createSelectors';

type AppState = AppSlice & EventsSlice & RolesSlice & PreferencesSlice & SettingsSlice & MembersSlice;

export const useAppState = createSelectors(
    create<AppState>()(
        persist(
            (...a) => ({
                ...createAppSlice(...a),
                ...createEventsSlice(...a),
                ...createRolesSlice(...a),
                ...createMembersSlice(...a),
                ...createPreferencesSlice(...a),
                ...createSettingsSlice(...a),
            }),
            {
                name: 'appState',
                storage: createJSONStorage(() => localStorage),
                onRehydrateStorage: () => (state, error) => {
                    // update state with latest from server
                    if (error) {
                        console.error('[useAppState] Error rehydrating state:', error);
                    } else {
                        if (!state) return;

                        const { fetchEvents, fetchRoles, fetchMembers, fetchPreferences, subscribeToConnectionStatus } = state;

                        fetchEvents();
                        fetchRoles();
                        fetchMembers();
                        fetchPreferences();
                        subscribeToConnectionStatus();
                    }
                },
            },
        ),
    ),
);

(window as any).useAppState = useAppState;
