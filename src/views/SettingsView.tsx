import { Paper, TextField, Typography } from "@mui/material";
import { useAppState } from "../modules/state/useAppState";

export const SettingsView = () => {
    const midweekMeetingDay = useAppState.use.midweekMeetingDay();
    const weekendMeetingDay = useAppState.use.weekendMeetingDay();
    const setMidweekMeetingDay = useAppState.use.setMidweekMeetingDay();
    const setWeekendMeetingDay = useAppState.use.setWeekendMeetingDay();

    const onMidweekMeetingChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMidweekMeetingDay(Number(event.target.value));
    };

    const onWeekendMeetingChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setWeekendMeetingDay(Number(event.target.value));
    };

    return (
        <>
            <Typography variant="h5" gutterBottom>
                Settings
            </Typography>

            <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography fontWeight="bold">Midweek Meeting</Typography>
                <TextField
                    onChange={onMidweekMeetingChange}
                    value={midweekMeetingDay}
                />
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography fontWeight="bold">Weekend Meeting</Typography>
                <TextField
                    onChange={onWeekendMeetingChange}
                    value={weekendMeetingDay}
                />
            </Paper>
        </>
    );
};
