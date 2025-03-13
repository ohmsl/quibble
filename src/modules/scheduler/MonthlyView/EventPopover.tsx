import { Popover } from "@mui/material";
import { EventsRecord } from "../../../types/pb_types";
import { EventCard } from "../WeeklyView/EventCard/EventCard";

type Props = {
    event: EventsRecord;
    anchorEl: HTMLElement | null;
    onClose: () => void;
};

export const EventPopover: React.FC<Props> = ({ event, anchorEl, onClose }) => {
    return (
        <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
            <EventCard event={event} onClose={onClose} />
        </Popover>
    );
};
