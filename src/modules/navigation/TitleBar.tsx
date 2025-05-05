import { AppBar, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import { MenuIcon } from 'lucide-react';
import { useLocation } from 'react-router';
import { useDrawer } from './drawer/DrawerProvider';
import { navConfig } from './navConfig';

export const TitleBar = () => {
    const theme = useTheme();
    const location = useLocation();

    const { openDrawer } = useDrawer();

    return (
        <AppBar
            position="static"
            sx={{ boxShadow: 1, paddingTop: 'env(safe-area-inset-top)', marginTop: 'calc(-1 * env(safe-area-inset-top))' }}
        >
            <Toolbar
                sx={{
                    width: '100%',
                    maxWidth: 'lg',
                    mx: 'auto',
                    gap: 1,
                }}
            >
                <>
                    <IconButton sx={{ color: 'inherit', zIndex: theme.zIndex.appBar + 1 }} onClick={openDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        sx={{
                            position: 'absolute',
                            left: 0,
                            textAlign: 'center',
                            width: '100%',
                            fontWeight: 'bold',
                            zIndex: theme.zIndex.appBar,
                        }}
                    >
                        {navConfig.find(item => item.path === location.pathname)?.label || ''}
                    </Typography>
                </>
            </Toolbar>
        </AppBar>
    );
};
