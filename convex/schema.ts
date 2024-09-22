import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(),
        name: v.string(),
        email: v.string(),
        firstName: v.string(),
        lastName: v.string(),
        clerkId: v.string(),
    })
        .index("by_email", ["email"])
        .index("by_token", ["tokenIdentifier"])
        .index("by_clerk_id", ["clerkId"]),

    organizations: defineTable({
        name: v.string(),
        ownerId: v.string(),
    })

        .index("by_owner", ["ownerId"]),

    organizationMembers: defineTable({
        userId: v.string(),
        organizationId: v.id("organizations"),
        role: v.union(v.literal("owner"), v.literal("admin"), v.literal("member")),
    }).index("by_user", ["userId"]).index("by_organization", ["organizationId"]),
});