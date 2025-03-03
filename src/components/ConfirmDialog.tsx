import {
    Button,
    ButtonProps,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

type ConfirmDialogProps = {
    title: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
    confirmButton?: {
        text?: string;
        color?: ButtonProps["color"];
        variant?: ButtonProps["variant"];
    };
    cancelButton?: {
        text?: string;
        color?: ButtonProps["color"];
        variant?: ButtonProps["variant"];
    };
};

export const ConfirmDialog = ({
    title,
    message,
    onClose,
    onConfirm,
    confirmButton = { text: "Confirm", color: "info", variant: "text" },
    cancelButton = { text: "Cancel", color: "info", variant: "text" },
}: ConfirmDialogProps) => {
    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color={cancelButton.color}
                    variant={cancelButton.variant}
                >
                    {cancelButton.text}
                </Button>
                <Button
                    onClick={onConfirm}
                    color={confirmButton.color}
                    variant={confirmButton.variant}
                >
                    {confirmButton.text}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
