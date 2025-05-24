import { generateId } from '../src/utils/generateId';
import { expect, test } from 'bun:test';

test('generateId produces a 15 character alphanumeric id', () => {
    const id = generateId();
    expect(id).toMatch(/^[a-z0-9]{15}$/);
});

test('generateId produces unique ids', () => {
    const ids = new Set(Array.from({ length: 20 }, () => generateId()));
    expect(ids.size).toBe(20);
});
