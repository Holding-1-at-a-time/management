/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 13:33:41
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
import { AppError } from "../lib/errors";
import logger from "../lib/logger";
import { ROLES, PERMISSIONS } from "../utils/auth";
import { Organization } from "@clerk/nextjs/server";

/**
 * Creates a new organization.
 *
 * @mutation
 * @param {Object} args - The arguments for creating an organization.
 * @param {string} args.name - The name of the organization.
 * @param {string} args.slug - The unique slug for the organization.
 * @param {string} args.ownerId - The ID of the owner of the organization.
 * @param {string} [args.image] - Optional image URL for the organization.
 * @returns {Promise<string>} The ID of the newly created organization.
 * @throws {AppError} If an organization with the given slug already exists.
 * @throws {Error} If there is an error during the creation process.
 *
 * The function performs the following steps:
 * 1. Checks if an organization with the given slug already exists.
 * 2. If it exists, throws an `AppError`.
 * 3. Inserts the new organization into the `organizations` table.
 * 4. Inserts a membership record for the owner with admin creator role.
 * 5. Logs the creation of the organization.
 * 6. Inserts an audit log for the organization creation.
 * 7. Returns the ID of the newly created organization.
 */
export const createOrganization = mutation({
    args: {
        name: v.string(),
        slug: v.string(),
        ownerId: v.string(),
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        try {
            const existingOrg = await ctx.db
                .query("organizations")
                .withIndex("by_slug", (q) => q.eq("slug", args.slug))
                .unique();

            if (existingOrg) {
                throw new AppError("Organization with this slug already exists", 400);
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
                role: ROLES.ADMIN_CREATOR,
                permissions: Object.values(PERMISSIONS),
            });

            logger.info({ organizationId, ownerId: args.ownerId }, "Organization created");

            await ctx.db.insert("auditLogs", {
                userId: args.ownerId,
                action: "ORGANIZATION_CREATED",
                details: `Organization ${args.name} created`,
                timestamp: new Date().toISOString(),
            });

            return organizationId;
        } catch (error) {
            logger.error({ error, args }, "Error creating organization");
            throw error;
        }
    },
});

export const getOrganization = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        try {
            const organization = await ctx.db
                .query("organizations")
                .withIndex("by_slug", (q) => q.eq("slug", args.slug))
                .unique();

            if (!organization) {
                throw new AppError("Organization not found", 404);
            }

            return organization;
        } catch (error) {
            logger.error({ error, slug: args.slug }, "Error fetching organization");
            throw error;
        }
    },
});

export const listOrganizations = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        try {
            const memberships = await ctx.db
                .query("memberships")
                .filter((q) => q.eq(q.field("userId"), args.userId))
                .collect();

            const organizationIds = memberships.map((m) => m.organizationId);
            const organizations = await Promise.all(
                organizationIds.map((id) => ctx.db.get(id))
            );

return organizations.filter((org: Organization | null): org is NonNullable<Organization> => org !== null);        } catch (error) {
            logger.error({ error, userId: args.userId }, "Error listing organizations");
            throw new AppError("Failed to list organizations", 500);
        }
    },
});