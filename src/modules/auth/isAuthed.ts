import { usePbStore } from '../state/pocketbase/usePbStore';

export const isAuthed = () => {
    const user = usePbStore.getState().user;
    return !!user;
};
