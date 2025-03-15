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
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { useDialog } from "../../providers/DialogProvider";
import type { Role } from "../../types/Role";
import { useAppState } from "../state/useAppState";
import { RoleForm } from "./RoleForm";
import { roleIconMap } from "./roleIcons";

type Props = {
	roles: Array<Role>;
};

export const RolesList: React.FC<Props> = ({ roles }) => {
	const { showDialog, closeDialog } = useDialog();
	const addRole = useAppState.use.addRole();
	const updateRole = useAppState.use.updateRole();
	const removeRole = useAppState.use.removeRole();

	const handleSaveRole = (role: Role) => {
		if (!role.id) addRole(role);
		else updateRole(role.id, role);

		closeDialog();
	};

	const handleEdit = (role: Role) => {
		showDialog(
			<RoleForm
				defaultValues={role}
				onClose={closeDialog}
				onSubmit={handleSaveRole}
			/>,
		);
	};

	const handleRemove = (role: Role) => {
		showDialog(
			<ConfirmDialog
				title="Remove Role"
				message={`Are you sure you want to remove the role "${role.name}"?`}
				onClose={closeDialog}
				onConfirm={() => {
					removeRole(role.name);
					closeDialog();
				}}
				confirmButton={{ text: "Remove", color: "error" }}
				cancelButton={{ text: "Cancel", color: "info" }}
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
										icon: <EditIcon size={20} />,
										onClick: () => handleEdit(role),
									},
									{
										label: "Delete",
										icon: <Trash2Icon size={20} />,
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
						<ListItemIcon>{Icon ? <Icon /> : <CircleHelpIcon />}</ListItemIcon>
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
