import { usePbStore } from "../state/pocketbase/usePbStore";

export const getUser = () => {
    return usePbStore.getState().user;
};
