import { RecordSubscription } from "pocketbase";
import { Collections } from "../../../types/pb_types";
import { StateSetter } from "../../../types/state/StateSetter";
import { createScopedLogger } from "../../../utils/logger";
import { createScopedCrudMethods } from "./crud/createScopedCrudMethods";

/**
 * Generates CRUD (Create, Read, Update, Delete) event handlers for a specified state key.
 * Used to automatically handle collection events like creating, updating and deleting records.
 *
 * @typeParam T - Type of the record object, must contain an 'id' field
 * @typeParam S - Type of the state object, must be indexable by string keys
 * @param set - The state setter function from a state management system (e.g. Zustand).
 * @param collection - The state key to update when handling collection events.
 * @returns A collection event handler function that processes create/update/delete operations.
 *
 * @example
 * const handleEvents = handleCollectionEvent(setState, 'todos');
 * pb.collection('todos').subscribe('*', handleEvents);
 */
export const handleCollectionEvent = <
    S extends { [key: string]: unknown },
    T extends { id: string },
>(
    set: StateSetter<S>,
    get: () => S,
    collection: `${Collections}`,
) => {
    const logger = createScopedLogger(`${collection} sub`);
    const { upsert, remove } = createScopedCrudMethods(set, get, collection);

    const handleCreate = (record: T) => {
        // we upsert so that if it does exist, we overwrite it
        upsert(record);
    };

    const handleUpdate = (record: T) => {
        upsert(record);
    };

    const handleDelete = (id: string) => {
        remove(id);
    };

    return (event: RecordSubscription<T>) => {
        logger.info(`Incoming ${event.action} event received`, event.record);
        switch (event.action) {
            case "create":
                handleCreate(event.record);
                break;
            case "update":
                handleUpdate(event.record);
                break;
            case "delete":
                handleDelete(event.record.id);
                break;
        }
    };
};
