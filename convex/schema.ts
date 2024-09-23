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
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    messages: defineTable({
        _id: v.id('message'),
        role: v.string(),
        content: v.string(),
        userId: v.id('users'),
        createdAt: v.number(),
    }).index("by_user", ["userId"])
        .index("by_createdAt", ["createdAt"])
        .index("by_user_createdAt", ["userId", "createdAt"])
        .index("by_user_createdAt_role", ["userId", "createdAt", "role"]),

    potentialClients: defineTable({
        _id: v.id('potentialClient'),
        name: v.string(),
        email: v.string(),
        companyName: v.string(),
        companySize: v.string(),
        interestLevel: v.string(),
        createdAt: v.number(),
    }).index("by_createdAt", ["createdAt"])
        .index("by_name", ["name"])
        .index("by_email", ["email"])
        .index("by_companyName", ["companyName"])
        .index("by_companySize", ["companySize"])
        .index("by_interestLevel", ["interestLevel"])
        .index("by_name_email", ["name", "email"]),

    appointments: defineTable({
        _id: v.id('appointment'),
        time: v.string(),
        service: v.string(),
        status: v.string(),
        duration: v.number(),
        price: v.number(),
        userId: v.string(),
        createdAt: v.number(),
    })
        .index("by_user", ["userId"])
        .index("by_createdAt", ["createdAt"])
        .index("by_user_createdAt", ["userId", "createdAt"])
        .index("by_user_createdAt_service", ["userId", "createdAt", "service"])
        .index("by_user_createdAt_time", ["userId", "createdAt", "time"])
        .index("by_user_createdAt_duration", ["userId", "createdAt", "duration"])
        .index("by_user_createdAt_status", ["userId", "createdAt", "status"]),


    users: defineTable({
        _id: v.id('user'),
        userId: v.id('users'),
        name: v.string(),
        email: v.string(),
        createdAt: v.number(),
    }).index("by_email", ["email"])
        .index("by_name", ["name"])
        .index("by_userId", ["userId"])
        .index("by_createdAt", ["createdAt"])
        .index("by_name_email", ["name", "email"])
        .index("by_name_email_createdAt", ["name", "email", "createdAt"])
        .index("by_name_email_createdAt_name", ["name", "email", "createdAt", "name"]),

    predictions: defineTable({
        _id: v.id('prediction'),
        content: v.string(),
        userId: v.id('users'),
        createdAt: v.number(),
    }).index("by_user", ["userId"])
        .index("by_createdAt", ["createdAt"])
        .index("by_user_createdAt", ["userId", "createdAt"])
        .index("by_user_createdAt_content", ["userId", "createdAt", "content"]),

    waitlists: defineTable({
        _id: v.id('waitlist'),
        userId: v.id('users'),
        email: v.string(),
        name: v.string(),
        companySize: v.string(),
        companyName: v.string(),
        createdAt: v.number(),
    }).index("by_user", ["userId"])
        .index("by_createdAt", ["createdAt"])
        .index("by_user_createdAt", ["userId", "createdAt"])
        .index("by_user_createdAt_userId", ["userId", "createdAt", "userId"]),


    MessagesEmbeddings: defineTable({
        _id: v.id('message'),
        content: v.string(),
        role: v.string(),
        userId: v.string(),
        createdAt: v.number(),
        embedding: v.array(v.float64()),
    }).vectorIndex("by_embedding", {
        vectorField: "embedding",
        dimensions: 1536,
        filterFields: ["userId", "role"],
    }),

    appointmentsEmbeddings: defineTable({
        _id: v.id('appointment'),
        time: v.string(),
        service: v.string(),
        status: v.string(),
        userId: v.string(),
        createdAt: v.number(),
        embedding: v.array(v.float64()),
    }).vectorIndex("by_embedding", {
        vectorField: "embedding",
        dimensions: 1536,
        filterFields: ["userId", "status"],
    }),

    predictionsEmbeddings: defineTable({
        _id: v.id('prediction'),
        content: v.string(),
        userId: v.string(),
        createdAt: v.number(),
        embedding: v.array(v.float64()),
    }).vectorIndex("by_embedding", {
        vectorField: "embedding",
        dimensions: 1536,
        filterFields: ["_id", "content"],
    }),

    waitlistsEmbeddings: defineTable({
        _id: v.id('waitlist'),
        email: v.string(),
        name: v.string(),
        companySize: v.string(),
        createdAt: v.number(),
        embedding: v.array(v.float64()),
    })
        .vectorIndex("by_embedding", {
            vectorField: "embedding",
            dimensions: 1536,
            filterFields: ["companySize"],
        }),

    potentialClientsEmbeddings: defineTable({
        _id: v.id('potentialClient'),
        name: v.string(),
        email: v.string(),
        companyName: v.string(),
        companySize: v.string(),
        interestLevel: v.string(),
        createdAt: v.number(),
        embedding: v.array(v.float64()),
    }).vectorIndex("by_embedding", {
        vectorField: "embedding",
        dimensions: 1536,
        filterFields: ["name", "companySize", "interestLevel"]
    })
        .index("by_companySize", ["companySize"])
        .index("by_name", ["name"])
        .index("by_email", ["email"])
        .index("by_companyName", ["companyName"]),
});