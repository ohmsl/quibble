import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import { Loader } from '../../components/Loader';
import { useAppState } from '../state/useAppState';
import { Initialiser } from './Initialiser';

export const LoaderGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialised = useAppState().initialised;

    return (
        <>
            <Initialiser />
            <AnimatePresence mode="wait">
                {!initialised && (
                    <Box
                        sx={{
                            position: 'fixed',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'background.default',
                        }}
                        component={motion.div}
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        <Loader />
                    </Box>
                )}
            </AnimatePresence>
            {initialised && children}
        </>
    );
};
