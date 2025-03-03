import { Grid2 as Grid } from "@mui/material";
import { useAppState } from "../state/useAppState";
import { EventCard } from "./WeeklyView/EventCard/EventCard";

export const Events = () => {
    const events = useAppState.use.events();

    return (
        <Grid container spacing={2} width="100%" mt={2}>
            {events.map((event, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                    <EventCard event={event} />
                </Grid>
            ))}
        </Grid>
    );
};
