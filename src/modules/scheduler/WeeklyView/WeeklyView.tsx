import { Paper, Stack } from "@mui/material";
import { addWeeks, endOfWeek, startOfWeek, subWeeks } from "date-fns";
import { useMemo, useState } from "react";
import { createSelectEventsForRange } from "../../state/events/selectors/createSelectEventsForRange";
import { useAppState } from "../../state/useAppState";
import { DateRangeBar } from "../DateRangeBar";
import { Events } from "../Events";
import { areEventsOnDay } from "../utils/areEventsOnDay";
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

    const handleNext = () => {
        setWeekStart((prev) => addWeeks(prev, 1));
        setWeekEnd((prev) => addWeeks(prev, 1));
    };

    const handlePrevious = () => {
        setWeekStart((prev) => subWeeks(prev, 1));
        setWeekEnd((prev) => subWeeks(prev, 1));
    };

    const events = useAppState(createSelectEventsForRange(weekStart, weekEnd));

    return (
        <Stack spacing={2}>
            <Paper
                variant="outlined"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    p: 1,
                }}
            >
                <DateRangeBar
                    rangeStart={weekStart}
                    rangeEnd={weekEnd}
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                />
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-around"
                >
                    {days.map((day, index) => (
                        <Day
                            key={index}
                            date={day}
                            eventsOnDay={areEventsOnDay(events, day)}
                        />
                    ))}
                </Stack>
            </Paper>
            <Events rangeStart={weekStart} rangeEnd={weekEnd} />
        </Stack>
    );
};
