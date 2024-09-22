'use client'

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export function UserOrganizations() {
    const { user } = useUser();
    const organizations = useQuery(api.organizations.getOrganizationsByUser, { userId: user?.id ?? "" });

    if (!organizations) {
        return <div>Loading organizations...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Your Organizations</h2>
            {organizations.length === 0 ? (
                <p>You are not a member of any organizations.</p>
            ) : (
                <ul className="space-y-2">
                    {organizations.map((org) => (
                        <li key={org._id} className="p-4 border rounded">
                            {org.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}