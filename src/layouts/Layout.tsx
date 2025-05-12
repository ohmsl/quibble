import { useColorScheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { useEffect } from "react";
import { scan } from "react-scan";
import { Toaster } from "sonner";
import { SafeArea } from "../components/SafeArea";
import { StatusIndicator } from "../components/StatusIndicator";
import { DialogProvider } from "../providers/DialogProvider";
import { AnimatedOutlet } from "./AnimatedOutlet";

export const Layout = () => {
    const { mode, systemMode } = useColorScheme();

    useEffect(() => {
        scan({ enabled: false, trackUnnecessaryRenders: true });
    }, []);

    return (
        <SafeArea>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DialogProvider>
                    <AnimatedOutlet />
                    <StatusIndicator />
                    <Toaster
                        theme={mode === "system" ? systemMode : mode}
                        mobileOffset={{ bottom: "24px" }}
                        richColors
                    />
                </DialogProvider>
            </LocalizationProvider>
        </SafeArea>
    );
};
