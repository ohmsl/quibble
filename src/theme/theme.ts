import { alpha, createTheme, responsiveFontSizes } from '@mui/material';
import { colorSchemes } from './colorSchemes';
import { dataDisplayCustomisations } from './customisations/data-display';
import { feedbackCustomisations } from './customisations/feedback';
import { inputCustomisations } from './customisations/inputs';
import { navigationCustomisations } from './customisations/navigation';
import { surfacesCustomisations } from './customisations/surfaces';
import { shape, typography } from './primatives';

declare module '@mui/material/styles' {
    interface Palette {
        neutral: Palette['primary'];
    }

    interface PaletteOptions {
        neutral?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        neutral: true;
    }
}

const theme = responsiveFontSizes(
    createTheme({
        cssVariables: true,
        colorSchemes,
        typography,
        shape,
        components: {
            ...inputCustomisations,
            ...dataDisplayCustomisations,
            ...feedbackCustomisations,
            ...surfacesCustomisations,
            ...navigationCustomisations,
            MuiCssBaseline: {
                styleOverrides: theme => ({
                    body: {
                        background: alpha(theme.palette.background.default, 0.8),
                    },
                    '.lucide': {
                        width: 20,
                        height: 20,
                    },
                }),
            },
        },
    }),
);

export default theme;
