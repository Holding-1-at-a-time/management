"use client;"

import React from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error('NEXT_PUBLIC_CONVEX_URL environment variable is not set');
}
const convexClient = new ConvexReactClient(convexUrl);
const ConvexClerkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('NEXT_PUBLIC_CONVEX_URL environment variable is not set');
}
const convexClient = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
            <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};

export default ConvexClerkProvider;
