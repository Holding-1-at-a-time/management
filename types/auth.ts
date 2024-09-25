/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 08:30:11
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
import { Organization, OrganizationMembershipRole } from "@clerk/nextjs/server";

/**
 * UserAuthInfo represents the user authentication information
 */
export interface UserAuthInfo {
    userId: string;
    orgId: Organization["id"];
    orgRole: OrganizationMembershipRole;
    orgPermissions: OrganizationPermissions[];
    tenantId: string;
    userInfo: UserInfo;
    organizationInfo: OrganizationInfo;
    sessionInfo: SessionInfo;
}

/**
 * OrganizationPermission represents the permissions of the user in the organization
 * @enum
 */
export const OrganizationPermission = [
    "org:services:create",
    "org:services:manage",
    "org:services:read",
    "org:sys_domains:manage",
    "org:sys_domains:read",
    "org:sys_memberships:manage",
    "org:sys_memberships:read",
    "org:sys_profile:delete",
    "org:sys_profile:manage",
    "org:appointments:create",
    "org:appointments:manage",
    "org:appointments:read",
    "org:assessments:create",
    "org:assessments:manage",
    "org:assessments:read",
    "org:client:create",
    "org:client:delete",
    "org:client:manage",
    "org:client:read",
    "org:client:update",
    "org:feedback:create",
    "org:feedback:read",
    "org:invoice:create",
    "org:invoice:manage",
    "org:invoices:read",
    "org:payments:read",
    "org:payments:create",
    "org:payments:manage",
    "org:pricing:create",
    "org:pricing:manage",
    "org:pricing:read",
    "org:reports:view",
    "org:schedules:create",
    "org:schedules:manage",
    "org:schedules:read",
    "org:users:manage",
    "org:roles:manage",
    "org:invoices:manage",
    "org:feedback:manage",
    "org:system:manage",
    "org:audit:view",
] as const;

export type OrganizationRole = OrganizationMembershipRole;

