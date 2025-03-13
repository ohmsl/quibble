import { createSelector } from "reselect";
import { RolesRecord } from "../../../../types/pb_types";
import { selectRoles } from "../../roles/rolesSlice";

export const createSelectRoles = (roleIds: Array<string>) =>
    createSelector([selectRoles], (allRoles): Array<RolesRecord> => {
        const roles = new Array<RolesRecord>();

        for (const roleId of roleIds) {
            const role = allRoles.find((role) => role.id === roleId);
            if (role) roles.push(role);
            else console.warn(`Role with id ${roleId} not found`);
        }

        return roles;
    });
