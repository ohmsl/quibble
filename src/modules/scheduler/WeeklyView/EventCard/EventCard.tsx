import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    List,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";
import { format } from "date-fns";
import { EditIcon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { MeetingEvent } from "../../../../types/Events/MeetingEvent";
import { EventRole } from "./EventRole";

type EventCardProps = {
    event: MeetingEvent;
};

export const EventCard = ({ event }: EventCardProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card variant="outlined" sx={{ width: "100%" }}>
            <CardHeader
                title={event.title}
                subheader={format(event.date, "PPPP")}
                action={
                    <IconButton size="small" onClick={handleClick}>
                        <MoreVerticalIcon />
                    </IconButton>
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

            <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <EditIcon size={20} />
                    </ListItemIcon>
                    Edit
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ color: "error.main" }}>
                    <ListItemIcon sx={{ color: "error.main" }}>
                        <Trash2Icon size={20} />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
        </Card>
    );
};
