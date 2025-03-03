import { ColorSystemOptions, createTheme } from "@mui/material";
import { DefaultColorScheme } from "@mui/material/styles/createThemeWithVars";

const theme = createTheme();
const augmentColor = createTheme().palette.augmentColor;

type ColorSchemes =
    | (Partial<Record<DefaultColorScheme, boolean | ColorSystemOptions>> &
          Record<never, ColorSystemOptions>)
    | undefined;

export const colorSchemes: ColorSchemes = {
    light: {
        palette: {
            background: {
                default: "#FAFAFA",
                paper: "#FFF",
            },
            divider: "rgba(20, 20, 20, 0.1)",
            primary: theme.palette.augmentColor({
                color: {
                    main: "#3463FF",
                    contrastText: "#fff",
                },
            }),
            neutral: theme.palette.augmentColor({
                color: {
                    main: "#E2E2E2",
                    contrastText: "#000",
                },
            }),
            error: theme.palette.augmentColor({
                color: {
                    main: "#FF5630",
                    contrastText: "#fff",
                },
            }),
        },
    },
    dark: {
        palette: {
            mode: "dark",
            background: {
                default: "#060E13",
                paper: "#101419",
            },
            text: {
                primary: "#fff",
                secondary: "#999",
                disabled: "#666",
            },
            divider: "rgba(255, 255, 255, 0.05)",
            primary: augmentColor({
                color: {
                    main: "#3463FF",
                    contrastText: "#fff",
                },
            }),
            neutral: augmentColor({
                color: {
                    main: "#E2E2E2",

                    contrastText: "#000",
                },
            }),
            info: augmentColor({
                color: {
                    light: "#61F3F3",
                    main: "#00B8D9",
                    dark: "#006C9C",
                    contrastText: "#fff",
                },
            }),
            success: augmentColor({
                color: {
                    light: "#77ED8B",
                    main: "#22C55E",
                    dark: "#118D57",
                    contrastText: "#fff",
                },
            }),
            warning: augmentColor({
                color: {
                    light: "#FFD666",
                    main: "#FFAB00",
                    dark: "#B76E00",
                    contrastText: "#fff",
                },
            }),
            error: theme.palette.augmentColor({
                color: {
                    light: "#FFAC82",
                    main: "#FF5630",
                    dark: "#B71D18",
                    contrastText: "#fff",
                },
            }),
        },
    },
};
