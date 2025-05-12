import { Collections } from "../../../../types/pb_types";
import { StateSetter } from "../../../../types/state/StateSetter";
import { insert } from "./insert";
import { remove } from "./remove";
import { upsert } from "./upsert";

export const createScopedCrudMethods = <S extends { [key: string]: unknown }>(
    set: StateSetter<S>,
    get: () => S,
    key: `${Collections}`,
) => {
    const wrappedInsert = <T extends { id: string }>(record: T) =>
        insert(set, get, key, record);

    const wrappedUpsert = <T extends { id: string }>(record: T) =>
        upsert(set, get, key, record);

    const wrappedUpdate = <T extends { id: string }>(record: T) => {
        throw new Error("Not implemented");
    };

    const wrappedDelete = (id: string) => {
        remove(set, get, key, id);
    };

    return {
        insert: wrappedInsert,
        upsert: wrappedUpsert,
        update: wrappedUpdate,
        remove: wrappedDelete,
    };
};
