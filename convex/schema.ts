/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 12:03:54
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Defines the schema for the management application.
 * 
 * This schema includes the following tables:
 * 
 * - `users`: Stores user information including clerk ID, email, first name, last name, phone number, email verification status, phone verification status, two-factor authentication status, and the last updated timestamp. Indexed by `clerkId` and `email`.
 * 
 * - `organizations`: Stores organization information including name, slug, image, and owner ID. Indexed by `slug`.
 * 
 * - `memberships`: Stores membership information linking users to organizations, including user ID, organization ID, role, and permissions. Indexed by `userId` and `organizationId`.
 * 
 * - `auditLogs`: Stores audit logs including user ID, action performed, details of the action, and timestamp. Indexed by `userId`.
 */
export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        email: v.string(),
        firstName: v.string(),
        lastName: v.string(),
        phoneNumber: v.optional(v.string()),
        emailVerified: v.boolean(),
        phoneVerified: v.optional(v.boolean()),
        twoFactorEnabled: v.boolean(),
        updatedAt: v.string(),
    }).index("by_clerk_id", ["clerkId"]).index("by_email", ["email"]),

    organizations: defineTable({
        name: v.string(),
        slug: v.string(),
        image: v.optional(v.string()),
        ownerId: v.string(),
    }).index("by_slug", ["slug"]),

    memberships: defineTable({
        userId: v.string(),
        organizationId: v.string(),
        role: v.string(),
        permissions: v.array(v.string()),
    }).index("by_user_and_org", ["userId", "organizationId"]),

    auditLogs: defineTable({
        userId: v.string(),
        action: v.string(),
        details: v.string(),
        timestamp: v.string(),
    }).index("by_user", ["userId"]),
});