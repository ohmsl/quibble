import { Components, Theme } from "@mui/material";

export const feedbackCustomisations: Components<Theme> = {
    MuiDialog: {
        styleOverrides: {
            paper: {
                backgroundImage: "none",
            },
            container: {
                backdropFilter: "blur(8px)",
            },
        },
    },
};
