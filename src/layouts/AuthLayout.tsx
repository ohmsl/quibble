import { Box } from '@mui/material';
import { Outlet } from 'react-router';

export const AuthLayout = () => {
    return (
        <Box sx={{ display: 'flex', placeItems: 'center', height: '100vh' }}>
            <Outlet />
        </Box>
    );
};
