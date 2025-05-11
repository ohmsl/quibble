import { Grid } from '@mui/material';
import { createSelectEventsForRange } from '../state/events/selectors/createSelectEventsForRange';
import { useAppState } from '../state/useAppState';
import { EventCard } from './WeeklyView/EventCard/EventCard';

type Props = {
    rangeStart: Date;
    rangeEnd: Date;
};

export const Events: React.FC<Props> = ({ rangeStart, rangeEnd }) => {
    const events = useAppState(createSelectEventsForRange(rangeStart, rangeEnd));

    return (
        <Grid container spacing={2} width="100%" mt={2}>
            {events.map(event => (
                <Grid key={event.id} size={{ xs: 12, sm: 6 }}>
                    <EventCard event={event} />
                </Grid>
            ))}
        </Grid>
    );
};
