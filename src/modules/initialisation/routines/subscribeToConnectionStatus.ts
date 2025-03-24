import pb from '../../pocketbase/pb';
import { useAppState } from '../../state/useAppState';

export const subscribeToConnectionStatus = () => {
    const get = useAppState.getState;
    const set = useAppState.setState;

    // Handler to update connection status based on browser online/offline events.
    const handleNetworkChange = (): void => {
        const online = navigator.onLine;

        set({ connectionStatus: online ? 'online' : 'offline' });
    };

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    const interval = setInterval(async () => {
        try {
            if (get().connectionStatus === 'offline') return;

            const response = await pb.health.check();

            if (response.code === 200) {
                set({ connectionStatus: 'online' });
            } else {
                set({ connectionStatus: 'unavailable' });
            }
        } catch {
            set({ connectionStatus: 'unavailable' });
        }
    }, 10000);

    set({ connectionStatus: navigator.onLine ? 'online' : 'offline' });

    // Return unsubscribe function to remove event listeners.
    return (): void => {
        window.removeEventListener('online', handleNetworkChange);
        window.removeEventListener('offline', handleNetworkChange);
        clearInterval(interval);
    };
};
