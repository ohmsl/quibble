import { ButtonBase, Checkbox, Paper, SxProps, touchRippleClasses, Typography, useTheme } from '@mui/material';

type Props = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    selected?: boolean;
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    sx?: SxProps;
    children?: React.ReactNode;
};

export const CheckButton: React.FC<Props> = ({ onClick, selected = false, color = 'primary', sx, children }) => {
    const theme = useTheme();

    return (
        <Paper
            onClick={onClick}
            component={ButtonBase}
            variant="outlined"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                border: 1,
                borderColor: selected
                    ? `color-mix(in srgb, ${theme.vars.palette[color].light}, transparent 50%)`
                    : theme.vars.palette.divider,
                backgroundColor: selected
                    ? `color-mix(in srgb, ${theme.vars.palette[color].light}, transparent 85%)`
                    : `color-mix(in srgb, ${theme.vars.palette.background.paper}, white 5%)`,
                color: selected ? theme.palette[color].dark : theme.palette.grey[700],
                pr: '10px',
                ...theme.applyStyles('dark', {
                    color: theme.palette[color].contrastText,
                }),
                [`& .${touchRippleClasses.child}`]: {
                    bgcolor: selected ? theme.palette[color].light : theme.palette.neutral.dark,
                    color: selected ? theme.palette[color].dark : theme.palette.grey[50],
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
