/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 12:12:35
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexReactClient } from "convex/react";
import { Toaster } from "@/components/ui/toaster"
import ConvexClerkProvider from '@/ConvexClerkProvider';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ConvexClerkProvider {...convex}>
            {children}
          </ConvexClerkProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}