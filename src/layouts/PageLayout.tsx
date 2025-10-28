import { Box, Container, Typography } from "@mui/material";
import { Outlet } from "react-router";
import useIsSmallScreen from "../hooks/useIsSmallScreen";
import { Drawer } from "../modules/navigation/drawer/Drawer";
import { DrawerProvider } from "../modules/navigation/drawer/DrawerProvider";
import { navConfig } from "../modules/navigation/navConfig";
import { TitleBar } from "../modules/navigation/TitleBar";

export const PageLayout = () => {
    const isSmallScreen = useIsSmallScreen();
    const title =
        navConfig.find((item) => item.path === location.pathname)?.label || "";

    return (
        <DrawerProvider>
            {isSmallScreen && <TitleBar />}
            <Box display="flex">
                <Drawer />
                <Box flex={1} overflow="hidden" mt={3}>
                    <Container>
                        {!isSmallScreen && (
                            <Typography variant="h5">{title}</Typography>
                        )}
                        <Outlet />
                    </Container>
                </Box>
            </Box>
        </DrawerProvider>
    );
};
