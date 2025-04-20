import { Components, Fade, menuItemClasses, Theme } from '@mui/material';

export const navigationCustomisations: Components<Theme> = {
    MuiLink: {
        defaultProps: {
            color: 'info',
            underline: 'hover',
        },
    },

    MuiPopover: {
        defaultProps: {
            TransitionComponent: Fade,
        },
    },

    MuiMenu: {
        defaultProps: {
            TransitionComponent: Fade,
        },
        styleOverrides: {
            root: ({ theme }) => ({
                '& .MuiMenuItem-root .MuiListItemIcon-root': {
                    minWidth: 0,
                    marginRight: theme.spacing(1.5),
                },
            }),
        },
    },

    MuiMenuItem: {
        styleOverrides: {
            root: () => ({
                minHeight: 0,
            }),
        },
    },

    MuiMenuList: {
        defaultProps: {
            disablePadding: true,
        },
        styleOverrides: {
            root: {
                background: 'red',
                p: 1,
                gap: 0.5,
                display: 'flex',
                flexDirection: 'column',
                [`& .${menuItemClasses.root}`]: {
                    px: 1,
                    gap: 2,
                    borderRadius: 0.75,
                    color: 'text.secondary',
                    '&:hover': { color: 'text.primary' },
                    [`&.${menuItemClasses.selected}`]: {
                        color: 'text.primary',
                        bgcolor: 'action.selected',
                        fontWeight: 'fontWeightSemiBold',
                    },
                },
            },
        },
    },
};
