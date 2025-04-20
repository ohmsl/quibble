import { createContext, ReactNode, useContext, useState } from 'react';

interface DrawerContextType {
    open: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawer must be used within a DrawerProvider');
    }
    return context;
};

interface DrawerProviderProps {
    children: ReactNode;
}

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
    const [open, setOpen] = useState(false);

    const openDrawer = () => {
        setOpen(true);
    };

    const closeDrawer = () => {
        setOpen(false);
    };

    const toggleDrawer = () => {
        setOpen(prev => !prev);
    };

    return <DrawerContext.Provider value={{ open, openDrawer, closeDrawer, toggleDrawer }}>{children}</DrawerContext.Provider>;
};
