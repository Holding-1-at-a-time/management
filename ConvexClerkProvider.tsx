"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import React, { ReactNode } from "react";


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);
const ConvexClerkProvider = ({ children }: { children: ReactNode }) => {
  const client = React.useMemo(() => new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string), []);
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
      appearance={{
        layout: {
          animations: true,
          shimmer: true,
        }
      }}
    >
      <ConvexProviderWithClerk client={client} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
export default ConvexClerkProvider;