import { BarChart2Icon, CalendarIcon, MenuIcon, SettingsIcon, ShapesIcon, UsersIcon } from 'lucide-react';

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
