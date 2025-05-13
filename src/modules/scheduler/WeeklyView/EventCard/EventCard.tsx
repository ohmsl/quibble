import {
    Card,
    CardContent,
    CardHeader,
    List,
    Stack,
    Typography,
} from "@mui/material";
import { format } from "date-fns";
import { EditIcon, Trash2Icon } from "lucide-react";
import { ActionMenu } from "../../../../components/ActionMenu";
import { ConfirmPrompt } from "../../../../components/ConfirmPrompt";
import { useDialog } from "../../../../providers/DialogProvider";
import { EventsRecord } from "../../../../types/pb_types";
import {
    type ProjectedEvent,
    concretiseProjectedEvent,
} from "../../../state/events/concretiseProjectedEvent";
import { createSelectRoles } from "../../../state/roles/selectors/createSelectRoles";
import { useAppState } from "../../../state/useAppState";
import { EventForm, EventFormValues } from "../EventForm";
import { EventRole } from "./EventRole";

type EventCardProps = {
    event: EventsRecord;
    onClose?: () => void;
};

export const EventCard = ({ event, onClose }: EventCardProps) => {
    const updateEvent = useAppState.use.updateEvent();
    const removeEvent = useAppState.use.removeEvent();
    const requiredRoles = useAppState(
        createSelectRoles(event.required_role_ids),
    );

    const { showDialog, closeDialog } = useDialog();

    const handleEditSubmit = (data: EventFormValues) => {
        if ((data as ProjectedEvent).projected) {
            concretiseProjectedEvent(data as ProjectedEvent);
        } else {
            updateEvent(event.id, { ...event, ...data });
        }

        closeDialog();
        onClose?.();
    };

    const handleEdit = () => {
        showDialog(
            <EventForm
                defaultValues={event}
                onCancel={closeDialog}
                onSubmit={handleEditSubmit}
            />,
            {
                fullWidth: true,
                maxWidth: "md",
            },
        );
    };

    const handleDelete = () => {
        showDialog(
            <ConfirmPrompt
                title="Delete Event"
                message="Are you sure you want to delete this event?"
                onConfirm={() => {
                    removeEvent(event.id);
                    closeDialog();
                    onClose?.();
                }}
                onClose={closeDialog}
                confirmButton={{
                    text: "Delete",
                    color: "error",
                }}
            />,
        );
    };

    return (
        <Card variant="outlined" sx={{ width: "100%" }}>
            <CardHeader
                title={event.title}
                subheader={format(event.date, "PPPP")}
                action={
                    <ActionMenu
                        actions={[
                            {
                                label: "Edit",
                                onClick: handleEdit,
                                icon: <EditIcon />,
                            },
                            {
                                label: "Delete",
                                onClick: handleDelete,
                                icon: <Trash2Icon />,
                                menuItemProps: { sx: { color: "error.main" } },
                                disabled: (event as ProjectedEvent).projected,
                            },
                        ]}
                    />
                }
            />

            <CardContent sx={{ pt: 0 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    mb={1}
                >
                    <Typography variant="body2" color="textSecondary">
                        Role
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Assignee
                    </Typography>
                </Stack>
                <List disablePadding>
                    {requiredRoles.map((role) => (
                        <EventRole key={role.id} role={role} />
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};
