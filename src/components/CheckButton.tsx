import {
    alpha,
    ButtonBase,
    Checkbox,
    lighten,
    Paper,
    SxProps,
    touchRippleClasses,
    Typography,
    useTheme,
} from "@mui/material";

type Props = {
    selected?: boolean;
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
    sx?: SxProps;
    children?: React.ReactNode;
};

export const CheckButton: React.FC<Props> = ({
    selected = false,
    color = "primary",
    sx,
    children,
}) => {
    const theme = useTheme();

    const borderColor = selected
        ? alpha(theme.palette[color].light, 0.5)
        : theme.palette.divider;

    const backgroundColor = selected
        ? alpha(theme.palette[color].main, 0.15)
        : lighten(theme.palette.background.paper, 0.05);

    return (
        <Paper
            component={ButtonBase}
            variant="outlined"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                border: `1px solid ${borderColor}`,
                backgroundColor,
                color: selected
                    ? theme.palette[color].dark
                    : theme.palette.grey[700],
                pr: "10px",
                ...theme.applyStyles("dark", {
                    color: theme.palette[color].contrastText,
                }),
                [`& .${touchRippleClasses.child}`]: {
                    bgcolor: selected
                        ? theme.palette[color].light
                        : theme.palette.neutral.dark,
                    color: selected
                        ? theme.palette[color].dark
                        : theme.palette.grey[50],
                },
                ...sx,
            }}
        >
            <Checkbox checked={selected} color={color} disableRipple />
            <Typography fontWeight={500}>{children}</Typography>
        </Paper>
    );
};
