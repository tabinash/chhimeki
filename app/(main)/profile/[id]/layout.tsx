"use client";
import { useParams } from "next/navigation";
import ProfileHeader from "../_components/ProfileHeader";
import { useUserProfile } from "../_hook/useUserProfile";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const userId = Number(params.id);

    // Fetch user profile from API
    const { data, isLoading, error } = useUserProfile(userId);

    // Loading state
    if (isLoading) {
        return (
            <main className="flex-1 h-full overflow-y-auto">
                <div className="min-h-screen bg-gray-50/30 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading profile...</p>
                    </div>
                </div>
            </main>
        );
    }

    // Error state
    if (error || !data) {
        return (
            <main className="flex-1 h-full overflow-y-auto">
                <div className="min-h-screen bg-gray-50/30 flex items-center justify-center">
                    <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-md">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">😕</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Profile Not Found</h3>
                        <p className="text-gray-600 mb-4">{error?.message || "This user doesn't exist or has been removed."}</p>
                        <a href="/" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors inline-block">
                            Go Home
                        </a>
                    </div>
                </div>
            </main>
        );
    }

    const user = data.data;

    return (
        <main className="flex-1 ">
            <div className="min-h-screen bg-gray-50/30 ">
                {/* --- PROFILE HEADER (Stable across routes) --- */}
                <ProfileHeader user={user} />

                {/* Children (page content) */}
                {children}
            </div>
        </main>
    );
}
