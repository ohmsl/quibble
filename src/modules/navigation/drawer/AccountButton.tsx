import { Avatar, ListItemButton, Stack, Typography, useTheme } from '@mui/material';
import { LogOutIcon } from 'lucide-react';
import { ConfirmPrompt } from '../../../components/ConfirmPrompt';
import { useAuth } from '../../../hooks/useAuth';
import { useDialog } from '../../../providers/DialogProvider';

export const AccountButton = () => {
    const theme = useTheme();
    const { showDialog, closeDialog } = useDialog();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        closeDialog();
        logout();
    };

    const handleClick = () => {
        showDialog(
            <ConfirmPrompt
                title="Log Out"
                message="Are you sure you want to log out?"
                onConfirm={handleLogout}
                onClose={closeDialog}
                confirmButton={{ text: 'Logout', color: 'error' }}
            />,
        );
    };

    // const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    return (
        <>
            <ListItemButton
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: `${theme.shape.borderRadius}px`,
                    gap: 1,
                    p: 1,
                }}
            >
                <Avatar src={user?.avatar} sx={{ width: 32, height: 32 }} />

                <Stack flex={1}>
                    <Typography variant="body2">{user?.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {user?.email}
                    </Typography>
                </Stack>
                <LogOutIcon />
            </ListItemButton>

            {/* <Popover
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Box p={0.5}>
                    <Button variant="contained" color="error" onClick={logout} sx={{ p: 1 }}>
                        Logout
                    </Button>
                </Box>
            </Popover> */}
        </>
    );
};
