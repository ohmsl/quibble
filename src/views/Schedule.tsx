import { Typography } from "@mui/material";
import { Events } from "../modules/scheduler/Events";
import { SchedulerToolbar } from "../modules/scheduler/SchedulerToolbar";
import { WeeklyView } from "../modules/scheduler/WeeklyView/WeeklyView";

export const Schedule = () => {
    return (
        <>
            <Typography variant="h5">Meeting Schedule</Typography>

            <SchedulerToolbar />
            <WeeklyView />
            <Events />
        </>
    );
};
