import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { logger } from '../../utils/logger';
import { AppSlice, createAppSlice } from './app/appSlice';
import { createEventsSlice, type EventsSlice } from './events/eventsSlice';
import { createMembersSlice, type MembersSlice } from './members/membersSlice';
import { createPreferencesSlice, type PreferencesSlice } from './members/preferencesSlice';
import { createRolesSlice, type RolesSlice } from './roles/rolesSlice';
import { createSettingsSlice, type SettingsSlice } from './settings/settingsSlice';
import { createSelectors } from './utils/createSelectors';

export type AppState = AppSlice & EventsSlice & RolesSlice & PreferencesSlice & SettingsSlice & MembersSlice;

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
                    if (error) {
                        logger.error('[useAppState] Error rehydrating state:', error);
                    } else {
                        if (!state) return;
                    }
                },
            },
        ),
    ),
);

(window as any).useAppState = useAppState;
