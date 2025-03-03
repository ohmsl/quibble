import { alpha, Box, Typography, useTheme } from "@mui/material";
import { format, isToday } from "date-fns";

type DayProps = {
    date: Date;
};

export const Day: React.FC<DayProps> = ({ date }) => {
    const theme = useTheme();

    const today = isToday(date);

    return (
        <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" fontWeight={600} color="textSecondary">
                {format(date, "EEE")}
            </Typography>
            <Typography
                sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 32,
                    height: 32,
                    background: today
                        ? alpha(theme.palette.info.main, 0.15)
                        : "transparent",
                    color: today ? "info.main" : "text.primary",
                    borderRadius: "100%",
                    fontSize: theme.typography.pxToRem(18),
                    fontWeight: today ? 800 : 500,
                }}
            >
                {format(date, "d")}
            </Typography>
        </Box>
    );
};
