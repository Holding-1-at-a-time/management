/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 08:49:20
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
'use client'

import { ClerkProvider } from "@clerk/nextjs";
import { useConvexAuth, useAction, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useEffect } from "react";
import { api } from "../convex/_generated/api";

export function ClerkProviderWithConvex({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={ConvexReactClient} useAuth={useConvexAuth}>
        <ConvexUserCreator>{children}</ConvexUserCreator>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

function ConvexUserCreator({ children }: Readonly<{ children: React.ReactNode }>) {
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