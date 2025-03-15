import { alpha, Components, darken, lighten, Theme, toggleButtonGroupClasses } from '@mui/material';

export const inputCustomisations: Components<Theme> = {
    MuiButton: {
        defaultProps: {
            disableElevation: true,
        },
        styleOverrides: {
            root: ({ theme, ownerState }) => ({
                textTransform: 'none',
                variants: [
                    {
                        props: {
                            size: 'small',
                        },
                        style: {
                            height: '2.25rem',
                            padding: '8px 12px',
                        },
                    },
                    {
                        props: {
                            size: 'medium',
                        },
                        style: {
                            height: '2.5rem', // 40px
                        },
                    },
                    {
                        props: {
                            variant: 'contained',
                        },
                        style: {
                            '&:hover': {
                                backgroundColor: darken(
                                    ownerState.color && ownerState.color !== 'inherit'
                                        ? theme.palette[ownerState.color]?.main || theme.palette.primary.main
                                        : theme.palette.primary.main,
                                    theme.palette.mode === 'dark' ? 0.3 : 0.2,
                                ),
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'outlined',
                        },
                        style: () => {
                            const paletteColor =
                                ownerState.color && ownerState.color !== 'inherit'
                                    ? theme.palette[ownerState.color] || theme.palette.primary
                                    : theme.palette.primary;

                            const mode = theme.palette.mode;

                            return {
                                backgroundColor: mode === 'dark' ? paletteColor.dark : lighten(paletteColor.light, 0.8),
                                color: mode === 'dark' ? paletteColor.main : paletteColor.dark,
                                borderColor: lighten(paletteColor.dark, 0.2),
                                '&:hover': {
                                    borderColor: mode === 'dark' ? lighten(paletteColor.dark, 0.3) : lighten(paletteColor.light, 0.0),
                                },
                            };
                        },
                    },
                    {
                        props: {
                            color: 'neutral',
                            variant: 'outlined',
                        },
                        style: [
                            {
                                color: theme.palette.grey[700],
                                border: '1px solid',
                                borderColor: theme.palette.divider,
                                backgroundColor: theme.palette.background.paper,
                                '&:hover': {
                                    backgroundColor: darken(theme.palette.background.paper, 0.05),
                                    borderColor: alpha(theme.palette.divider, 0.2),
                                },
                            },
                            theme.applyStyles('dark', {
                                color: theme.palette.grey[50],
                                border: '1px solid',
                                borderColor: theme.palette.divider,
                                backgroundColor: theme.palette.background.paper,
                                '&:hover': {
                                    borderColor: alpha(theme.palette.divider, 0.2),
                                    backgroundColor: lighten(theme.palette.background.paper, 0.05),
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
                    size: 'small',
                },
                style: {
                    height: '2.25rem',
                    padding: '8px 12px',
                },
            },
            {
                props: {
                    size: 'medium',
                },
                style: {
                    height: '2.5rem', // 40px
                },
            },
        ],
        styleOverrides: {
            root: ({ theme }) => ({
                [`& .${toggleButtonGroupClasses.grouped}`]: {
                    textTransform: 'none',
                    margin: theme.spacing(0.5),
                    border: 0,
                    borderRadius: theme.shape.borderRadius - 4,
                    [`&.${toggleButtonGroupClasses.disabled}`]: {
                        border: 0,
                    },
                },
                [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]: {
                    marginLeft: -1,
                    borderLeft: '1px solid transparent',
                },
            }),
        },
    },
};
