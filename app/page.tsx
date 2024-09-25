/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 12:20:13
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
// app/page.tsx
import { auth, currentUser } from "@clerk/nextjs";
import { api } from "../convex/_generated/api";
import { OrganizationList } from "./components/OrganizationList";
import { CreateOrganization } from "./components/CreateOrganization";
import { SignIn, SignUp, UserButton } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our App</h1>
        <div className="space-y-4">
          <SignIn />
          <SignUp />
        </div>
      </div>
    );
  }

  return (
    <div>page</div>
  )
}

export default page