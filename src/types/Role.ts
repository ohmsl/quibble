import { roleIconMap } from "../modules/roles/roleIcons";

export type Role = {
    name: string;
    description?: string;
    icon: keyof typeof roleIconMap;
    minAssignments?: number;
    maxAssignments?: number;
};
