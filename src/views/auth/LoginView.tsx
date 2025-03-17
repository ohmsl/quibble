import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, CircularProgress, Container, Divider, Link, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, isLoading, user, error } = useAuth();

    const handleSubmit = () => {
        login({ method: 'password', email, password });
    };

    const handleAuthWithGoogle = () => {
        login({ method: 'oauth', provider: 'google' });
    };

    const disabled = Boolean(!email || !password || isLoading || user);

    return (
        <Container maxWidth="sm">
            <Stack spacing={2}>
                <Box>
                    <Typography variant="h5">Welcome</Typography>
                    <Typography variant="subtitle1">Please sign in to continue.</Typography>
                </Box>
                <TextField
                    label="Email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={isLoading}
                />
                <TextField
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={isLoading}
                />
                <Link variant="body2" component={NavLink} to="/forgot-password">
                    Forgot password?
                </Link>
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={disabled}>
                    {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
                </Button>
                {error && (
                    <Typography variant="body2" color="error.main">
                        {error}
                    </Typography>
                )}
                <Stack direction="row" spacing={1} width="100%" justifyContent="center">
                    <Typography variant="body2">Don't have an account?</Typography>
                    <Link variant="body2" component={NavLink} to="/register">
                        Sign Up
                    </Link>
                </Stack>
                <Divider>OR</Divider>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: '#F1F3F4',
                        '&:hover': {
                            backgroundColor: '#E1E4E5',
                        },
                        color: '#24292e',
                    }}
                    startIcon={<GoogleIcon strokeWidth={24} />}
                    onClick={handleAuthWithGoogle}
                >
                    Sign In with Google
                </Button>
                {/* <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#FFF",
                "&:hover": {
                  backgroundColor: "#F1F3F4",
                },
                color: "#24292e",
              }}
              startIcon={<AppleIcon />}
              onClick={handleAuthWithApple}
            >
              Sign In with Apple
            </Button> */}
            </Stack>
        </Container>
    );
};
