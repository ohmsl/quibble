import { Divider, ListItem, ListItemButton, ListItemText, Paper, Stack } from '@mui/material';
import { ChevronRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export const SettingsView = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    return (
        <Stack gap={1}>
            <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
                <ListItemButton onClick={() => navigate('/settings/meetings')}>
                    <ListItemText primary="Meeting Schedule" secondary="Configure your meeting schedule and required roles" />
                    <ChevronRightIcon />
                </ListItemButton>
            </Paper>
            <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
                <ListItemButton onClick={() => navigate('/developer/theme-preview')}>
                    <ListItemText primary="Theme Preview" secondary="Preview and customize your theme" />
                    <ChevronRightIcon />
                </ListItemButton>
            </Paper>

            <Divider sx={{ my: 1 }} />

            <ListItem component={Paper} variant="outlined" sx={{ overflow: 'hidden' }} disablePadding>
                <ListItemButton onClick={logout}>
                    <ListItemText primary="Logout" secondary="Logout from your account" />
                    <ChevronRightIcon />
                </ListItemButton>
            </ListItem>
        </Stack>
    );
};
