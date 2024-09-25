/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 12:05:40
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
// convex/organizations.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { ROLES, PERMISSIONS } from "../utils/auth";
import { logAction } from "./auditLogs";

export const createOrganization = mutation({
    args: {
        name: v.string(),
        slug: v.string(),
        ownerId: v.string(),
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existingOrg = await ctx.db
            .query("organizations")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();

        if (existingOrg) {
            throw new ConvexError("Organization with this slug already exists");
        }

        const organizationId = await ctx.db.insert("organizations", {
            name: args.name,
            slug: args.slug,
            ownerId: args.ownerId,
            image: args.image,
        });

        await ctx.db.insert("memberships", {
            userId: args.ownerId,
            organizationId,
            role: ROLES.ADMIN,
            permissions: Object.values(PERMISSIONS),
        });

        await logAction(ctx, args.ownerId, "ORGANIZATION_CREATED", `Organization ${args.name} created`);

        return organizationId;
    },
});

export const getOrganization = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const organization = await ctx.db
            .query("organizations")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();

        if (!organization) {
            throw new ConvexError("Organization not found");
        }

        return organization;
    },
});

export const listOrganizations = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const memberships = await ctx.db
            .query("memberships")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .collect();

        const organizationIds = memberships.map((m) => m.organizationId);
        const organizations = await Promise.all(
            organizationIds.map((id) => ctx.db.get(id))
        );

        return organizations.filter((org): org is NonNullable<typeof org> => org !== null);
    },
});