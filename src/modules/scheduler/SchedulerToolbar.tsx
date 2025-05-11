import CalendarViewMonthIcon from '@mui/icons-material/CalendarMonth';
import GridViewIcon from '@mui/icons-material/GridViewRounded';
import WeekViewIcon from '@mui/icons-material/ViewWeekRounded';
import { Button, Paper, Stack, ToggleButton, ToggleButtonGroup, Toolbar } from '@mui/material';
import { DownloadIcon, PlusIcon, Sparkles as SparklesIcon } from 'lucide-react';
import { ActionMenu } from '../../components/ActionMenu';
import useIsSmallScreen from '../../hooks/useIsSmallScreen';
import { useDialog } from '../../providers/DialogProvider';
import { useAppState } from '../state/useAppState';
import { EventForm, type EventFormValues } from './WeeklyView/EventForm';

type Props = {
    viewMode: string;
    setViewMode: (value: 'weekly' | 'monthly' | 'grid') => void;
};

export const SchedulerToolbar = ({ viewMode, setViewMode }: Props) => {
    const { showDialog, closeDialog } = useDialog();
    const addEvent = useAppState.use.addEvent();

    const handleViewModeChange = (_: React.MouseEvent<HTMLElement>, value: 'weekly' | 'monthly') => {
        setViewMode(value);
    };

    const handleSubmitEvent = (data: EventFormValues) => {
        addEvent(data);
        closeDialog();
    };

    const handleAddEvent = () => {
        showDialog(<EventForm onCancel={closeDialog} onSubmit={handleSubmitEvent} />, { fullWidth: true });
    };

    const isSmallScreen = useIsSmallScreen();

    return (
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Paper variant="outlined" sx={{ width: 'fit-content' }}>
                <ToggleButtonGroup exclusive value={viewMode} onChange={handleViewModeChange}>
                    <ToggleButton size="small" value="weekly">
                        <WeekViewIcon />
                    </ToggleButton>
                    <ToggleButton size="small" value="monthly">
                        <CalendarViewMonthIcon />
                    </ToggleButton>
                    <ToggleButton size="small" value="grid">
                        <GridViewIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Paper>
            <Stack direction="row" spacing={1}>
                {!isSmallScreen ? (
                    <>
                        <Button startIcon={<SparklesIcon />} variant="outlined" color="neutral">
                            Auto Assign
                        </Button>
                        <Button startIcon={<DownloadIcon />} variant="outlined" color="neutral">
                            Export
                        </Button>
                        <Button startIcon={<PlusIcon />} variant="contained" onClick={handleAddEvent}>
                            Add Event
                        </Button>
                    </>
                ) : (
                    <ActionMenu
                        actions={[
                            {
                                label: 'Add Event',
                                icon: <PlusIcon />,
                                onClick: handleAddEvent,
                            },
                            {
                                label: 'Auto Assign',
                                icon: <SparklesIcon />,
                            },
                            {
                                label: 'Export',
                                icon: <DownloadIcon />,
                            },
                        ]}
                    />
                )}
            </Stack>
        </Toolbar>
    );
};
