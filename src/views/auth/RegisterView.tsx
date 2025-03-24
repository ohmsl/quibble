import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, CircularProgress, Container, Divider, Link, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { usePbStore } from '../../modules/state/pocketbase/usePbStore';

export const RegisterView = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const [name, setName] = useState({ first: '', last: '' });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { registerUser, login, isLoading, user } = usePbStore();

    const handleSubmit = async () => {
        try {
            await registerUser({
                firstName: name.first,
                lastName: name.last,
                email,
                password,
            });

            navigate('/register/organisation');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
                console.error(error);
            }
        }
    };

    const handleAuthWithGoogle = () => {
        login({ method: 'oauth', provider: 'google' });
    };

    const handleAuthWithApple = () => {
        login({ method: 'oauth', provider: 'apple' });
    };

    const disabled = Boolean(!email || !password || isLoading || user);

    return (
        <Container maxWidth="sm">
            <Stack spacing={2}>
                <Box>
                    <Typography variant="h5">Welcome</Typography>
                    <Typography variant="subtitle1">Create an account to get started.</Typography>
                </Box>
                <Stack spacing={2} direction="row" width="100%">
                    <TextField
                        label="First Name"
                        id="first-name"
                        value={name.first}
                        onChange={e => setName({ ...name, first: e.target.value })}
                        fullWidth
                        disabled={isLoading}
                    />
                    <TextField
                        label="Last Name"
                        id="last-name"
                        value={name.last}
                        onChange={e => setName({ ...name, last: e.target.value })}
                        fullWidth
                        disabled={isLoading}
                    />
                </Stack>
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

                <Button color="warning" variant="contained" onClick={() => navigate('/register/organisation')}>
                    Skip
                </Button>

                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={disabled}>
                    {isLoading ? <CircularProgress size={24} /> : 'Register'}
                </Button>
                {error && (
                    <Typography variant="body2" color="error.main">
                        {error}
                    </Typography>
                )}
                <Stack direction="row" spacing={1} width="100%" justifyContent="center">
                    <Typography variant="body2">Already have an account?</Typography>
                    <Link component={NavLink} to="/login">
                        <Typography variant="body2" color="info.main" sx={{ cursor: 'pointer' }}>
                            Sign In
                        </Typography>
                    </Link>
                </Stack>
                <Divider>OR</Divider>
                <Button variant="contained" color="secondary" startIcon={<AppleIcon />} onClick={handleAuthWithApple} fullWidth>
                    Sign Up with Apple
                </Button>
                <Button variant="contained" color="secondary" startIcon={<GoogleIcon />} onClick={handleAuthWithGoogle} fullWidth>
                    Sign Up with Google
                </Button>
                {/* <Button
            variant="contained"
            fullWidth
            onClick={handleAuthWithGithub}
            sx={{
              backgroundColor: "#24292e",
              "&:hover": {
                backgroundColor: "#1d1f21",
              },
            }}
            startIcon={<GithubIcon />}
          >
            Sign In with Github
          </Button> */}
            </Stack>
        </Container>
    );
};
