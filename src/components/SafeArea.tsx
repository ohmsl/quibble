import { Box, styled } from '@mui/material';

export const SafeArea = styled(Box)(() => ({
    minHeight: '100vh',
    paddingTop: 'env(safe-area-inset-top)',
    paddingBottom: 'env(safe-area-inset-bottom)',
}));
