/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 12:10:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
// types/jwt.ts
/**
 * Interface representing the payload of a JWT (JSON Web Token).
 * 
 * @property {string} aud - The audience for which the token is intended.
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} [org_name] - The name of the organization, if applicable.
 * @property {string} [org_role] - The role of the user within the organization, if applicable.
 * @property {string} [org_slug] - The slug identifier for the organization, if applicable.
 * @property {string} [org_image] - The image URL for the organization, if applicable.
 * @property {string} [tenant_id] - The tenant identifier, if applicable.
 * @property {string} first_name - The first name of the user.
 * @property {string} session_id - The session identifier.
 * @property {string} updated_at - The timestamp when the token was last updated.
 * @property {string} external_id - An external identifier for the user.
 * @property {string} [phone_number] - The phone number of the user, if applicable.
 * @property {string} clerk_user_id - The identifier for the user in the Clerk system.
 * @property {string} [org_has_image] - Indicates if the organization has an image, if applicable.
 * @property {string} [session_actor] - The actor of the session, if applicable.
 * @property {boolean} email_verified - Indicates if the user's email is verified.
 * @property {string[]} [org_permissions] - A list of permissions for the user within the organization, if applicable.
 * @property {boolean} [phone_verified] - Indicates if the user's phone number is verified, if applicable.
 * @property {boolean} two_factor_enabled - Indicates if two-factor authentication is enabled for the user.
 */
export interface JWTPayload {
    aud: string;
    name: string;
    email: string;
    org_name?: string;
    org_role?: string;
    org_slug?: string;
    org_image?: string;
    tenant_id?: string;
    first_name: string;
    session_id: string;
    updated_at: string;
    external_id: string;
    phone_number?: string;
    clerk_user_id: string;
    org_has_image?: string;
    session_actor?: string;
    email_verified: boolean;
    org_permissions?: string[];
    phone_verified?: boolean;
    two_factor_enabled: boolean;
}