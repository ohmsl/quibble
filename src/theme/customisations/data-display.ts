import { Components, Theme } from "@mui/material";

export const dataDisplayCustomisations: Components<Theme> = {
    MuiListItemIcon: {
        styleOverrides: {
            root: ({ theme }) => ({
                minWidth: 0,
                marginRight: theme.spacing(2),
            }),
        },
    },
};
