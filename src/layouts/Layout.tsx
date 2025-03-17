import { CssBaseline, useTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { scan } from 'react-scan';
import { Toaster } from 'sonner';
import { StatusIndicator } from '../components/StatusIndicator';
import { useAuth } from '../hooks/useAuth';
import { DialogProvider } from '../providers/DialogProvider';

export const Layout = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        scan({ enabled: false })

        console.log(user);
        if (!user) navigate('/login');
    }
    , []);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DialogProvider>
                <CssBaseline />
                <StatusIndicator />
                <Outlet />
                <Toaster theme={theme.palette.mode} richColors />
            </DialogProvider>
        </LocalizationProvider>
    );
};
