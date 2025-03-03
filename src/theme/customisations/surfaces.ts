import { Components, Theme } from "@mui/material";

export const surfacesCustomisations: Components<Theme> = {
    MuiCardContent: {
        styleOverrides: {
            root: ({ theme }) => ({
                "&:last-child": {
                    paddingBottom: theme.spacing(2),
                },
            }),
        },
    },
};
