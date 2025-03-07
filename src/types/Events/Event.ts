import { Role } from "../Role";

export type UIEvent = {
    id: string;
    type: "midweek" | "weekend" | "custom";
    title: string;
    description?: string;
    date: string;
    requiredRoles: Array<Role>;
};

export type Event = {
    id: string;
    type: "midweek" | "weekend" | "custom";
    title: string;
    description?: string;
    date: string;
    requiredRoleIds: Array<string>;
};
