import { Box, MenuItem, MenuList, Stack, SwipeableDrawer, Typography, useTheme } from '@mui/material';
import { CalendarHeartIcon } from 'lucide-react';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { navConfig } from './Navbar';

interface DrawerContextType {
    open: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawer must be used within a DrawerProvider');
    }
    return context;
};

interface DrawerProviderProps {
    children: ReactNode;
}

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
    const [open, setOpen] = useState(false);

    const openDrawer = () => {
        setOpen(true);
    };

    const closeDrawer = () => {
        setOpen(false);
    };

    const toggleDrawer = () => {
        setOpen(prev => !prev);
    };

    return (
        <DrawerContext.Provider value={{ open, openDrawer, closeDrawer, toggleDrawer }}>
            {children}
            <Drawer />
        </DrawerContext.Provider>
    );
};

const Drawer = () => {
    const theme = useTheme();
    const { open, openDrawer, closeDrawer } = useDrawer();

    const navigate = useNavigate();

    return (
        <SwipeableDrawer
            anchor="left"
            open={open}
            onOpen={openDrawer}
            onClose={closeDrawer}
            sx={{
                zIndex: theme.zIndex.drawer + 1,
            }}
            slotProps={{
                paper: { sx: { backgroundImage: 'none' } },
            }}
            disableSwipeToOpen={false}
        >
            <Box sx={{ width: 250 }}>
                <Stack direction="row" spacing={2} alignItems="center" p={3} pb={2}>
                    <CalendarHeartIcon strokeWidth={2.25} />
                    <Typography variant="h6" fontWeight="bold">
                        Quibble
                    </Typography>
                </Stack>
                <MenuList disablePadding>
                    {navConfig.map(({ icon, label, path }) => (
                        <MenuItem
                            key={label}
                            selected={path === window.location.pathname}
                            onClick={() => navigate(path)}
                            sx={{ height: 48, mx: 1, borderRadius: 8, transition: 'background-color 0.3s ease-in-out' }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                {icon}
                                <Typography>{label}</Typography>
                            </Stack>
                        </MenuItem>
                    ))}
                </MenuList>
            </Box>
        </SwipeableDrawer>
    );
};
