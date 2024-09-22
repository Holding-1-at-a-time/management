"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import React from "react";



/**
 * A provider that wraps the Clerk and Convex providers.
 *
 * It takes children as a prop and renders them wrapped in both the Clerk and Convex providers.
 *
 * This is necessary because the Convex provider needs to be wrapped in the Clerk provider
 * to be able to use the `useAuth` function from Clerk.
 *
 * @param {{ children: React.ReactElement }} props - The children to render.
 * @returns {React.ReactElement} The children wrapped in the providers.
 */
const ConvexClerkProvider = ({ children }: { children: React.ReactElement }) => {
  /**
   * Create a new Convex client instance.
   *
   * The client is created with the `NEXT_PUBLIC_CONVEX_URL` environment variable.
   *
   * The `useMemo` hook is used to create the client only once, when the component is mounted.
   */
  const client = React.useMemo(() => new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string), []);
  return (
    <ClerkProvider
      /**
       * The publishable key for the Clerk instance.
       *
       * This is the key that is used to authenticate with the Clerk API.
       */
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
      /**
       * The appearance options for the Clerk instance.
       *
       * This is an object that contains options for customizing the appearance of the Clerk
       * UI components, such as the login form and the user profile.
       */
      appearance={{
        layout: {
          animations: true,
          shimmer: true,
        },
      }}
    >
      <ConvexProviderWithClerk
        /**
         * The Convex client instance to use.
         *
         * This is the client instance that is created by the hook above.
         */
        client={client}
        /**
         * The `useAuth` function from Clerk to use.
         *
         * This is the function that is used to authenticate with the Clerk API.
         */
        useAuth={useAuth}
      >
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
export default ConvexClerkProvider;
