import { Role } from "../Role";

export type MeetingEvent = {
    id: string;
    title: string;
    description?: string;
    date: string;
    requiredRoles: Array<Role>;
};
