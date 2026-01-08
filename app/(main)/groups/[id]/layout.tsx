"use client";
import { useParams } from "next/navigation";
import GroupHeader from "./_components/GroupHeader";
import { useGetGroupById } from "../_hook";

export default function GroupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const groupId = Number(params.id);

    // Fetch group details
    const { data, isLoading, error } = useGetGroupById(groupId);

    // Loading state
    if (isLoading) {
        return (
            <main className="flex-1">
                <div className="min-h-screen bg-gray-50/30 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading group...</p>
                    </div>
                </div>
            </main>
        );
    }

    // Error state
    if (error || !data) {
        return (
            <main className="flex-1">
                <div className="min-h-screen bg-gray-50/30 flex items-center justify-center">
                    <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-md">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">😕</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Group Not Found</h3>
                        <p className="text-gray-600 mb-4">{error?.message || "This group doesn't exist or has been removed."}</p>
                        <a href="/groups" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors inline-block">
                            Back to Groups
                        </a>
                    </div>
                </div>
            </main>
        );
    }

    const group = data.data;

    return (
        <main className="flex-1">
            <div className="min-h-screen bg-gray-50/30">
                {/* Group Header (Stable across routes) */}
                <GroupHeader group={group} />

                {/* Children (page content) */}
                {children}
            </div>
        </main>
    );
}
