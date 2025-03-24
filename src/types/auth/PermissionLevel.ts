export enum PermissionLevel {
    /** Can view schedules and members in their organisation, but cannot make any changes. */
    ReadOnly = 0,

    /** Can edit only their own member record and preferences. No access to others. */
    MemberEditor = 1,

    /** Can manage assignments, create/edit events, and modify any member's preferences in their organisation. */
    Scheduler = 2,

    /** Can manage members, assign roles, configure roles in their organisation, and override schedules. */
    Admin = 3,

    /** Full control over the organisation's data. Can add/remove users from org.*/
    Owner = 4,
}
