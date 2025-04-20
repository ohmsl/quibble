import { Dialog, DialogProps } from '@mui/material';
import { createContext, useContext, useState } from 'react';

type DialogContextType = {
    /**
     * Renders a dialog with the given content.
     * @param content - The react content of the dialog.
     */
    showDialog: (content: React.ReactNode, props?: Omit<DialogProps, 'open'>) => void;
    /**
     * Closes the currently open dialog.
     */
    closeDialog: () => void;
};

export const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [dialogProps, setDialogProps] = useState<Omit<DialogProps, 'open'> | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(null);

    const showDialog = (content: React.ReactNode, props?: Omit<DialogProps, 'open'>) => {
        setDialogProps(props || null);
        setDialogContent(content);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    return (
        <DialogContext.Provider value={{ showDialog, closeDialog }}>
            {children}
            <Dialog open={dialogOpen} onClose={closeDialog} {...dialogProps}>
                {dialogContent}
            </Dialog>
        </DialogContext.Provider>
    );
};

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialogs must be used within a DialogProvider');
    }
    return context;
};
