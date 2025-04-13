import { Box, Button, Typography } from '@mui/material';

export const NotFound = () => {
    const handleBack = () => window.history.back();

    return (
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
            <Typography>Oops! Page not found ¯\_(ツ)_/¯</Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleBack}>
                Go Back
            </Button>
        </Box>
    );
};
