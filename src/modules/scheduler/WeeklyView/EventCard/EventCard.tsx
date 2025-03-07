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
import { ConfirmDialog } from "../../../../components/ConfirmDialog";
import { useDialog } from "../../../../providers/DialogProvider";
import { UIEvent } from "../../../../types/Events/Event";
import {
    concretiseProjectedEvent,
    ProjectedMeetingEvent,
} from "../../../state/events/concretiseProjectedEvent";
import { useAppState } from "../../../state/useAppState";
import { EventForm } from "../EventForm";
import { EventRole } from "./EventRole";

type EventCardProps = {
    event: UIEvent;
};

export const EventCard = ({ event }: EventCardProps) => {
    const removeEvent = useAppState.use.removeEvent();

    const { showDialog, closeDialog } = useDialog();

    const handleEditSubmit = () => {
        if ((event as ProjectedMeetingEvent).projected) {
            concretiseProjectedEvent(event);
        }
    };

    const handleEdit = () => {
        showDialog(
            <EventForm
                defaultValues={event}
                onCancel={closeDialog}
                onSubmit={handleEditSubmit}
            />,
            { fullWidth: true, maxWidth: "md" },
        );
    };

    const handleDelete = () => {
        showDialog(
            <ConfirmDialog
                title="Delete Event"
                message="Are you sure you want to delete this event?"
                onConfirm={() => {
                    removeEvent(event.id);
                    closeDialog();
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
                                icon: <EditIcon size={20} />,
                            },
                            {
                                label: "Delete",
                                onClick: handleDelete,
                                icon: <Trash2Icon size={20} />,
                                menuItemProps: { sx: { color: "error.main" } },
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
                    {event.requiredRoles.map((role, index) => (
                        <EventRole key={index} role={role} />
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};
