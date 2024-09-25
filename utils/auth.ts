/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 12:07:54
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
// utils/auth.ts
export const ROLES = {
    ADMIN_CREATOR: "AdminCreator",
    CLIENT: "Client",
    MANAGEMENT: "Management",
    MEMBER: "Member",
    NON_MEMBER: "Non-Member",
} as const;

export type Role = keyof typeof ROLES;

export const PERMISSIONS = {
    CREATE_SERVICE: "org:services:create",
    READ_CLIENT: "org:client:read",
    UPDATE_CLIENT: "org:client:update",
    DELETE_CLIENT: "org:client:delete",
    CREATE_SCHEDULE: "org:schedules:create",
    READ_FEEDBACK: "org:feedback:read",
} as const;

export type Permission = keyof typeof PERMISSIONS;

export function hasPermission(userPermissions: Permission[], permission: Permission): boolean {
    return userPermissions.includes(permission);
}

export function hasRole(userRole: Role, requiredRole: Role): boolean {
    const roleHierarchy: Role[] = [
        ROLES.ADMIN,
        ROLES.MANAGEMENT,
        ROLES.MEMBER,
        ROLES.CLIENT,
        ROLES.NON_MEMBER,
    ];
    return roleHierarchy.indexOf(userRole) <= roleHierarchy.indexOf(requiredRole);
}