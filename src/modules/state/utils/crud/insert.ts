import { Collections } from "../../../../types/pb_types";
import { StateSetter } from "../../../../types/state/StateSetter";
import { createScopedLogger } from "../../../../utils/logger";

export const insert = <
    T extends { id: string },
    S extends { [key: string]: unknown },
>(
    set: StateSetter<S>,
    get: () => S,
    key: `${Collections}`,
    record: T,
) => {
    const logger = createScopedLogger("insert");

    const records = get()[key] as Array<T>;
    if (records.find((r) => r.id === record.id)) {
        logger.error(`Record with id ${record.id} already exists`);
        throw new Error(
            `Error inserting record: Record with id ${record.id} already exists`,
        );
    }

    set((state: S) => ({
        ...state,
        [key]: [...records, record],
    }));
};
