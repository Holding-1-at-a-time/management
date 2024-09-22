import React from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
    console.error('NEXT_PUBLIC_CONVEX_URL environment variable is not set');
    throw new Error('NEXT_PUBLIC_CONVEX_URL environment variable is not set');
}
const ConvexClerkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    console.log('Rendering ConvexClerkProvider');
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
            <ConvexProviderWithClerk client={new ConvexReactClient(convexUrl)} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};
export default ConvexClerkProvider;