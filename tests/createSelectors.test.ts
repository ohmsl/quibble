import { expect, test } from 'bun:test';
import { create } from 'zustand';
import { createSelectors } from '../src/modules/state/utils/createSelectors';

test('createSelectors adds a use property for each key', () => {
    const useStore = createSelectors(create(() => ({ a: 1, b: 2 })));
    expect(typeof useStore.use.a).toBe('function');
    expect(useStore.use.a()).toBe(1);
    expect(useStore.use.b()).toBe(2);
});
