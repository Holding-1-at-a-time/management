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