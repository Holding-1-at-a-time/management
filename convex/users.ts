/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 13:32:37
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
import { AppError } from "@/lib/errors";
import logger from "../lib/logger";
import { JWTPayload } from "@/types/jwt";



/**
 * Mutation to create or update a user in the database.
 * 
 * @param {Object} args - The arguments for the mutation.
 * @param {Object} args.jwt - The JWT payload containing user information.
 * @param {string} args.jwt.aud - Audience of the JWT.
 * @param {string} args.jwt.name - Full name of the user.
 * @param {string} args.jwt.email - Email address of the user.
 * @param {string} [args.jwt.org_name] - Optional organization name.
 * @param {string} [args.jwt.org_role] - Optional organization role.
 * @param {string} [args.jwt.org_slug] - Optional organization slug.
 * @param {string} [args.jwt.org_image] - Optional organization image URL.
 * @param {string} [args.jwt.tenant_id] - Optional tenant ID.
 * @param {string} args.jwt.first_name - First name of the user.
 * @param {string} args.jwt.session_id - Session ID.
 * @param {string} args.jwt.updated_at - Timestamp of the last update.
 * @param {string} args.jwt.external_id - External ID.
 * @param {string} [args.jwt.phone_number] - Optional phone number.
 * @param {string} args.jwt.clerk_user_id - Clerk user ID.
 * @param {string} [args.jwt.org_has_image] - Optional flag indicating if the organization has an image.
 * @param {string} [args.jwt.session_actor] - Optional session actor.
 * @param {boolean} args.jwt.email_verified - Flag indicating if the email is verified.
 * @param {string[]} [args.jwt.org_permissions] - Optional array of organization permissions.
 * @param {boolean} [args.jwt.phone_verified] - Optional flag indicating if the phone number is verified.
 * @param {boolean} args.jwt.two_factor_enabled - Flag indicating if two-factor authentication is enabled.
 * 
 * @param {Object} ctx - The context object.
 * @param {Object} ctx.db - The database context.
 * 
 * @returns {Promise<string>} The ID of the created or updated user.
 * 
 * @throws {AppError} If there is an error creating or updating the user.
 */
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
        try {
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
                logger.info({ userId, action: "USER_UPDATED" }, "User updated");
            } else {
                userId = await ctx.db.insert("users", userData);
                logger.info({ userId, action: "USER_CREATED" }, "User created");
            }

            await ctx.db.insert("auditLogs", {
                userId,
                action: existingUser ? "USER_UPDATED" : "USER_CREATED",
                details: `User ${jwt.email} ${existingUser ? "updated" : "created"}`,
                timestamp: new Date().toISOString(),
            });

            return userId;
        } catch (error) {
            logger.error({ error, jwt }, "Error creating/updating user");
            throw new AppError("Failed to create/update user", 500);
        }
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
            clerkId: args.clerkId,
            tokenIdentifier: "",
            name: ""
        });

    },
});

export const getUser = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        try {
            const user = await ctx.db
                .query("users")
                .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
                .unique();

            if (!user) {
                throw new AppError("User not found", 404);
            }

            return user;
        } catch (error) {
            logger.error({ error, clerkId: args.clerkId }, "Error fetching user");
            throw error;
        }
    },
});