"use client";

import { api } from "@/convex/_generated/api";
import { UserProfile } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { useState } from 'react';

export default function UserProfilePage() {
    const user = useQuery(api.users.getUser, { userId: "current-user-id" }); // Replace with actual user ID
    const updateProfile = useMutation(api.users.updateUserProfile);
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(user?.phone || undefined);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState<Error | null>(null);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdateSuccess(false);
        setUpdateError(null);

        try {
            await updateProfile({ userId: "current-user-id", phoneNumber });
            setUpdateSuccess(true);
        } catch (error) {
            console.error("Failed to update profile:", error);
            setUpdateError(error as Error);
            }
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">User Profile</h1>
            <UserProfile
                path="/user-profile"
                routing="path"
            />
            <form onSubmit={handleUpdateProfile} className="mt-5">
                <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border p-2 mb-4"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Update Profile
                </button>

                {updateSuccess && (
                    <div className="text-green-500 mt-2">
                        Profile updated successfully!
                    </div>
                )}

                {updateError && (
                    <div className="text-red-500 mt-2">
                        {updateError.message}
                    </div>
                )}
            </form>
        </div>
    );
}
