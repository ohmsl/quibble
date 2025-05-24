import { areEventsOnDay } from '../src/modules/scheduler/utils/areEventsOnDay';
import { expect, test } from 'bun:test';

type Event = { date: string };

test('returns true when an event occurs on the given day', () => {
    const events: Event[] = [
        { date: new Date('2023-01-01T12:00:00Z').toISOString() },
    ];
    expect(areEventsOnDay(events as any, new Date('2023-01-01'))).toBe(true);
});

test('returns false when no event occurs on the given day', () => {
    const events: Event[] = [
        { date: new Date('2023-01-02T12:00:00Z').toISOString() },
    ];
    expect(areEventsOnDay(events as any, new Date('2023-01-01'))).toBe(false);
});
