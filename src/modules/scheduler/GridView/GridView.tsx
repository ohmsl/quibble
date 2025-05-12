import { Grid, Paper } from "@mui/material";
import { useAppState } from "../../state/useAppState";

export const GridView = () => {
    const roles = useAppState.use.roles();

    const columnSize = 12 / roles.length;

    return (
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            {roles.map((role, index) => (
                <Grid key={index} size={columnSize}>
                    <Paper>{role.name}</Paper>
                </Grid>
            ))}
        </Grid>
    );
};
