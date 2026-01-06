"use client";
import { useSearchParams } from "next/navigation";
import { mockUsers, currentUser } from "@/data/mockProfileData";
import ProfileHeader from "./_components/ProfileHeader";

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
        <main className="flex-1 h-full overflow-y-auto max-w-[1035px]">
            <div className="min-h-screen bg-gray-50/30">
                {/* --- PROFILE HEADER (Stable across routes) --- */}
                <ProfileHeader user={user} isOwnProfile={false} />

                {/* Children (page content) */}
                {children}
            </div>
        </main>
    );
}
