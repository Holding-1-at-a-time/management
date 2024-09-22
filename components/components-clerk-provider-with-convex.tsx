'use client'

import { ClerkProvider } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useEffect } from "react";
import { api } from "../convex/_generated/api";
import { useAction } from "convex/react";

export function ClerkProviderWithConvex({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convexClient} useAuth={useConvexAuth}>
        <ConvexUserCreator>{children}</ConvexUserCreator>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

function ConvexUserCreator({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useConvexAuth();
  const createUser = useAction(api.users.createUser);

  useEffect(() => {
    if (isAuthenticated && user) {
      createUser({
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        clerkId: user.id,
      }).catch((error) => {
        console.error("Failed to create user in Convex:", error);
      });
    }
  }, [isAuthenticated, user, createUser]);

  return <>{children}</>;
}