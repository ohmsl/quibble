import { ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { ChevronRightIcon } from "lucide-react";
import { useNavigate } from "react-router";

export const SettingsView = () => {
    const navigate = useNavigate();

    return (
        <>
            <Typography variant="h5" gutterBottom>
                Settings
            </Typography>

            <Paper variant="outlined" sx={{ overflow: "hidden" }}>
                <ListItemButton onClick={() => navigate("/settings/meetings")}>
                    <ListItemText primary="Meeting Schedule" secondary="Configure your meeting schedule and required roles" />
                    <ChevronRightIcon />
                </ListItemButton>
            </Paper>
        </>
    );
};
