import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
} from "@mui/material";
import { CircleHelpIcon, EditIcon, Trash2Icon } from "lucide-react";
import { ActionMenu } from "../../components/ActionMenu";
import { ConfirmPrompt } from "../../components/ConfirmPrompt";
import { useDialog } from "../../providers/DialogProvider";
import { RolesRecord } from "../../types/pb_types";
import { useAppState } from "../state/useAppState";
import { RoleForm } from "./RoleForm";
import { roleIconMap } from "./roleIcons";

type Props = {
    roles: Array<RolesRecord>;
};

export const RolesList: React.FC<Props> = ({ roles }) => {
    const { showDialog, closeDialog } = useDialog();
    const addRole = useAppState.use.addRole();
    const updateRole = useAppState.use.updateRole();
    const removeRole = useAppState.use.removeRole();

    const handleSaveRole = (role: RolesRecord) => {
        if (!role.id) addRole(role);
        else updateRole(role.id, role);

        closeDialog();
    };

    const handleEdit = (role: RolesRecord) => {
        showDialog(
            <RoleForm
                defaultValues={role}
                onClose={closeDialog}
                onSubmit={handleSaveRole}
            />,
        );
    };

    const handleRemove = (role: RolesRecord) => {
        showDialog(
            <ConfirmPrompt
                title="Remove Role"
                message={`Are you sure you want to remove the role "${role.name}"?`}
                onClose={closeDialog}
                onConfirm={() => {
                    removeRole(role.id);
                    closeDialog();
                }}
                confirmButton={{ text: "Remove", color: "error" }}
                cancelButton={{ text: "Cancel" }}
            />,
        );
    };

    return (
        <List component={Stack} spacing={1}>
            {roles.map((role) => {
                const Icon = roleIconMap[role.icon];

                return (
                    <ListItem
                        key={role.name}
                        component={Paper}
                        variant="outlined"
                        secondaryAction={
                            <ActionMenu
                                actions={[
                                    {
                                        label: "Edit",
                                        icon: <EditIcon />,
                                        onClick: () => handleEdit(role),
                                    },
                                    {
                                        label: "Delete",
                                        icon: <Trash2Icon />,
                                        menuItemProps: {
                                            color: "error",
                                            sx: { color: "error.main" },
                                        },
                                        onClick: () => handleRemove(role),
                                    },
                                ]}
                            />
                        }
                        sx={{ minHeight: 76, pr: 7 }}
                    >
                        <ListItemIcon>
                            {Icon ? <Icon /> : <CircleHelpIcon />}
                        </ListItemIcon>
                        <ListItemText
                            primary={role.name}
                            secondary={role.description}
                            slotProps={{
                                secondary: {
                                    sx: {
                                        textWrap: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    },
                                },
                            }}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};
