import { isSameDay } from "date-fns";
import type { UIEvent } from "../../../types/Events/Event";

export const areEventsOnDay = (events: Array<UIEvent>, day: Date) => {
	const dayEvents = events.filter((event) => {
		const date = new Date(event.date);
		return isSameDay(date, day);
	});
	return dayEvents.length > 0;
};
