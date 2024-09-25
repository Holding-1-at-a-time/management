/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 13:37:26
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
// convex/memberships.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { AppError } from "../lib/errors";
import logger from "../lib/logger";
import { ROLES, PERMISSIONS } from "../utils/auth";

/**
 * Mutation to add a member to an organization.
 *
 * @param {Object} args - The arguments for the mutation.
 * @param {string} args.email - The email of the user to be added.
 * @param {string} args.organizationId - The ID of the organization.
 * @param {string} args.role - The role of the user within the organization.
 *
 * @throws {AppError} If the user is not found.
 * @throws {AppError} If the user is already a member of the organization.
 *
 * @returns {Promise<string>} The ID of the newly created membership.
 *
 * @example
 * ```typescript
 * const membershipId = await addMember({
 *   email: "user@example.com",
 *   organizationId: "org123",
 *   role: "admin"
 * });
 * ```
 */
export const addMember = mutation({
    args: {
        email: v.string(),
        organizationId: v.string(),
        role: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            const user = await ctx.db
                .query("users")
                .withIndex("by_email", (q) => q.eq("email", args.email))
                .unique();

            if (!user) {
                throw new AppError("User not found", 404);
            }

            const existingMembership = await ctx.db
                .query("memberships")
                .withIndex("by_user_and_org", (q) =>
                    q.eq("userId", user._id).eq("organizationId", args.organizationId)
                )
                .unique();

            if (existingMembership) {
                throw new AppError("User is already a member of this organization", 400);
            }

            const permissions = getRolePermissions(args.role);
            const membershipId = await ctx.db.insert("memberships", {
                userId: user._id,
                organizationId: args.organizationId,
                role: args.role,
                permissions,
            });

            logger.info({ membershipId, userId: user._id, organizationId: args.organizationId }, "Member added to organization");

            await ctx.db.insert("auditLogs", {
                userId: user._id,
                action: "MEMBER_ADDED",
                details: `User ${args.email} added to organization`,
                timestamp: new Date().toISOString(),
            });

            return membershipId;
        } catch (error) {
            logger.error({ error, args }, "Error adding member to organization");
            throw error;
        }
    },
});

export const getMembers = query({
    args: { organizationId: v.string() },
    handler: async (ctx, args) => {
        try {
            const memberships = await ctx.db
                .query("memberships")
                .filter((q) => q.eq(q.field("organizationId"), args.organizationId))
                .collect();

            const userIds = memberships.map((m) => m.userId);
            const users = await Promise.all(userIds.map((id) => ctx.db.get(id)));

            return memberships.map((membership, index) => ({
                ...membership,
                user: users[index],
            }));
        } catch (error) {
            logger.error({ error, organizationId: args.organizationId }, "Error fetching members");
            throw new AppError("Failed to fetch members", 500);
        }
    },
});

function getRolePermissions(role: string): string[] {
    switch (role) {
        case ROLES.ADMIN_CREATOR:
            return Object.values(PERMISSIONS);
        case ROLES.MANAGEMENT:
            return [
                PERMISSIONS.CREATE_SERVICE,
                PERMISSIONS.READ_CLIENT,
                PERMISSIONS.UPDATE_CLIENT,
                PERMISSIONS.DELETE_CLIENT,
                PERMISSIONS.CREATE_SCHEDULE,
                PERMISSIONS.READ_FEEDBACK,
            ];
        case ROLES.MEMBER:
            return [
                PERMISSIONS.READ_CLIENT,
                PERMISSIONS.CREATE_SCHEDULE,
                PERMISSIONS.READ_FEEDBACK,
            ];
        case ROLES.NON_MEMBER:
            return [PERMISSIONS.READ_CLIENT];
        default:
            return [];
    }
}