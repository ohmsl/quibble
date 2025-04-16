import { RecordSubscription } from 'pocketbase';
import { StateSetter } from '../../../types/state/StateSetter';
import { createScopedLogger } from '../../../utils/logger';

/**
 * Generates CRUD (Create, Read, Update, Delete) event handlers for a specified state key.
 * Used to automatically handle collection events like creating, updating and deleting records.
 *
 * @typeParam T - Type of the record object, must contain an 'id' field
 * @typeParam S - Type of the state object, must be indexable by string keys
 * @param set - The state setter function from a state management system (e.g. Zustand).
 * @param key - The state key to update when handling collection events.
 * @returns A collection event handler function that processes create/update/delete operations.
 *
 * @example
 * const handleEvents = handleCollectionEvent(setState, 'todos');
 * pb.collection('todos').subscribe('*', handleEvents);
 */
export const handleCollectionEvent = <T extends { id: string }, S extends { [key: string]: unknown }>(
    set: StateSetter<S>,
    key: keyof S & string,
) => {
    const logger = createScopedLogger(`${key} sub`);

    const handleCreate = (record: T) => {
        set(
            (state: S) =>
                ({
                    [key]: [...(state[key] as T[]), record],
                }) as Partial<S>,
        );
    };

    const handleUpdate = (record: T) => {
        set(
            (state: S) =>
                ({
                    [key]: (state[key] as T[]).map(item => (item.id === record.id ? record : item)),
                }) as Partial<S>,
        );
    };

    const handleDelete = (id: string) => {
        set(
            (state: S) =>
                ({
                    [key]: (state[key] as T[]).filter(item => item.id !== id),
                }) as Partial<S>,
        );
    };

    return (event: RecordSubscription<T>) => {
        logger.info(`Incoming ${event.action} event received`, event.record);
        switch (event.action) {
            case 'create':
                handleCreate(event.record);
                break;
            case 'update':
                handleUpdate(event.record);
                break;
            case 'delete':
                handleDelete(event.record.id);
                break;
        }
    };
};
