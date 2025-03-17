import { useState } from 'react';
import { useNavigate } from 'react-router';
import { usePbStore } from '../modules/state/pocketbase/usePbStore';
import { LoginParams } from '../types/auth/LoginParams';

export const useAuth = () => {
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated, user, token, isLoading, registerUser, login, logout, refreshAuthState } = usePbStore();

    const handleRegister = async (data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) => {
        try {
            await registerUser(data);
            navigate('/schedule');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
            console.error('Registration error:', error);
        }
    };

    const handleLogin = async (params: LoginParams) => {
        try {
            await login(params);
            navigate('/schedule');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
            console.error('Login error:', error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return {
        isAuthenticated,
        user,
        token,
        isLoading,
        error,
        register: handleRegister,
        login: handleLogin,
        logout: handleLogout,
        refreshAuthState,
    };
};
