import { Box, Grid2 as Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { ChevronLeftIcon } from "lucide-react";
import { CheckButton } from "../../components/CheckButton";
import { useAppState } from "../../modules/state/useAppState";

export const MeetingSettingsView = () => {

    const weekdays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        const diff = i - (date.getDay() || 7) + 1;
        date.setDate(date.getDate() + diff);
        return date;
    });

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

    const roles = useAppState.use.roles();

    return (
        <>
            <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                <IconButton>
                    <ChevronLeftIcon />
                </IconButton>
                <Box>
                    <Typography variant="h5">Meeting Settings</Typography>
                    <Typography variant="body1">Configure the meeting schedule and required roles.</Typography>
                </Box>
            </Stack>

            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Box mb={2}>
                    <Typography variant="h6">Schedule</Typography>
                    <Typography variant="body2">
                        Configure the weekday for each meeting.
                    </Typography>
                </Box>

                <Stack direction="row" spacing={3}>
                    <Box width="50%">
                        <InputLabel sx={{ mb: 0.5 }}>Midweek Meeting Day</InputLabel>
                        <Select fullWidth>
                            {weekdays.map((day) => (
                                <MenuItem key={day.toISOString()} value={day.getDay()}>
                                    {format(day, "EEEE")}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box width="50%">
                        <InputLabel sx={{ mb: 0.5 }}>Weekend Meeting Day</InputLabel>
                        <Select fullWidth>
                            {weekdays.map((day) => (
                                <MenuItem key={day.toISOString()} value={day.getDay()}>
                                    {format(day, "EEEE")}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
                <Box mb={2}>
                    <Typography variant="h6">Roles</Typography>
                    <Typography variant="body2">
                        Configure the required roles for each meeting.
                    </Typography>
                </Box>

                <Grid container spacing={1}>
                    {roles.map((role) => {

                        return (
                            <Grid key={role.id} size={{ xs: 6, sm: 4 }}>
                                <CheckButton
                                    color="primary"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    {role.name}
                                </CheckButton>
                            </Grid>
                        )
                    })}
                </Grid>
            </Paper>
        </>
    );
};
