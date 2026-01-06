"use client";

import { useSearchParams } from "next/navigation";
import ProfileHeader from "../_components/ProfileHeader";
import { mockUsers, currentUser } from "@/data/mockProfileData";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const searchParams = useSearchParams();
    const userId = searchParams.get("user");

    // Fallback: If no user found, default to currentUser (safe fallback)
    const user = userId ? (mockUsers[userId] || currentUser) : currentUser;
    const isOwnProfile = !userId || userId === "current";

    return (
        <main >
            <ProfileHeader user={user} isOwnProfile={true} />
            {children}
        </main>
    );
}
