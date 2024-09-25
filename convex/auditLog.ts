/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 13:37:42
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
import { AppError } from "../lib/errors";
import logger from "../lib/logger";

/**
 * Logs an action performed by a user into the audit logs.
 *
 * @param {Object} args - The arguments for the mutation.
 * @param {string} args.userId - The ID of the user performing the action.
 * @param {string} args.action - The action performed by the user.
 * @param {string} args.details - Additional details about the action.
 * @param {Object} ctx - The context object containing the database instance.
 * @returns {Promise<void>} - A promise that resolves when the log entry is created.
 * @throws {AppError} - Throws an error if the log entry creation fails.
 */
export const logAction = mutation({
    args: {
        userId: v.string(),
        action: v.string(),
        details: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            await ctx.db.insert("auditLogs", {
                userId: args.userId,
                action: args.action,
                details: args.details,
                timestamp: new Date().toISOString(),
            });
            logger.info({ userId: args.userId, action: args.action }, "Audit log created");
        } catch (error) {
            logger.error({ error, args }, "Error creating audit log");
            throw new AppError("Failed to create audit log", 500);
        }
    },
});

export const getAuditLogs = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        try {
            return await ctx.db
                .query("auditLogs")
                .withIndex("by_user", (q) => q.eq("userId", args.userId))
                .order("desc")
                .take(100);
        } catch (error) {
            logger.error({ error, userId: args.userId }, "Error fetching audit logs");
            throw new AppError("Failed to fetch audit logs", 500);
        }
    },
});