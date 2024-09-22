import { UserOrganizations } from "@/components/User-Organization";
import { CreateOrganization, UserButton, UserProfile } from "@clerk/nextjs";

export default function DashboardPage() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <UserButton />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Create Organization</h2>
                    <CreateOrganization />
                </div>
                <div>
                    <UserOrganizations />
                </div>
                <div>
                    <UserProfile />
                </div>
            </div>
        </div>
    );
}