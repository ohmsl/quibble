import { Box, Divider, MenuItem, MenuList, Stack, SwipeableDrawer, Typography, useTheme } from '@mui/material';
import { CalendarHeartIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { SafeArea } from '../../../components/SafeArea';
import useIsSmallScreen from '../../../hooks/useIsSmallScreen';
import { navConfig } from '../navConfig';
import { AccountButton } from './AccountButton';
import { useDrawer } from './DrawerProvider';

export const Drawer = () => {
    const theme = useTheme();
    const isSmallScreen = useIsSmallScreen();
    const { open, openDrawer, closeDrawer } = useDrawer();

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path: string) => () => {
        navigate(path);
        closeDrawer();
    };

    return (
        <SwipeableDrawer
            variant={isSmallScreen ? 'temporary' : 'permanent'}
            anchor="left"
            open={open}
            onOpen={openDrawer}
            onClose={closeDrawer}
            sx={{ width: 250, flexShrink: 0, zIndex: theme.zIndex.drawer + 1 }}
            slotProps={{ paper: { sx: { backgroundImage: 'none' } } }}
            disableSwipeToOpen={false}
        >
            <SafeArea>
                <Stack sx={{ width: 250, height: '100%' }}>
                    <Stack direction="row" spacing={2} alignItems="center" p={3} pb={2}>
                        <CalendarHeartIcon size={32} color={theme.vars.palette.primary.main} />
                    </Stack>
                    <MenuList sx={{ flex: 1 }} disablePadding>
                        {navConfig.map(({ icon, label, path }) => (
                            <MenuItem
                                key={label}
                                selected={path === location.pathname}
                                onClick={handleNavigate(path)}
                                sx={{
                                    height: 42,
                                    mx: 1,
                                    my: 0.5,
                                    borderRadius: `${theme.shape.borderRadius}px`,
                                    transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
                                    ...theme.applyStyles('dark', {
                                        color: location.pathname.includes(path)
                                            ? theme.vars.palette.primary.light
                                            : theme.vars.palette.text.primary,
                                    }),
                                    ...theme.applyStyles('light', {
                                        color: location.pathname.includes(path)
                                            ? theme.vars.palette.primary.main
                                            : theme.vars.palette.text.primary,
                                    }),
                                }}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    {icon}
                                    <Typography>{label}</Typography>
                                </Stack>
                            </MenuItem>
                        ))}
                    </MenuList>
                    <Divider />
                    <Box p={1}>
                        <AccountButton />
                    </Box>
                </Stack>
            </SafeArea>
        </SwipeableDrawer>
    );
};
