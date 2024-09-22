import React from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const ConvexClerkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const convexClient = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
            <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};

export default ConvexClerkProvider;
