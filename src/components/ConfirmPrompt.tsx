import { Button, ButtonProps, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type ConfirmPromptProps = {
    title: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
    confirmButton?: {
        text?: string;
        color?: ButtonProps['color'];
        variant?: ButtonProps['variant'];
    };
    cancelButton?: {
        text?: string;
        color?: ButtonProps['color'];
        variant?: ButtonProps['variant'];
    };
};

export const ConfirmPrompt = ({
    title,
    message,
    onClose,
    onConfirm,
    confirmButton = { text: 'Confirm', color: 'secondary', variant: 'text' },
    cancelButton = { text: 'Cancel', color: 'secondary', variant: 'text' },
}: ConfirmPromptProps) => {
    return (
        <>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color={cancelButton.color} variant={cancelButton.variant}>
                    {cancelButton.text}
                </Button>
                <Button onClick={onConfirm} color={confirmButton.color} variant={confirmButton.variant}>
                    {confirmButton.text}
                </Button>
            </DialogActions>
        </>
    );
};
