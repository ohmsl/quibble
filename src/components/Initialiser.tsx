import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { isAuthed } from '../modules/auth/isAuthed';
import { initialise } from '../modules/initialisation/initialise';

export const Initialiser = () => {
    const navigate = useNavigate();
    const authed = isAuthed();

    useEffect(() => {
        const unsubscribe = initialise();

        let targetRoute = '/';

        if (authed) targetRoute = '/schedule';
        else targetRoute = '/login';

        navigate(targetRoute, { replace: true });

        return unsubscribe;
    }, []);

    return null;
};
