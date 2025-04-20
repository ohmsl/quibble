import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router';
import useIsSmallScreen from '../hooks/useIsSmallScreen';
import { Drawer } from '../modules/navigation/drawer/Drawer';
import { DrawerProvider } from '../modules/navigation/drawer/DrawerProvider';
import { TitleBar } from '../modules/navigation/TitleBar';

export const PageLayout = () => {
    const isSmallScreen = useIsSmallScreen();

    return (
        <DrawerProvider>
            {isSmallScreen && <TitleBar />}
            <Box display="flex">
                <Drawer />
                <Box flex={1} overflow="hidden" mt={3}>
                    <Container maxWidth="xl">
                        <Outlet />
                    </Container>
                </Box>
            </Box>
        </DrawerProvider>
    );
};
