import {
    ButtonBase,
    Grid2 as Grid,
    Stack,
    type SxProps,
    Typography,
    alpha,
    touchRippleClasses,
    useTheme,
} from "@mui/material";
import { format, isToday as isDateToday } from "date-fns";
import { useState } from "react";
import { EventsRecord } from "../../../types/pb_types";
import { EventPopover } from "./EventPopover";

type Props = {
    day: Date;
    events: Array<EventsRecord>;
    disabled?: boolean;
};

export const CalendarDay = ({ day, events, disabled }: Props) => {
    const [selectedEvent, setSelectedEvent] = useState<EventsRecord | null>(
        null,
    );
    const [eventPopoverAnchorEl, setEventPopoverAnchorEl] =
        useState<HTMLElement | null>(null);

    const theme = useTheme();

    const formattedDate = format(day, "d");
    const isToday = isDateToday(day);

    const todayStyle: SxProps = {
        display: "grid",
        placeItems: "center",
        width: 28,
        height: 28,
        background: alpha(theme.palette.primary.main, 0.15),
        color: "primary.main",
        borderRadius: "100%",
    };

    const handleEventClick = (
        e: React.MouseEvent<HTMLButtonElement>,
        event: EventsRecord,
    ) => {
        setSelectedEvent(event);
        setEventPopoverAnchorEl(e.currentTarget);
    };

    return (
        <>
            <Grid
                key={formattedDate}
                size={1}
                minHeight={100}
                bgcolor="background.paper"
            >
                <Stack width="100%" height="100%" spacing={0.5} p={1}>
                    <Typography
                        sx={[
                            {
                                color: disabled
                                    ? "text.disabled"
                                    : "text.primary",
                                fontWeight: 600,
                            },
                            ...(isToday ? [todayStyle] : []),
                        ]}
                    >
                        {format(day, "d")}
                    </Typography>
                    {events.map((event) => {
                        const handleClick = (
                            e: React.MouseEvent<HTMLButtonElement>,
                        ) => {
                            handleEventClick(e, event);
                        };

                        return (
                            <ButtonBase
                                key={event.id}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    backgroundColor: alpha(
                                        theme.palette.primary.main,
                                        0.1,
                                    ),
                                    color: theme.palette.primary.main,
                                    ...theme.applyStyles("dark", {
                                        color: theme.palette.primary
                                            .contrastText,
                                    }),
                                    [`& .${touchRippleClasses.child}`]: {
                                        bgcolor: theme.palette.primary.light,
                                        color: theme.palette.primary.dark,
                                    },
                                    borderRadius: "4px",
                                    py: "2px",
                                    px: "6px",
                                }}
                                onClick={handleClick}
                            >
                                <Typography
                                    variant="caption"
                                    fontWeight={500}
                                    sx={{
                                        textWrap: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {event.title}
                                </Typography>
                            </ButtonBase>
                        );
                    })}
                </Stack>
            </Grid>
            {selectedEvent && (
                <EventPopover
                    anchorEl={eventPopoverAnchorEl}
                    onClose={() => setEventPopoverAnchorEl(null)}
                    event={selectedEvent}
                />
            )}
        </>
    );
};
