import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getUser } from "../modules/auth/getUser";
import { initialise } from "../modules/initialisation/initialise";

export const Initialiser = () => {
    const navigate = useNavigate();
    const user = getUser();

    useEffect(() => {
        const unsubscribe = initialise();

        let targetRoute = "/";

        const loggedIn = !!user;
        const hasOrg = (user?.org_ids || []).length > 0;

        if (!loggedIn) targetRoute = "/login";
        if (loggedIn && !hasOrg) targetRoute = "/register/organisation";
        else targetRoute = "/schedule";

        navigate(targetRoute, { replace: true });

        return unsubscribe;
    }, []);

    return null;
};
