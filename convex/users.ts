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
        console.log("storeUser called");
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }
        console.log(`storeUser: ${identity.name} ${identity.tokenIdentifier}`);

        // Check if we've already stored this identity before.
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier),
            )
            .unique();
        if (user !== null) {
            console.log(`storeUser: found existing user ${user._id}`);
            // If we've seen this identity before but the name has changed, patch the value.
            if (user.name !== identity.name) {
                console.log(`storeUser: updating user ${user._id} name to ${identity.name}`);
                await ctx.db.patch(user._id, { name: identity.name });
            }
            return user._id;
        }
        // If it's a new identity, create a new `User`.
        const userData = {
            name: identity.name ?? '',
            tokenIdentifier: identity.tokenIdentifier ?? '',
            email: identity.tokenIdentifier ?? '',
            firstName: identity.givenName  ?? '',
            lastName: identity.familyName ?? '',
            clerkId: identity.clerkId?.toString() ?? '',
        };        
        console.log(`storeUser: creating new user ${userData.name} ${userData.tokenIdentifier}`);
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
        console.log(`createUser called with ${args.email} ${args.firstName} ${args.lastName} ${args.clerkId} ${args.tokenIdentifier}`);
        return await ctx.db.insert("users", {
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            clerkId: args.tokenIdentifier,
            tokenIdentifier: args.tokenIdentifier,
            name: args.tokenIdentifier,
        }
        );
    },
});

export const getUser = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        console.log(`getUser called with ${args.clerkId}`);
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();
        if (!user) {
            console.log(`getUser: user not found for clerkId ${args.clerkId}`);
            throw new Error("User not found");
        }
        console.log(`getUser: found user ${user._id}`);
        return user;
    },
});
