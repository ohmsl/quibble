import { Typography } from '@mui/material';
import { useState } from 'react';
import { MonthlyView } from '../modules/scheduler/MonthlyView/MonthlyView';
import { SchedulerToolbar } from '../modules/scheduler/SchedulerToolbar';
import { WeeklyView } from '../modules/scheduler/WeeklyView/WeeklyView';

export const ScheduleView = () => {
    const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');

    return (
        <>
            <Typography variant="h5">Meeting Schedule</Typography>

            <SchedulerToolbar viewMode={viewMode} setViewMode={setViewMode} />
            {viewMode === 'weekly' && <WeeklyView />}
            {viewMode === 'monthly' && <MonthlyView />}
        </>
    );
};
