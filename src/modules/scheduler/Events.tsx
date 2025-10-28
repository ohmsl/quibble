import { Stack } from "@mui/material";
import { createSelectEventsForRange } from "../state/events/selectors/createSelectEventsForRange";
import { useAppState } from "../state/useAppState";
import { EventCard } from "./WeeklyView/EventCard/EventCard";

type Props = {
    rangeStart: Date;
    rangeEnd: Date;
};

export const Events: React.FC<Props> = ({ rangeStart, rangeEnd }) => {
    const events = useAppState(
        createSelectEventsForRange(rangeStart, rangeEnd),
    );

    return (
        <Stack spacing={2} mt={2}>
            {events.map((event) => (
                <EventCard event={event} />
            ))}
        </Stack>
    );
};
