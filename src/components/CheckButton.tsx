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
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    selected?: boolean;
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
    sx?: SxProps;
    children?: React.ReactNode;
};

export const CheckButton: React.FC<Props> = ({
    onClick,
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
            onClick={onClick}
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
            <Typography fontWeight={500} my={0.5} textAlign="left">
                {children}
            </Typography>
        </Paper>
    );
};
