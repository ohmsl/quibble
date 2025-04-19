import { Button, Toolbar, Typography } from '@mui/material';
import { PlusIcon } from 'lucide-react';

export const MembersToolbar = () => {
    return (
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h5">Members</Typography>
            <Button variant="contained" color="primary" startIcon={<PlusIcon />}>
                Add Brother
            </Button>
        </Toolbar>
    );
};
