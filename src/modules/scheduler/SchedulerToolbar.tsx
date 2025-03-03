import {
    Button,
    Paper,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar,
} from "@mui/material";
import { DownloadIcon, PlusIcon, Sparkles as SparklesIcon } from "lucide-react";
import { v4 as uuid } from "uuid";
import { useDialog } from "../../providers/DialogProvider";
import { Role } from "../../types/Role";
import { useAppState } from "../state/useAppState";
import { EventForm, EventFormValues } from "./WeeklyView/EventForm";

export const SchedulerToolbar = () => {
    const { showDialog, closeDialog } = useDialog();

    const addEvent = useAppState.use.addEvent();
    const roles = useAppState.use.roles();

    const handleSubmitEvent = (data: EventFormValues) => {
        const id = uuid();
        const requiredRoles = new Array<Role>();

        for (const roleName of data.requiredRoles) {
            const role = roles.find((role) => role.name === roleName);
            if (!role) continue;

            requiredRoles.push(role);
        }

        addEvent({ ...data, id, requiredRoles });
    };

    const handleAddEvent = () => {
        showDialog(
            <EventForm onCancel={closeDialog} onSubmit={handleSubmitEvent} />,
            { fullWidth: true },
        );
    };

    return (
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Paper variant="outlined" sx={{ width: "fit-content" }}>
                <ToggleButtonGroup value="weekly">
                    <ToggleButton size="small" value="weekly">
                        Weekly View
                    </ToggleButton>
                    <ToggleButton size="small" value="monthly">
                        Monthly View
                    </ToggleButton>
                </ToggleButtonGroup>
            </Paper>
            <Stack direction="row" spacing={1}>
                <Button
                    startIcon={<SparklesIcon size={20} />}
                    variant="outlined"
                    color="neutral"
                >
                    Auto Assign
                </Button>
                <Button
                    startIcon={<DownloadIcon size={20} />}
                    variant="outlined"
                    color="neutral"
                >
                    Export
                </Button>
                <Button
                    startIcon={<PlusIcon size={20} />}
                    variant="contained"
                    onClick={handleAddEvent}
                >
                    Add Event
                </Button>
            </Stack>
        </Toolbar>
    );
};
