import { Container, CssBaseline, Fade, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { scan } from "react-scan";
import { Navbar } from "./components/Navbar";
import { DialogProvider } from "./providers/DialogProvider";
import theme from "./theme/theme";

export const Layout = () => {
    useEffect(() => scan({ enabled: false }), []);

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DialogProvider>
                    <CssBaseline />
                    <Navbar />
                    <Fade in>
                        <Container sx={{ my: 3 }} maxWidth="lg">
                            <Outlet />
                        </Container>
                    </Fade>
                </DialogProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
};
