import { Stack } from '@mui/material';
import { useState } from 'react';
import { GridView } from '../modules/scheduler/GridView/GridView';
import { MonthlyView } from '../modules/scheduler/MonthlyView/MonthlyView';
import { SchedulerToolbar } from '../modules/scheduler/SchedulerToolbar';
import { WeeklyView } from '../modules/scheduler/WeeklyView/WeeklyView';

export const ScheduleView = () => {
    const [viewMode, setViewMode] = useState<'weekly' | 'monthly' | 'grid'>('weekly');

    return (
        <Stack spacing={1}>
            <SchedulerToolbar viewMode={viewMode} setViewMode={setViewMode} />
            {viewMode === 'weekly' && <WeeklyView />}
            {viewMode === 'monthly' && <MonthlyView />}
            {viewMode === 'grid' && <GridView />}
        </Stack>
    );
};
