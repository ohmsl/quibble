import { Box, IconButton, Typography } from "@mui/material";
import { format } from "date-fns";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

type Props = {
    rangeStart: Date;
    rangeEnd: Date;
    handlePrevious: () => void;
    handleNext: () => void;
};

export const DateRangeBar: React.FC<Props> = ({
    rangeStart,
    rangeEnd,
    handlePrevious,
    handleNext,
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
            }}
        >
            <IconButton onClick={handlePrevious}>
                <ArrowLeftIcon />
            </IconButton>
            <Typography fontWeight="bold">
                {format(rangeStart, "MMMM do")} -{" "}
                {format(rangeEnd, "MMMM do yyyy")}
            </Typography>
            <IconButton onClick={handleNext}>
                <ArrowRightIcon />
            </IconButton>
        </Box>
    );
};
