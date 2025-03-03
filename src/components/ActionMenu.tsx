import {
    IconButton,
    IconButtonProps,
    ListItemIcon,
    Menu,
    MenuItem,
    MenuItemProps,
    MenuProps,
} from "@mui/material";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

export type MenuAction = {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    menuItemProps?: MenuItemProps;
};

type Props = {
    actions: Array<MenuAction>;
    slotProps?: {
        iconButton?: IconButtonProps;
        menu?: MenuProps;
        menuItem?: MenuItemProps;
    };
    children?: React.ReactNode;
};

export const ActionMenu: React.FC<Props> = ({
    actions,
    slotProps = {},
    children,
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick} {...slotProps.iconButton}>
                {children ? children : <MoreVertical />}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                {...slotProps.menu}
            >
                {actions.map((action, index) => (
                    <MenuItem
                        key={index}
                        onClick={action.onClick}
                        {...slotProps.menuItem}
                        {...action.menuItemProps}
                    >
                        {action.icon && (
                            <ListItemIcon sx={{ color: "inherit" }}>
                                {action.icon}
                            </ListItemIcon>
                        )}
                        {action.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
