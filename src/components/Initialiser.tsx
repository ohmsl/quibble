import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { getUser } from "../modules/auth/getUser";
import { initialise } from "../modules/initialisation/initialise";

export const Initialiser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = getUser();

    useEffect(() => {
        const unsubscribe = initialise();

        let targetRoute = "/";

        const loggedIn = !!user;
        const hasOrg = (user?.org_ids || []).length > 0;

        console.log("logged in:", loggedIn);
        console.log("has org:", hasOrg);

        if (!loggedIn) targetRoute = "/login";
        else if (loggedIn && !hasOrg) targetRoute = "/register/organisation";
        else targetRoute = "/schedule";

        if (location.pathname.length === 1) {
            navigate(targetRoute, { replace: true });
        }

        return unsubscribe;
    }, []);

    return null;
};
