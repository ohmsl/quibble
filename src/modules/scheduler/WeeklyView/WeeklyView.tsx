import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Day } from "./Day";

export const WeeklyView = () => {
    const days = Array.from(
        { length: 7 },
        (_, i) => new Date(new Date().setDate(new Date().getDate() + i)),
    );

    return (
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
                <IconButton>
                    <ArrowLeftIcon />
                </IconButton>
                <Typography fontWeight="bold">March 3rd - March 9th</Typography>
                <IconButton>
                    <ArrowRightIcon />
                </IconButton>
            </Box>
            <Stack direction="row" spacing={2} justifyContent="space-around">
                {days.map((day) => (
                    <Day key={day.toISOString()} date={day} />
                ))}
            </Stack>
        </Paper>
    );
};
