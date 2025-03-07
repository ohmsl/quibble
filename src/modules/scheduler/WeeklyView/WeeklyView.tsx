import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import {
    addWeeks,
    endOfWeek,
    isSameDay,
    startOfWeek,
    subWeeks,
} from "date-fns";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { createSelectEventsForRange } from "../../state/events/selectors/createSelectEventsForRange";
import { useAppState } from "../../state/useAppState";
import { Events } from "../Events";
import { Day } from "./Day";

export const WeeklyView = () => {
    const [weekStart, setWeekStart] = useState(
        startOfWeek(new Date(), { weekStartsOn: 1 }),
    );
    const [weekEnd, setWeekEnd] = useState(
        endOfWeek(new Date(), { weekStartsOn: 1 }),
    );

    const days = useMemo(
        () =>
            Array.from({ length: 7 }, (_, i) => {
                const newDate = new Date(weekStart);
                newDate.setDate(weekStart.getDate() + i);
                return newDate;
            }),
        [weekStart],
    );

    const handleForward = () => {
        setWeekStart((prev) => addWeeks(prev, 1));
        setWeekEnd((prev) => addWeeks(prev, 1));
    };

    const handleBackward = () => {
        setWeekStart((prev) => subWeeks(prev, 1));
        setWeekEnd((prev) => subWeeks(prev, 1));
    };

    const events = useAppState(createSelectEventsForRange(weekStart, weekEnd));

    const eventsOnDay = (day: Date) => {
        const dayEvents = events.filter((event) => {
            const date = new Date(event.date);
            return isSameDay(date, day);
        });
        return dayEvents.length > 0;
    };

    return (
        <>
            <Paper
                variant="outlined"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    p: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <IconButton onClick={handleBackward}>
                        <ArrowLeftIcon />
                    </IconButton>
                    <Typography fontWeight="bold">
                        March 3rd - March 9th
                    </Typography>
                    <IconButton onClick={handleForward}>
                        <ArrowRightIcon />
                    </IconButton>
                </Box>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-around"
                >
                    {days.map((day, index) => (
                        <Day
                            key={index}
                            date={day}
                            eventsOnDay={eventsOnDay(day)}
                        />
                    ))}
                </Stack>
            </Paper>
            <Events rangeStart={weekStart} rangeEnd={weekEnd} />
        </>
    );
};
