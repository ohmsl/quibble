import { Typography } from "@mui/material";
import { SchedulerToolbar } from "../modules/scheduler/SchedulerToolbar";
import { WeeklyView } from "../modules/scheduler/WeeklyView/WeeklyView";

export const ScheduleView = () => {
    return (
        <>
            <Typography variant="h5">Meeting Schedule</Typography>

            <SchedulerToolbar />
            <WeeklyView />
        </>
    );
};
