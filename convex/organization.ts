import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


// Private helper function  
const createOrganizationAndOwner = async (  
    ctx: any,  
    name: string,  
    ownerId: string  
) => {  
    const organizationId = await ctx.db.insert("organizations", {  
        name,  
        ownerId,  
    });  
    await ctx.db.insert("organizationMembers", {  
        userId: ownerId,  
        organizationId,  
        role: "owner",  
    });  
    return organizationId;  
};  

export const store = mutation({
    args: {
        tenantId: v.id('tenants'),
        name: v.string(),
        ownerId: v.string(),
    },
    handler: async (ctx, args) => {
        return createOrganizationAndOwner(ctx, args.name, args.ownerId);  
    }
    });

export const createOrganization = mutation({
    args: {
        name: v.string(),
        ownerId: v.string(),
    },
    handler: async (ctx, args) => {
        const organizationId = await ctx.db.insert("organizations", {
            name: args.name,
            ownerId: args.ownerId,
        });

        await ctx.db.insert("organizationMembers", {
            userId: args.ownerId,
            organizationId,
            role: "owner",
        });

        return organizationId;
    },
});

export const getOrganizationsByUser = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const memberships = await ctx.db
            .query("organizationMembers")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .collect();

        const organizationIds = memberships.map((m) => m.organizationId);
        const organizations = await Promise.all(
            organizationIds.map((id) => ctx.db.get(id))
        );

        return organizations.filter((org): org is NonNullable<typeof org> => org !== null);
    },
});