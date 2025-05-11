import { Components, Theme, toggleButtonGroupClasses } from '@mui/material';

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
                                ...theme.applyStyles('dark', {
                                    backgroundColor: `color-mix(in srgb, ${
                                        ownerState.color && ownerState.color !== 'inherit'
                                            ? theme.vars.palette[ownerState.color]?.main || theme.vars.palette.primary.main
                                            : theme.vars.palette.primary.main
                                    }, black 20%)`,
                                }),
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
                                    ? theme.vars.palette[ownerState.color] || theme.palette.primary
                                    : theme.vars.palette.primary;

                            return {
                                ...theme.applyStyles('dark', {
                                    backgroundColor: paletteColor.dark,
                                    borderColor: paletteColor.light,
                                    color: paletteColor.main,
                                    '&:hover': {
                                        borderColor: `color-mix(in srgb, ${paletteColor.light}, white 30%)`,
                                    },
                                }),

                                ...theme.applyStyles('light', {
                                    backgroundColor: `color-mix(in srgb, ${paletteColor.light}, white 80%)`,
                                    borderColor: `color-mix(in srgb, ${paletteColor.light}, white 20%)`,
                                    color: paletteColor.dark,
                                    '&:hover': {
                                        borderColor: paletteColor.light,
                                    },
                                }),
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
                                color: theme.vars.palette.grey[700],
                                borderColor: theme.vars.palette.divider,
                                backgroundColor: theme.vars.palette.background.paper,
                                '&:hover': {
                                    backgroundColor: `color-mix(in srgb, ${theme.vars.palette.background.paper}, black 5%)`,
                                    borderColor: `color-mix(in srgb, ${theme.vars.palette.divider}, transparent 20%)`,
                                },
                            },
                            theme.applyStyles('dark', {
                                color: theme.vars.palette.grey[50],
                                borderColor: theme.vars.palette.divider,
                                backgroundColor: theme.vars.palette.background.paper,
                                '&:hover': {
                                    borderColor: `color-mix(in srgb, ${theme.vars.palette.divider}, transparent 20%)`,
                                    background: `color-mix(in srgb, ${theme.vars.palette.background.paper}, white 5%)`,
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
    MuiInputBase: {
        styleOverrides: {
            root: ({ theme, ownerState }) => ({
                '.MuiOutlinedInput-notchedOutline': {
                    transition: 'border-color 0.1s ease-in-out, border-width 0.1s ease-in-out',
                },

                '&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
                    borderColor: !ownerState.disabled && !ownerState.error && ownerState.color && theme.palette.text.secondary,
                },
            }),
        },
    },
};
