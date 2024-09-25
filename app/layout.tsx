/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 14:06:44
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/

import ConvexClerkProvider from "@/ConvexClerkProvider";
import { auth } from '@clerk/nextjs/server'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProviderWithConvex } from "@/components/components-clerk-provider-with-convex";


/**
 * Initializes local fonts for Geist Sans and Geist Mono.
 */

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});


/**
 * Represents metadata for the organization management with Clerk.
 */
export const metadata: Metadata = {
  title: "Organization Management With Clerk",
  description: "Mange your Organization with The Help from Clerk",
};


/**
 * Renders the root layout component with Clerk authentication and custom fonts.
 * 
 * @param children - The child components to be rendered within the layout.
 */


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { orgId } = auth();
  const hasActiveOrganization = !!orgId;



  return (
    <ClerkProviderWithConvex>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main>
            <ConvexClerkProvider>
              {children}
            </ConvexClerkProvider>
          </main>
        </body>
      </html>
    </ClerkProviderWithConvex>
  );
};