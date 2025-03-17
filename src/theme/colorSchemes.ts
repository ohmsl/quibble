import { ColorSystemOptions, createTheme } from '@mui/material';
import { DefaultColorScheme } from '@mui/material/styles/createThemeWithVars';

const theme = createTheme();
const augmentColor = createTheme().palette.augmentColor;

type ColorSchemes = (Partial<Record<DefaultColorScheme, boolean | ColorSystemOptions>> & Record<never, ColorSystemOptions>) | undefined;

export const colorSchemes: ColorSchemes = {
    light: {
        palette: {
            background: {
                default: '#FAFAFA',
                paper: '#FFF',
            },
            divider: 'rgba(20, 20, 20, 0.1)',
            primary: theme.palette.augmentColor({
                color: {
                    main: '#3463FF',
                },
            }),
            secondary: theme.palette.augmentColor({
                color: {
                    main: '#000',
                },
            }),
            neutral: theme.palette.augmentColor({
                color: {
                    main: '#E2E2E2',
                },
            }),
            success: theme.palette.augmentColor({
                color: {
                    main: 'hsl(150, 86%, 42%)',
                },
            }),
            info: theme.palette.augmentColor({
                color: {
                    main: 'hsl(216, 75%, 60%)',
                },
            }),
            warning: theme.palette.augmentColor({
                color: {
                    main: 'hsl(60, 100%, 42%)',
                },
            }),
            error: theme.palette.augmentColor({
                color: {
                    main: 'hsl(11deg, 100%, 59%)',
                },
            }),
        },
    },
    dark: {
        palette: {
            mode: 'dark',
            background: {
                default: '#060E13',
                paper: '#101419',
            },
            text: {
                primary: '#fff',
                secondary: '#999',
                disabled: '#666',
            },
            divider: 'rgba(255, 255, 255, 0.05)',
            primary: augmentColor({
                color: {
                    main: 'hsl(226deg, 100%, 60%)',
                    dark: 'hsl(226deg, 100%, 6%)',
                    contrastText: '#fff',
                },
            }),
            secondary: augmentColor({
                color: {
                    main: 'hsl(0, 0%, 99%)',
                    dark: '#000000',
                },
            }),
            neutral: augmentColor({
                color: {
                    main: '#E2E2E2',

                    contrastText: '#000',
                },
            }),
            info: augmentColor({
                color: {
                    main: 'hsl(216, 87%, 65%)',
                    dark: 'hsl(215, 100%, 6%)',
                },
            }),
            success: augmentColor({
                color: {
                    main: 'hsl(150, 86%, 65%)',
                    dark: 'hsl(150, 100%, 6%)',
                },
            }),
            warning: augmentColor({
                color: {
                    dark: 'hsl(64, 100%, 6%)',
                    main: 'hsl(46, 87%, 65%)',
                },
            }),
            error: theme.palette.augmentColor({
                color: {
                    dark: 'hsl(358, 76%, 10%)',
                    main: 'hsl(358, 100%, 70%)',
                    light: 'hsl(358, 100%, 81%)',
                },
            }),
        },
    },
};
