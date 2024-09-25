"use client"
import { useState } from 'react';
import { UserProfile } from '@clerk/nextjs';

export default function UserProfilePage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState<Error | null>(null);

    const handleUpdateProfile = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await fetch('/api/update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }),
            });
            setUpdateSuccess(true);
            setUpdateError(null);
        } catch (error) {
            setUpdateSuccess(false);
            setUpdateError(error instanceof Error ? error : new Error('An unknown error occurred'));
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