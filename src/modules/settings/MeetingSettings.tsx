import { Box, Grid2 as Grid, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ArrowLeftIcon } from 'lucide-react';
import { CheckButton } from '../../components/CheckButton';
import { useAppState } from '../../modules/state/useAppState';

export const MeetingSettings = () => {
    const weekdays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        const diff = i - (date.getDay() || 7) + 1;
        date.setDate(date.getDate() + diff);
        return date;
    });

    const roles = useAppState.use.roles();

    const midweekMeetingSettings = useAppState.use.midweekMeetingSettings();
    const setMidweekMeetingSettings = useAppState.use.setMidweekMeetingSettings();

    const weekendMeetingSettings = useAppState.use.weekendMeetingSettings();
    const setWeekendMeetingSettings = useAppState.use.setWeekendMeetingSettings();

    const handleMidweekMeetingChange = (event: SelectChangeEvent) => {
        const day = Number(event.target.value);
        setMidweekMeetingSettings({ ...midweekMeetingSettings, day });
    };

    const handleWeekendMeetingChange = (event: SelectChangeEvent) => {
        const day = Number(event.target.value);
        setWeekendMeetingSettings({ ...weekendMeetingSettings, day });
    };

    const handleToggleRole = (roleId: string, selected: boolean) => {
        const requiredRoleIds = selected
            ? midweekMeetingSettings.requiredRoleIds?.filter(id => id !== roleId)
            : [...(midweekMeetingSettings.requiredRoleIds || []), roleId];

        setMidweekMeetingSettings({ ...midweekMeetingSettings, requiredRoleIds });
        setWeekendMeetingSettings({ ...weekendMeetingSettings, requiredRoleIds });
    };

    return (
        <>
            <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                <IconButton>
                    <ArrowLeftIcon />
                </IconButton>
                <Box>
                    <Typography variant="h5">Meeting Settings</Typography>
                    <Typography variant="body1">Configure the meeting schedule and required roles.</Typography>
                </Box>
            </Stack>

            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Box mb={2}>
                    <Typography variant="h6">Schedule</Typography>
                    <Typography variant="body2">Configure the weekday for each meeting.</Typography>
                </Box>

                <Stack direction="row" spacing={3}>
                    <Box width="50%">
                        <InputLabel sx={{ mb: 0.5 }}>Midweek Meeting Day</InputLabel>
                        <Select value={midweekMeetingSettings.day.toString()} onChange={handleMidweekMeetingChange} fullWidth>
                            {weekdays.map(day => (
                                <MenuItem key={day.toISOString()} value={day.getDay()}>
                                    {format(day, 'EEEE')}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box width="50%">
                        <InputLabel sx={{ mb: 0.5 }}>Weekend Meeting Day</InputLabel>
                        <Select value={weekendMeetingSettings.day.toString()} onChange={handleWeekendMeetingChange} fullWidth>
                            {weekdays.map(day => (
                                <MenuItem key={day.toISOString()} value={day.getDay()}>
                                    {format(day, 'EEEE')}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
                <Box mb={2}>
                    <Typography variant="h6">Roles</Typography>
                    <Typography variant="body2">Configure the required roles for each meeting.</Typography>
                </Box>

                <Grid container spacing={1}>
                    {roles.map(role => {
                        const isSelected = midweekMeetingSettings.requiredRoleIds?.includes(role.id);
                        return (
                            <Grid key={role.id} size={{ xs: 6, sm: 4 }}>
                                <CheckButton
                                    onClick={() => handleToggleRole(role.id, !!isSelected)}
                                    selected={isSelected}
                                    color="primary"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    {role.name}
                                </CheckButton>
                            </Grid>
                        );
                    })}
                </Grid>
            </Paper>
        </>
    );
};
