/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 08:31:42
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
import { v } from "convex/values";
import { userValidator } from './types';

// User entity
export const userValidator = v.object({
    _id: v.id('users'),
    name: v.string(),
    email: v.string(),
    createdAt: v.number(),
});
type User = userValidator.type;
// PotentialClient entity
export const potentialClientValidator = v.object({
    _id: v.id('potentialClient'),
    name: v.string(),
    email: v.string(),
    companyName: v.string(),
    companySize: v.string(),
    interestLevel: v.string(),
    createdAt: v.number(),
});
export type PotentialClient = typeof potentialClientValidator.type;

// Appointment entity
export const appointmentValidator = v.object({
    _id: v.id('appointment'),
    time: v.string(),
    service: v.string(),
    status: v.string(),
    duration: v.number(),
    price: v.number(),
    userId: v.string(),
    createdAt: v.number(),
});
export type Appointment = typeof appointmentValidator.type;

// Message entity
export const messageValidator = v.object({
    _id: v.id('message'),
    role: v.string(),
    content: v.string(),
    userId: v.id('users'),
    createdAt: v.number(),
});
export type Message = typeof messageValidator.type;

// Prediction entity
export const predictionValidator = v.object({
    _id: v.id('prediction'),
    content: v.string(),
    userId: v.id('users'),
    createdAt: v.number(),
});
export type Prediction = typeof predictionValidator.type;

// Waitlist entity
export const waitlistValidator = v.object({
    _id: v.id('waitlist'),
    userId: v.id('users'),
    email: v.string(),
    name: v.string(),
    companySize: v.string(),
    companyName: v.string(),
    createdAt: v.number(),
});
export type Waitlist = typeof waitlistValidator.type;

// JWT Claims
export const jwtClaimsValidator = v.object({
    aud: v.string(),
    name: v.string(),
    email: v.string(),
    org_name: v.string(),
    org_role: v.string(),
    org_slug: v.string(),
    org_image: v.string(),
    tenant_id: v.string(),
    first_name: v.string(),
    session_id: v.string(),
    updated_at: v.string(),
    external_id: v.string(),
    phone_number: v.optional(v.string()),
    clerk_user_id: v.string(),
    org_has_image: v.string(),
    session_actor: v.string(),
    email_verified: v.boolean(),
    org_permisions: v.any(), // You might want to define a more specific type based on the actual structure
    phone_verified: v.boolean(),
    org_permissions: v.any(), // You might want to define a more specific type based on the actual structure
    two_factor_enabled: v.boolean()
});
export type JWTClaims = typeof jwtClaimsValidator.type;