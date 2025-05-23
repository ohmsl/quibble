import { Box, Grid, Paper, Typography } from "@mui/material";
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    isSameDay,
    isSameMonth,
    startOfMonth,
    subMonths,
} from "date-fns";
import { useMemo, useState } from "react";
import { createSelectEventsForRange } from "../../state/events/selectors/createSelectEventsForRange";
import { useAppState } from "../../state/useAppState";
import { DateRangeBar } from "../DateRangeBar";
import { CalendarDay } from "./CalendarDay";

const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

export const MonthlyView = () => {
    const [rangeStart, setRangeStart] = useState(startOfMonth(new Date()));
    const [rangeEnd, setRangeEnd] = useState(endOfMonth(new Date()));

    const monthDays = eachDayOfInterval({
        start: rangeStart,
        end: rangeEnd,
    });

    const paddingDaysBefore = useMemo(() => {
        const startDay = rangeStart.getDay();
        const mondayBasedStartDay = startDay === 0 ? 6 : startDay - 1;
        return Array.from({ length: mondayBasedStartDay }, (_, i) => {
            const day = new Date(rangeStart);
            day.setDate(day.getDate() - mondayBasedStartDay + i);
            return day;
        });
    }, [rangeStart]);

    const paddingDaysAfter = useMemo(() => {
        const endDay = rangeEnd.getDay();
        const mondayBasedEndDay = endDay === 0 ? 6 : endDay - 1;
        return Array.from({ length: 6 - mondayBasedEndDay }, (_, i) => {
            const day = new Date(rangeEnd);
            day.setDate(day.getDate() + i + 1);
            return day;
        });
    }, [rangeEnd]);

    const allDays = useMemo(
        () => [...paddingDaysBefore, ...monthDays, ...paddingDaysAfter],
        [paddingDaysBefore, monthDays, paddingDaysAfter],
    );

    const handlePrevious = () => {
        setRangeStart((prev) => startOfMonth(subMonths(prev, 1)));
        setRangeEnd((prev) => endOfMonth(subMonths(prev, 1)));
    };

    const handleNext = () => {
        setRangeStart((prev) => startOfMonth(addMonths(prev, 1)));
        setRangeEnd((prev) => endOfMonth(addMonths(prev, 1)));
    };

    const events = useAppState(
        createSelectEventsForRange(rangeStart, rangeEnd),
    );

    const getEventsForDay = (day: Date) => {
        return events.filter((event) => {
            return isSameDay(event.date, day);
        });
    };

    return (
        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
            <DateRangeBar
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
            />
            <Box bgcolor="divider">
                <Grid
                    container
                    spacing="1px"
                    height="100%"
                    pt="1px"
                    columns={7}
                    sx={{ flexGrow: 1 }}
                >
                    {daysOfWeek.map((day) => (
                        <Grid
                            key={day}
                            size={1}
                            py={0.5}
                            bgcolor="background.default"
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                fontWeight="bold"
                                textAlign="center"
                            >
                                {day}
                            </Typography>
                        </Grid>
                    ))}
                    {allDays.map((date) => {
                        const eventsForDay = getEventsForDay(date);
                        return (
                            <CalendarDay
                                key={date.toISOString()}
                                day={date}
                                events={eventsForDay}
                                disabled={!isSameMonth(date, rangeStart)}
                            />
                        );
                    })}
                </Grid>
            </Box>
        </Paper>
    );
};
