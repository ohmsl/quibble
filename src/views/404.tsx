import { Box, Button, Typography, useTheme } from '@mui/material';
import { ArrowLeftIcon } from 'lucide-react';

export const NotFound = () => {
    const theme = useTheme();
    console.log(theme.palette);

    const handleBack = () => window.history.back();

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
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleBack} startIcon={<ArrowLeftIcon size={20} />}>
                    Go Back
                </Button>
            </Box>
        </>
    );
};
