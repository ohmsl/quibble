import { StateCreator } from "zustand";

type SettingsState = {
    midweekMeetingDay: number;
    weekendMeetingDay: number;
};

type SettingsActions = {
    setMidweekMeetingDay: (day: number) => void;
    setWeekendMeetingDay: (day: number) => void;
};

export type SettingsSlice = SettingsState & SettingsActions;

export const createSettingsSlice: StateCreator<
    SettingsSlice,
    [],
    [],
    SettingsSlice
> = (set) => ({
    // State
    midweekMeetingDay: 0,
    weekendMeetingDay: 0,

    // Actions
    setMidweekMeetingDay: (day) => set({ midweekMeetingDay: day }),
    setWeekendMeetingDay: (day) => set({ weekendMeetingDay: day }),
});

export const selectMeetingSettings = (state: SettingsSlice) => ({
    midweekMeetingDay: state.midweekMeetingDay,
    weekendMeetingDay: state.weekendMeetingDay,
});
