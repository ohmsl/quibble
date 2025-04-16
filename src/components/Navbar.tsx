import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';
import { BarChart2Icon, CalendarHeartIcon, CalendarIcon, SettingsIcon, ShapesIcon, UsersIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

const config = [
    {
        label: 'Dashboard',
        icon: <BarChart2Icon size={20} />,
        path: '/dashboard',
    },
    {
        label: 'Schedule',
        icon: <CalendarIcon size={20} />,
        path: '/schedule',
    },
    {
        label: 'Brothers',
        icon: <UsersIcon size={20} />,
        path: '/members',
    },
    {
        label: 'Roles',
        icon: <ShapesIcon size={20} />,
        path: '/roles',
    },
    {
        label: 'Settings',
        icon: <SettingsIcon size={20} />,
        path: '/settings',
    },
];

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar
                sx={{
                    width: '100%',
                    maxWidth: 'lg',
                    mx: 'auto',
                    gap: 1,
                }}
            >
                <CalendarHeartIcon strokeWidth={2.25} />
                <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
                    Quibble
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                    {config.map(item => (
                        <Button
                            key={item.label}
                            startIcon={item.icon}
                            color="inherit"
                            onClick={() => navigate(item.path, { viewTransition: true })}
                            sx={{
                                color: location.pathname === item.path ? 'info.main' : 'text.primary',
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
