import { Badge, IconButton, styled } from '@mui/material';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAppState } from '../modules/state/useAppState';

const StyledBadge = styled(Badge)(({ theme }) => ({
    position: 'fixed',
    top: 8,
    right: 8,
    '@keyframes pulse': {
        '0%': {
            boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)',
        },
        '70%': {
            boxShadow: '0 0 0 10px rgba(76, 175, 80, 0)',
        },
        '100%': {
            boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
        },
    },
    '&.pulsing .MuiBadge-dot': {
        animation: 'pulse 2s infinite',
    },
    zIndex: theme.zIndex.modal + 1,
}));

export const StatusIndicator = () => {
    const status = useAppState.use.connectionStatus();
    const loading = useAppState.use.loading();

    useEffect(() => {
        toast.dismiss();

        switch (status) {
            case 'unavailable':
                toast.warning('Server Unavailable', {
                    description: "You're online, but our servers aren't responding.",
                    duration: Infinity,
                    action: (
                        <IconButton onClick={() => toast.dismiss()} color="inherit" size="small">
                            <XIcon />
                        </IconButton>
                    ),
                });
                break;
            case 'offline':
                toast.error('Connection Lost', { description: "You're offline. Some features may not work.", duration: Infinity });
                break;
            case 'online':
                toast.success('Back Online', { description: "Connection restored. You're good to go!" });
                break;
        }
    }, [status]);

    const getColor = () => {
        switch (status) {
            case 'online':
                return 'success';
            case 'offline':
                return 'error';
            case 'unavailable':
                return 'warning';
            default:
                return 'default';
        }
    };

    return <StyledBadge variant="dot" color={getColor()} className={loading ? 'pulsing' : ''} />;
};
