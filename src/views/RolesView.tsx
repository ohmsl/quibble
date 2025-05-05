import { RolesList } from '../modules/roles/RolesList';
import { RolesToolbar } from '../modules/roles/RolesToolbar';
import { useAppState } from '../modules/state/useAppState';

export const RolesView = () => {
    const roles = useAppState.use.roles();

    return (
        <>
            <RolesToolbar />
            <RolesList roles={roles} />
        </>
    );
};
