import { Box } from '@mui/material';
import { Outlet } from 'react-router';

export const AuthLayout = () => {
    return (
        <Box sx={{ display: 'grid', placeItems: 'center', height: '100vh', p: 4, overflow: 'auto' }}>
            <Outlet />
        </Box>
    );
};
