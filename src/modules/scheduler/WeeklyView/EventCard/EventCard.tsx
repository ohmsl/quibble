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
import { useDialog } from "../../../../providers/DialogProvider";
import { UIEvent } from "../../../../types/Events/Event";
import {
    concretiseProjectedEvent,
    ProjectedMeetingEvent,
} from "../../../state/events/concretiseProjectedEvent";
import { EventForm } from "../EventForm";
import { EventRole } from "./EventRole";

type EventCardProps = {
    event: UIEvent;
};

export const EventCard = ({ event }: EventCardProps) => {
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
                                onClick: () => {},
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
