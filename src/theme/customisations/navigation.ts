import { Components, Fade, Theme } from "@mui/material";

export const navigationCustomisations: Components<Theme> = {
    MuiMenu: {
        defaultProps: {
            TransitionComponent: Fade,
        },
        styleOverrides: {
            root: ({ theme }) => ({
                "& .MuiMenuItem-root .MuiListItemIcon-root": {
                    minWidth: 0,
                    marginRight: theme.spacing(1.5),
                },
            }),
        },
    },
};
