import { Role } from "../Role";

export type EnrichedEvent = StoredEvent & {
    requiredRoles: Array<Role>;
};

export type StoredEvent = {
    id: string;
    type: "midweek" | "weekend" | "custom";
    title: string;
    description?: string;
    date: string;
    requiredRoleIds: Array<string>;
};
