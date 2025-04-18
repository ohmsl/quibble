import { useTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useEffect } from 'react';
import { scan } from 'react-scan';
import { Toaster } from 'sonner';
import { DrawerProvider } from '../components/Drawer';
import { StatusIndicator } from '../components/StatusIndicator';
import { DialogProvider } from '../providers/DialogProvider';
import { AnimatedOutlet } from './AnimatedOutlet';

export const Layout = () => {
    const theme = useTheme();

    useEffect(() => {
        scan({ enabled: false, trackUnnecessaryRenders: true });
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DialogProvider>
                <DrawerProvider>
                    <AnimatedOutlet />
                    <StatusIndicator />
                    <Toaster theme={theme.palette.mode} richColors />
                </DrawerProvider>
            </DialogProvider>
        </LocalizationProvider>
    );
};
