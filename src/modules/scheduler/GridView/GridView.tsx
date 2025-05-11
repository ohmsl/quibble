import { Grid, Paper } from '@mui/material';
import { useAppState } from '../../state/useAppState';

export const GridView = () => {
    const roles = useAppState.use.roles();

    const columnSize = 12 / roles.length;

    return (
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid size={12}>
                <Paper>A/V</Paper>
            </Grid>
            <Grid size={columnSize}>
                <Paper>Microphones</Paper>
            </Grid>
            <Grid size={columnSize}>
                <Paper>Platform</Paper>
            </Grid>
        </Grid>
    );
};
