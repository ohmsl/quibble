import { roleIconMap } from "../modules/roles/roleIcons";

export type Role = {
    id: string;
    name: string;
    description?: string;
    icon: keyof typeof roleIconMap;
    minAssignments?: number;
    maxAssignments?: number;
};
