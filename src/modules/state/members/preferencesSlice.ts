import { StateCreator } from "zustand";
import { MemberPreferencesRecord } from "../../../types/pb_types";
import pb from "../../pocketbase/pb";

export type PreferencesState = {
    preferences: Array<MemberPreferencesRecord>;
    loading: boolean;
};

export type PreferencesActions = {
    fetchPreferences: () => Promise<void>;
    addPreference: (
        preference: Omit<MemberPreferencesRecord, "id">,
    ) => Promise<void>;
    updatePreference: (
        id: string,
        preference: Partial<MemberPreferencesRecord>,
    ) => Promise<void>;
    removePreference: (id: string) => Promise<void>;
};

export type PreferencesSlice = PreferencesState & PreferencesActions;

export const createPreferencesSlice: StateCreator<
    PreferencesSlice,
    [],
    [],
    PreferencesSlice
> = (set) => ({
    preferences: [],
    loading: false,

    /**
     * Fetch preferences from PocketBase.
     */
    fetchPreferences: async () => {
        set({ loading: true });
        try {
            const preferences = await pb
                .collection<MemberPreferencesRecord>("preferences")
                .getFullList();
            set({ preferences, loading: false });
        } catch (error: unknown) {
            console.error("Error fetching preferences:", error);
            set({ loading: false });
        }
    },

    /**
     * Add a new preference entry.
     * @param preference - Preference data without the id.
     */
    addPreference: async (preference) => {
        try {
            const createdPreference = await pb
                .collection<MemberPreferencesRecord>("preferences")
                .create(preference);
            set((state) => ({
                preferences: [...state.preferences, createdPreference],
            }));
        } catch (error: unknown) {
            console.error("Error adding preference:", error);
        }
    },

    /**
     * Update an existing preference.
     * @param id - ID of the preference.
     * @param preference - Partial preference data to update.
     */
    updatePreference: async (id, preference) => {
        try {
            const updatedPreference = await pb
                .collection<MemberPreferencesRecord>("preferences")
                .update(id, preference);
            set((state) => ({
                preferences: state.preferences.map((p) =>
                    p.id === id ? updatedPreference : p,
                ),
            }));
        } catch (error: unknown) {
            console.error("Error updating preference:", error);
        }
    },

    /**
     * Remove a preference entry.
     * @param id - ID of the preference to remove.
     */
    removePreference: async (id) => {
        try {
            await pb
                .collection<MemberPreferencesRecord>("preferences")
                .delete(id);
            set((state) => ({
                preferences: state.preferences.filter((p) => p.id !== id),
            }));
        } catch (error: unknown) {
            console.error("Error removing preference:", error);
        }
    },
});
