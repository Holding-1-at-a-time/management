/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 12:06:37
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
// convex/auditLogs.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

export const logAction = async (
    ctx: any,
    userId: string,
    action: string,
    details: string
) => {
    await ctx.db.insert("auditLogs", {
        userId,
        action,
        details,
        timestamp: new Date().toISOString(),
    });
};

export const getAuditLogs = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("auditLogs")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .order("desc")
            .take(100);
    },
});