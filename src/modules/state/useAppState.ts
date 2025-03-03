import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createEventsSlice, EventsSlice } from "./eventsSlice";
import { createRolesSlice, RolesSlice } from "./rolesSlice";
import { createSelectors } from "./utils/createSelectors";

type AppState = EventsSlice & RolesSlice;

export const useAppState = createSelectors(
    create<AppState>()(
        persist(
            (...a) => ({
                ...createEventsSlice(...a),
                ...createRolesSlice(...a),
            }),
            {
                name: "appState",
                storage: createJSONStorage(() => localStorage),
            },
        ),
    ),
);
