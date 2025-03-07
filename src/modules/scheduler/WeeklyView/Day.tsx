import { alpha, Box, Typography, useTheme } from "@mui/material";
import { format, isBefore, isToday, startOfDay } from "date-fns";
import { DotIcon } from "lucide-react";

type DayProps = {
    date: Date;
    eventsOnDay?: boolean;
};

export const Day: React.FC<DayProps> = ({ date, eventsOnDay }) => {
    const theme = useTheme();

    const today = isToday(date);
    const past = isBefore(date, startOfDay(new Date()));

    return (
        <Box sx={{ textAlign: "center" }}>
            <Typography
                variant="body2"
                fontWeight={600}
                color={past ? "textDisabled" : "textSecondary"}
            >
                {format(date, "EEE")}
            </Typography>
            <Typography
                sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 32,
                    height: 32,
                    background: today
                        ? alpha(theme.palette.primary.main, 0.15)
                        : "transparent",
                    color: today
                        ? "primary.main"
                        : past
                          ? "text.secondary"
                          : "text.primary",
                    borderRadius: "100%",
                    fontSize: theme.typography.pxToRem(18),
                    fontWeight: today ? 800 : 500,
                }}
            >
                {format(date, "d")}
            </Typography>
            {eventsOnDay && <DotIcon />}
        </Box>
    );
};
