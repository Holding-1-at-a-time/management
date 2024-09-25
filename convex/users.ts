/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 12:04:58
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
// convex/users.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { JWTPayload } from "../types/jwt";
import { logAction } from "./auditLogs";

export const createOrUpdateUser = mutation({
    args: {
        jwt: v.object({
            aud: v.string(),
            name: v.string(),
            email: v.string(),
            org_name: v.optional(v.string()),
            org_role: v.optional(v.string()),
            org_slug: v.optional(v.string()),
            org_image: v.optional(v.string()),
            tenant_id: v.optional(v.string()),
            first_name: v.string(),
            session_id: v.string(),
            updated_at: v.string(),
            external_id: v.string(),
            phone_number: v.optional(v.string()),
            clerk_user_id: v.string(),
            org_has_image: v.optional(v.string()),
            session_actor: v.optional(v.string()),
            email_verified: v.boolean(),
            org_permissions: v.optional(v.array(v.string())),
            phone_verified: v.optional(v.boolean()),
            two_factor_enabled: v.boolean(),
        })
    },
    handler: async (ctx, args) => {
        const jwt = args.jwt;
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", jwt.clerk_user_id))
            .unique();

        const userData = {
            clerkId: jwt.clerk_user_id,
            email: jwt.email,
            firstName: jwt.first_name,
            lastName: jwt.name.split(" ").slice(1).join(" "),
            phoneNumber: jwt.phone_number,
            emailVerified: jwt.email_verified,
            phoneVerified: jwt.phone_verified ?? false,
            twoFactorEnabled: jwt.two_factor_enabled,
            updatedAt: jwt.updated_at,
        };

        let userId: string;
        if (existingUser) {
            await ctx.db.patch(existingUser._id, userData);
            userId = existingUser._id;
            await logAction(ctx, userId, "USER_UPDATED", `User ${jwt.email} updated`);
        } else {
            userId = await ctx.db.insert("users", userData);
            await logAction(ctx, userId, "USER_CREATED", `User ${jwt.email} created`);
        }

        return userId;
    },
});

export const getUser = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        if (!user) {
            throw new ConvexError("User not found");
        }

        return user;
    },
});

export const getUserByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();

        if (!user) {
            throw new ConvexError("User not found");
        }

        return user;
    },
});