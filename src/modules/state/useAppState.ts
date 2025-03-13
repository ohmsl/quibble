import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createEventsSlice, EventsSlice } from "./events/eventsSlice";
import { createMembersSlice, MembersSlice } from "./members/membersSlice";
import {
    createPreferencesSlice,
    PreferencesSlice,
} from "./members/preferencesSlice";
import { createRolesSlice, RolesSlice } from "./roles/rolesSlice";
import { createSettingsSlice, SettingsSlice } from "./settings/settingsSlice";
import { createSelectors } from "./utils/createSelectors";

type AppState = EventsSlice &
    RolesSlice &
    PreferencesSlice &
    SettingsSlice &
    MembersSlice;

export const useAppState = createSelectors(
    create<AppState>()(
        persist(
            (...a) => ({
                ...createEventsSlice(...a),
                ...createRolesSlice(...a),
                ...createMembersSlice(...a),
                ...createPreferencesSlice(...a),
                ...createSettingsSlice(...a),
            }),
            {
                name: "appState",
                storage: createJSONStorage(() => localStorage),
                onRehydrateStorage: () => (state, error) => {
                    // update state with latest from server
                    if (error) {
                        console.error(
                            "[useAppState] Error rehydrating state:",
                            error,
                        );
                    } else {
                        if (!state) return;

                        const {
                            fetchEvents,
                            fetchRoles,
                            fetchMembers,
                            fetchPreferences,
                        } = state;

                        fetchEvents();
                        fetchRoles();
                        fetchMembers();
                        fetchPreferences();
                    }
                },
            },
        ),
    ),
);

(window as any).useAppState = useAppState;
