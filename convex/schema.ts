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