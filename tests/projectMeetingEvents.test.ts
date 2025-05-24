import { projectMeetingEvents } from '../src/modules/state/events/projectMeetingEvents';
import { expect, test } from 'bun:test';

test('throws if end date is before start date', () => {
    const start = new Date('2023-01-10');
    const end = new Date('2023-01-09');
    expect(() => projectMeetingEvents({ midweekMeetingDay: 2, weekendMeetingDay: 5 }, start, end)).toThrow();
});

test('projects events for meeting days within range', () => {
    const start = new Date('2023-01-09'); // Monday
    const end = new Date('2023-01-15'); // Sunday

    const events = projectMeetingEvents(
        { midweekMeetingDay: 2, weekendMeetingDay: 5 },
        start,
        end,
    );

    expect(events).toEqual([
        {
            title: 'Midweek Meeting',
            date: new Date('2023-01-10').toISOString(),
            required_role_ids: [],
            projected: true,
        },
        {
            title: 'Weekend Meeting',
            date: new Date('2023-01-13').toISOString(),
            required_role_ids: [],
            projected: true,
        },
    ]);
});
