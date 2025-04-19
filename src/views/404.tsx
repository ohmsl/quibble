import { Box, Button, Typography } from '@mui/material';
import { ArrowLeftIcon, HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

export const NotFound = () => {
    const navigate = useNavigate();

    const handleBack = () => window.history.back();
    const handleHome = () => navigate('/');

    const canGoBack = window.history.length > 1;

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100dvw',
                    height: '100dvh',
                }}
            >
                <Typography variant="h1">404</Typography>
                <Typography>
                    Oops! Page not found <code>¯\_(ツ)_/¯</code>
                </Typography>
                {canGoBack ? (
                    <Button variant="contained" sx={{ mt: 2 }} onClick={handleBack} startIcon={<ArrowLeftIcon />}>
                        Go Back
                    </Button>
                ) : (
                    <Button variant="contained" sx={{ mt: 2 }} onClick={handleHome} startIcon={<HomeIcon />}>
                        Go Home
                    </Button>
                )}
            </Box>
        </>
    );
};
