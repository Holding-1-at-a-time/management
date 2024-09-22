import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const store = mutation({
    args: {
        tokenIdentifier: v.string(),
        name: v.string(),
        email: v.string(),
        firstName: v.string(),
        lastName: v.string(),
        clerkId: v.string(),
        token: v.string(),
        userId: v.id("users"),
    },
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this identity before.
        // Note: If you don't want to define an index right away, you can use
        // ctx.db.query("users")
        //  .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
        //  .unique();
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier),
            )
            .unique();
        if (user !== null) {
            // If we've seen this identity before but the name has changed, patch the value.
            if (user.name !== identity.name) {
                await ctx.db.patch(user._id, { name: identity.name });
            }
            return user._id;
        }
        // If it's a new identity, create a new `User`.
        const userData = {
            name: identity.name ?? "Anonymous",
            tokenIdentifier: identity.tokenIdentifier,
            email: "",
            firstName: "",
            lastName: "",
            clerkId: ""
        };
        return await ctx.db.insert("users", userData);
    },
});

export const createUser = mutation({
    args: {
        email: v.string(),
        firstName: v.string(),
        lastName: v.string(),
        clerkId: v.string(),
        tokenIdentifier: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.db.insert("users", {
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            clerkId: args.clerkId,
            tokenIdentifier: "",
            name: ""
        });
        return userId;
    },
});

export const getUser = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();
        return user;
    },
});