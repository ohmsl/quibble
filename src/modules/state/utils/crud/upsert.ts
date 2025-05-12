import { Collections } from "../../../../types/pb_types";
import { StateSetter } from "../../../../types/state/StateSetter";

export const upsert = <
    T extends { id: string },
    S extends { [key: string]: unknown },
>(
    set: StateSetter<S>,
    get: () => S,
    key: `${Collections}`,
    record: T,
) => {
    const records = get()[key] as Array<T>;
    const existingRecord = records.find((r) => r.id === record.id);

    // if we already have a record with the same id, we need to remove it from the array
    const updatedRecords = existingRecord
        ? records.filter((r) => r.id !== record.id)
        : records;

    set((state) => ({
        ...state,
        [key]: [...updatedRecords, record],
    }));
};
