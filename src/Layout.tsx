import { Container, CssBaseline, Fade, useTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { scan } from 'react-scan';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { StatusIndicator } from './components/StatusIndicator';
import { DialogProvider } from './providers/DialogProvider';

export const Layout = () => {
    const theme = useTheme();
    useEffect(() => scan({ enabled: false }), []);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DialogProvider>
                <CssBaseline />
                <StatusIndicator />
                <Navbar />
                <Fade in>
                    <Container sx={{ my: 3 }} maxWidth="lg">
                        <Outlet />
                    </Container>
                </Fade>
                <Toaster theme={theme.palette.mode} richColors />
            </DialogProvider>
        </LocalizationProvider>
    );
};
