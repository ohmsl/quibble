import { Button, Toolbar } from '@mui/material';
import { PlusIcon } from 'lucide-react';

export const MembersToolbar = () => {
    return (
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" startIcon={<PlusIcon />}>
                Add Brother
            </Button>
        </Toolbar>
    );
};
