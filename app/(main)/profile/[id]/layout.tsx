"use client";

import { use } from "react";
import ProfileHeader from "../_components/ProfileHeader";
import { useUserProfile } from "../_hook";

interface ProfileLayoutProps {
    params: Promise<{
        id: string;
    }>;
    children: React.ReactNode;
}

export default function ProfileLayout({ params, children }: ProfileLayoutProps) {
    // Unwrap the Promise using React's use() hook (Next.js 16+)
    const { id } = use(params);
    const userId = parseInt(id, 10);

    // Fetch user profile data from API
    const { data: profileData, isLoading, error } = useUserProfile(userId);

    // Loading state
    if (isLoading) {
        return (
            <main>
                <div className="bg-white animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <div className="px-4 -mt-10">
                        <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white" />
                        <div className="h-6 w-40 bg-gray-200 rounded mt-4" />
                        <div className="h-4 w-24 bg-gray-200 rounded mt-2" />
                    </div>
                </div>
                {children}
            </main>
        );
    }

    // Error state
    if (error || !profileData?.data) {
        return (
            <main>
                <div className="p-8 text-center">
                    <p className="text-red-500 font-medium">Failed to load profile</p>
                </div>
            </main>
        );
    }

    const user = profileData.data;

    return (
        <main>
            <ProfileHeader user={user} isOwnProfile={user.isMine} />
            {children}
        </main>
    );
}
