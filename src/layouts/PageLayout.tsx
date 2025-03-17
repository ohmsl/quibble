import { Container } from '@mui/material';
import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';

export const PageLayout = () => {
    return (
        <>
            <Navbar />
            <Container sx={{ my: 3 }} maxWidth="lg">
                <Outlet />
            </Container>
        </>
    );
};
