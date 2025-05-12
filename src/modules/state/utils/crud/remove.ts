import { Collections } from "../../../../types/pb_types";
import { StateSetter } from "../../../../types/state/StateSetter";

export const remove = <
    T extends { id: string },
    S extends { [key: string]: unknown },
>(
    set: StateSetter<S>,
    get: () => S,
    key: `${Collections}`,
    id: string,
) => {
    const records = get()[key] as Array<T>;

    set((state) => ({
        ...state,
        [key]: records.filter((item) => item.id !== id),
    }));
};
