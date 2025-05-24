import { insert } from '../src/modules/state/utils/crud/insert';
import { upsert } from '../src/modules/state/utils/crud/upsert';
import { remove } from '../src/modules/state/utils/crud/remove';
import { expect, test } from 'bun:test';

type Item = { id: string };

function createState(initial: Item[] = []) {
    let state = { events: initial };
    const set = (partial: any) => {
        const next = typeof partial === 'function' ? partial(state) : partial;
        state = { ...state, ...next };
    };
    const get = () => state;
    return { set, get };
}

test('insert adds a new record and throws on duplicates', () => {
    const { set, get } = createState();
    insert<Item, { events: Item[] }>(set, get, 'events' as any, { id: '1' });
    expect(get().events.length).toBe(1);
    expect(() => insert<Item, { events: Item[] }>(set, get, 'events' as any, { id: '1' })).toThrow();
});

test('upsert adds or replaces records', () => {
    const { set, get } = createState([{ id: '1' }]);
    upsert<Item, { events: Item[] }>(set, get, 'events' as any, { id: '2' });
    expect(get().events.some(e => e.id === '2')).toBe(true);
    upsert<Item, { events: Item[] }>(set, get, 'events' as any, { id: '1' });
    expect(get().events.filter(e => e.id === '1').length).toBe(1);
});

test('remove deletes a record by id', () => {
    const { set, get } = createState([{ id: '1' }, { id: '2' }]);
    remove<Item, { events: Item[] }>(set, get, 'events' as any, '1');
    expect(get().events).toEqual([{ id: '2' }]);
});
