import { Button, InputAdornment, TextField, Toolbar } from '@mui/material';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { useDialog } from '../../providers/DialogProvider';
import { useAppState } from '../state/useAppState';
import { RoleForm, RoleFormValues } from './RoleForm';

export const RolesToolbar = () => {
    const { showDialog, closeDialog } = useDialog();

    const addRole = useAppState.use.addRole();

    const handleSubmit = (data: RoleFormValues) => {
        addRole(data);
        closeDialog();
    };

    const handleCreateRole = () => {
        showDialog(<RoleForm onClose={closeDialog} onSubmit={handleSubmit} />, {
            slotProps: { paper: { sx: { height: '100%' } } },
            fullWidth: true,
        });
    };

    return (
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', gap: 1 }}>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <Button startIcon={<PlusIcon />} variant="contained" onClick={handleCreateRole} sx={{ textWrap: 'nowrap' }}>
                Create Role
            </Button>
        </Toolbar>
    );
};
