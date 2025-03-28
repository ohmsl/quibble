import { usePbStore } from "../state/pocketbase/usePbStore";

export const getUser = () => {
    const user = usePbStore.getState().user;
    return user;
};
