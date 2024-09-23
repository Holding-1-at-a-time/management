/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 23/09/2024 - 09:52:16
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 23/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
"use client";

import { api } from "@/convex/_generated/api";
import { UserProfile, useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { useState } from 'react';

export default function UserProfilePage() {
    const { user } = useUser(); // Retrieve the current user
    const userId = user ? user.id : null; // Get the user ID if available

    const userProfile = useQuery(api.users.getUser, { userid }); // Use the dynamic user ID
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
            setUpdateError(new Error("Failed to update profile. Please try again."));
            console.error("Profile update error:", error);
        }

        try {
            await updateProfile({ userId: "current-user-id", phoneNumber });
            setUpdateSuccess(true);
        } catch (error) {
            console.error("Failed to update profile:", error);
            setUpdateError(error as Error);
        }
    }
}

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