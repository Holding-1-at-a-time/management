/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 07:00:56
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
/**
 * Defines the types for OrganizationRole and OrganizationPermission, which are string literal types
 * representing different roles and permissions within an organization.
 */
/**
 * Defines the type for organization permissions, which can be one of the following:
 * - org:users:manage
 * - org:roles:manage
 * - org:services:manage
 * - org:client:manage
 * - org:schedules:manage
 * - org:assessments:manage
 * - org:appointments:manage
 * - org:invoices:manage
 * - org:payments:manage
 * - org:pricing:manage
 * - org:reports:view
 * - org:feedback:manage
 * - org:system:manage
 * - org:audit:view
 */
import { Organization } from "@clerk/nextjs/server";

export type OrganizationRole = 'org:admin' | 'org:manager_organization' | 'org:member' | 'org:client' | 'org:contractor';

export type OrganizationPermission =
    | 'org:services:create'
    | 'org:services:manage'
    | 'org:services:read'
    | 'org:sys_domains:manage'
    | 'org:sys_domains:read'
    | 'org:sys_memberships:manage'
    | 'org:sys_memberships:read'
    | 'org:sys_profile:delete'
    | 'org:sys_profile:manage'
    | 'org:appointments:create'
    | 'org:appointments:manage'
    | 'org:appointments:read'
    | 'org:assessments:create'
    | 'org:assessments:manage'
    | 'org:assessments:read'
    | 'org:client:create'
    | 'org:client:delete'
    | 'org:client:manage'
    | 'org:client:read'
    | 'org:client:update'
    | 'org:feedback:create'
    | 'org:feedback:read'
    | 'org:invoice:create'
    | 'org:invoice:manage'
    | 'org:invoices:read'
    | 'org:payments:read'
    | 'org:payments:create'
    | 'org:payments:manage'
    | 'org:pricing:create'
    | 'org:pricing:manage'
    | 'org:pricing:read'
    | 'org:reports:view'
    | 'org:schedules:create'
    | 'org:schedules:manage'
    | 'org:schedules:read'
    | 'org:users:manage'
    | 'org:roles:manage'
    | 'org:invoices:manage'
    | 'org:feedback:manage'
    | 'org:system:manage'
    | 'org:audit:view';

export interface UserAuthInfo {
    userId: string;
    orgId: OrganizationInfo;
    orgRole: OrganizationRole;
    orgPermissions: OrganizationPermission[];
    tenant_Id: Organization["id"];
    userInfo: UserInfo;
    organizationInfo: OrganizationInfo;
    sessionInfo: SessionInfo;
}
