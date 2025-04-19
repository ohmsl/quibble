import {
    IconButton,
    type IconButtonProps,
    MenuItem,
    menuItemClasses,
    type MenuItemProps,
    MenuList,
    Popover,
    PopoverProps,
} from '@mui/material';
import { MoreVertical } from 'lucide-react';
import { useState } from 'react';

export type MenuAction = {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    menuItemProps?: MenuItemProps;
    disabled?: boolean;
};

type Props = {
    actions: Array<MenuAction>;
    slotProps?: {
        iconButton?: IconButtonProps;
        popover?: PopoverProps;
        menuItem?: MenuItemProps;
    };
    children?: React.ReactNode;
};

export const ActionMenu: React.FC<Props> = ({ actions, slotProps = {}, children }) => {
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
            <Popover anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} sx={{ minWidth: 200 }} {...slotProps.popover}>
                <MenuList
                    sx={{
                        p: 0.5,
                        gap: 0.5,
                        display: 'flex',
                        flexDirection: 'column',
                        [`& .${menuItemClasses.root}`]: {
                            px: 1.5,
                            gap: 2,
                            borderRadius: 0.75,
                        },
                    }}
                >
                    {actions.map(action => (
                        <MenuItem
                            key={action.label}
                            onClick={action.onClick}
                            disabled={action.disabled}
                            {...slotProps.menuItem}
                            {...action.menuItemProps}
                        >
                            {action.icon}
                            {action.label}
                        </MenuItem>
                    ))}
                </MenuList>
            </Popover>
        </>
    );
};
