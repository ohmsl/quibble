import { Popover } from "@mui/material";
import type { UIEvent } from "../../../types/Events/Event";
import { EventCard } from "../WeeklyView/EventCard/EventCard";

type Props = {
	event: UIEvent | null;
	anchorEl: HTMLElement | null;
	onClose: () => void;
};

export const EventPopover: React.FC<Props> = ({ event, anchorEl, onClose }) => {
	return (
		<Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
			{event && <EventCard event={event} />}
		</Popover>
	);
};
