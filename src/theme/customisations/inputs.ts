import {
    alpha,
    Components,
    darken,
    lighten,
    Theme,
    toggleButtonGroupClasses,
} from "@mui/material";

export const inputCustomisations: Components<Theme> = {
    MuiButton: {
        defaultProps: {
            disableElevation: true,
        },
        styleOverrides: {
            root: ({ theme }) => ({
                textTransform: "none",
                variants: [
                    {
                        props: {
                            size: "small",
                        },
                        style: {
                            height: "2.25rem",
                            padding: "8px 12px",
                        },
                    },
                    {
                        props: {
                            size: "medium",
                        },
                        style: {
                            height: "2.5rem", // 40px
                        },
                    },
                    {
                        props: {
                            color: "neutral",
                            variant: "outlined",
                        },
                        style: [
                            {
                                color: theme.palette.grey[700],
                                border: "1px solid",
                                borderColor: theme.palette.divider,
                                backgroundColor: theme.palette.background.paper,
                                "&:hover": {
                                    backgroundColor: darken(
                                        theme.palette.background.paper,
                                        0.05,
                                    ),
                                    borderColor: alpha(
                                        theme.palette.divider,
                                        0.2,
                                    ),
                                },
                            },
                            theme.applyStyles("dark", {
                                color: theme.palette.grey[50],
                                border: "1px solid",
                                borderColor: theme.palette.divider,
                                backgroundColor: theme.palette.background.paper,
                                "&:hover": {
                                    borderColor: alpha(
                                        theme.palette.divider,
                                        0.2,
                                    ),
                                    backgroundColor: lighten(
                                        theme.palette.background.paper,
                                        0.05,
                                    ),
                                },
                            }),
                        ],
                    },
                ],
            }),
        },
    },
    MuiToggleButtonGroup: {
        variants: [
            {
                props: {
                    size: "small",
                },
                style: {
                    height: "2.25rem",
                    padding: "8px 12px",
                },
            },
            {
                props: {
                    size: "medium",
                },
                style: {
                    height: "2.5rem", // 40px
                },
            },
        ],
        styleOverrides: {
            root: ({ theme }) => ({
                [`& .${toggleButtonGroupClasses.grouped}`]: {
                    textTransform: "none",
                    margin: theme.spacing(0.5),
                    border: 0,
                    borderRadius: theme.shape.borderRadius - 4,
                    [`&.${toggleButtonGroupClasses.disabled}`]: {
                        border: 0,
                    },
                },
                [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
                    {
                        marginLeft: -1,
                        borderLeft: "1px solid transparent",
                    },
            }),
        },
    },
};
