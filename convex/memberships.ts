/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 12:06:06
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
import { ConvexError } from "convex/values";
import { ROLES, PERMISSIONS } from "../utils/auth";
import { logAction } from "./auditLogs";

export const addMember = mutation({
    args: {
        email: v.string(),
        organizationId: v.string(),
        role: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();

        if (!user) {
            throw new ConvexError("User not found");
        }

        const existingMembership = await ctx.db
            .query("memberships")
            .withIndex("by_user_and_org", (q) =>
                q.eq("userId", user._id).eq("organizationId", args.organizationId)
            )
            .unique();

        if (existingMembership) {
            throw new ConvexError("User is already a member of this organization");
        }

        const permissions = getRolePermissions(args.role);
        const membershipId = await ctx.db.insert("memberships", {
            userId: user._id,
            organizationId: args.organizationId,
            role: args.role,
            permissions,
        });

        await logAction(ctx, user._id, "MEMBER_ADDED", `User ${args.email} added to organization`);

        return membershipId;
    },
});

export const getMembers = query({
    args: { organizationId: v.string() },
    handler: async (ctx, args) => {
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
    },
});

function getRolePermissions(role: string): string[] {
    switch (role) {
        case ROLES.ADMIN:
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