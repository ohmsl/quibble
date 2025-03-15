import { createSelector } from 'reselect';
import { StateCreator } from 'zustand';

type MeetingSettings = {
    day: number;
    time?: string;
    requiredRoleIds?: Array<string>;
};

type SettingsState = {
    midweekMeetingSettings: MeetingSettings;
    weekendMeetingSettings: MeetingSettings;
};

type SettingsActions = {
    setMidweekMeetingSettings: (settings: MeetingSettings) => void;
    setWeekendMeetingSettings: (settings: MeetingSettings) => void;
};

export type SettingsSlice = SettingsState & SettingsActions;

export const createSettingsSlice: StateCreator<SettingsSlice, [], [], SettingsSlice> = set => ({
    // State
    midweekMeetingSettings: {
        day: 4,
        time: '18:00',
    },
    weekendMeetingSettings: {
        day: 0,
        time: '10:00',
    },

    // Actions
    setMidweekMeetingSettings: settings => set({ midweekMeetingSettings: settings }),
    setWeekendMeetingSettings: settings => set({ weekendMeetingSettings: settings }),
});

export const selectMeetingSettings = createSelector(
    (state: SettingsSlice) => state,
    state => ({
        midweekMeeting: state.midweekMeetingSettings,
        weekendMeeting: state.weekendMeetingSettings,
    }),
);
