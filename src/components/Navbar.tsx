import { AppBar, Button, IconButton, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import { BarChart2Icon, CalendarHeartIcon, CalendarIcon, MenuIcon, SettingsIcon, ShapesIcon, UsersIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import useIsSmallScreen from '../hooks/useIsSmallScreen';
import { useDrawer } from './Drawer';

export const navConfig = [
    {
        label: 'Dashboard',
        icon: <BarChart2Icon />,
        path: '/dashboard',
    },
    {
        label: 'Schedule',
        icon: <CalendarIcon />,
        path: '/schedule',
    },
    {
        label: 'Brothers',
        icon: <UsersIcon />,
        path: '/members',
    },
    {
        label: 'Roles',
        icon: <ShapesIcon />,
        path: '/roles',
    },
    {
        label: 'Settings',
        icon: <SettingsIcon />,
        path: '/settings',
    },
];

export const Navbar = () => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const isSmallScreen = useIsSmallScreen();

    const { openDrawer } = useDrawer();

    return (
        <AppBar position="static" sx={{ boxShadow: 1 }}>
            <Toolbar
                sx={{
                    width: '100%',
                    maxWidth: 'lg',
                    mx: 'auto',
                    gap: 1,
                }}
            >
                {!isSmallScreen ? (
                    <>
                        <CalendarHeartIcon strokeWidth={2.25} />
                        <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
                            Quibble
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {navConfig.map(item => (
                                <Button
                                    key={item.label}
                                    startIcon={item.icon}
                                    color="inherit"
                                    onClick={() => navigate(item.path, { viewTransition: true })}
                                    sx={{ color: location.pathname === item.path ? 'info.main' : 'inherit' }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Stack>
                    </>
                ) : (
                    <>
                        <IconButton sx={{ color: 'inherit', zIndex: theme.zIndex.appBar + 1 }} onClick={openDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            sx={{
                                position: 'absolute',
                                left: 0,
                                textAlign: 'center',
                                width: '100%',
                                fontWeight: 'bold',
                                zIndex: theme.zIndex.appBar,
                            }}
                        >
                            {navConfig.find(item => item.path === location.pathname)?.label || ''}
                        </Typography>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};
