import { AnimatePresence, motion } from 'motion/react';
import { cloneElement } from 'react';
import { useLocation, useOutlet } from 'react-router';

export const AnimatedOutlet = () => {
    const location = useLocation();
    const element = useOutlet();

    return (
        <AnimatePresence mode="wait" initial>
            <motion.div key={location.pathname} initial="initial" animate="animate" exit="exit">
                {element && cloneElement(element, { key: location.pathname })}
            </motion.div>
        </AnimatePresence>
    );
};
