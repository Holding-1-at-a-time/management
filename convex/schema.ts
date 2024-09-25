/**
    * @description      : Convex schema
    * @author           : rrome
    * @group            : 
    * @created          : 23/09/2024 - 10:08:19
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 23/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(),
        name: v.string(),
        email: v.string(),
        org_name: v.string(),
        org_role: v.string(),
        org_slug: v.string(),
        org_image: v.string(),
        tenant_id: v.id('tenants'),     // This links to a tenant table
        first_name: v.string(),
        session_id: v.string(),
        updated_at: v.string(),
        external_id: v.string(),
        phone_number: v.string(),
        clerk_user_id: v.string(),
        org_has_image: v.boolean(),      // Added as it is in the initial request
        session_actor: v.string(),
        email_verified: v.boolean(),
        org_permissions: v.array(v.string()), // Fixed typo from 'org_permisions'
        phone_verified: v.boolean(),
        two_factor_enabled: v.boolean(),
    })
        .index("by_clerk_user_id", ["clerk_user_id"])
        .index("by_email", ["email"]),

    tenants: defineTable({
        created_at: v.string(),
        org_name: v.string(),
        org_id: v.string(),
        org_image: v.string(),
        org_slug: v.string(),
        owner_id: v.string(),
        updated_at: v.string(),
    })
        .index("by_org_id", ["org_id"]),

    services: defineTable({
        service_name: v.string(),
        service_description: v.string(),
        service_duration: v.number(),
        service_image: v.string(),
        service_price: v.number(),
        tenant_id: v.id('tenants'),
        created_at: v.string(),
        updated_at: v.string(),
    })
        .index("by_tenant", ["tenant_id"])
        .index("by_name_price_tenant", ["service_name", "service_price", "tenant_id"]),

    organizations: defineTable({
        org_name: v.string(),
        tenant_id: v.id('tenants'),
        created_at: v.string(),
        updated_at: v.string(),
        org_image: v.string(),
        org_slug: v.string(),
        owner_id: v.id('users'),
        org_role: v.string(),
        org_permissions: v.array(v.string()),
        org_description: v.string(),
        org_address: v.string(),
        org_phone: v.string(),
        org_email: v.string(),
        org_website: v.optional(v.string()),

    })
        .index("by_slug", ["org_slug"])
        .index("by_name", ["org_name"])
        .index("by_owner_id", ["owner_id"])
        .index("by_org_role", ["org_role"])
        .index("by_org_permissions", ["org_permissions"])
        .index("by_org_description", ["org_description"])
        .index("by_org_address", ["org_address"])
        .index("by_org_phone", ["org_phone"])
        .index("by_org_email", ["org_email"]),

});