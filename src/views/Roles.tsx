import { Typography } from "@mui/material";
import { RolesList } from "../modules/roles/RolesList";
import { RolesToolbar } from "../modules/roles/RolesToolbar";
import { useAppState } from "../modules/state/useAppState";

export const Roles = () => {
    const roles = useAppState.use.roles();

    return (
        <>
            <Typography variant="h5">Roles</Typography>
            <RolesToolbar />
            <RolesList roles={roles} />
        </>
    );
};
