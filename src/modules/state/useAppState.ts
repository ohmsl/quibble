import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createEventsSlice, EventsSlice } from "./events/eventsSlice";
import { createRolesSlice, RolesSlice } from "./rolesSlice";
import { createSettingsSlice, SettingsSlice } from "./settings/settingsSlice";
import { createSelectors } from "./utils/createSelectors";

type AppState = EventsSlice & RolesSlice & SettingsSlice;

export const useAppState = createSelectors(
    create<AppState>()(
        persist(
            (...a) => ({
                ...createEventsSlice(...a),
                ...createRolesSlice(...a),
                ...createSettingsSlice(...a),
            }),
            {
                name: "appState",
                storage: createJSONStorage(() => localStorage),
            },
        ),
    ),
);

(window as any).useAppState = useAppState;
