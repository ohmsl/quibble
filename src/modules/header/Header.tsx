import { AppBar, Toolbar } from '@mui/material';
import { ProfilePopover } from './ProfilePopover';

export const Header = () => {
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <div></div>
                <ProfilePopover />
            </Toolbar>
        </AppBar>
    );
};
