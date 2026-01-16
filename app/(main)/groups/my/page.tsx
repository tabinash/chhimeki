"use client";

import { useState } from "react";
import { ArrowLeft, Search, Users, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGetMyGroups, useLeaveGroup } from "../_hook";

export default function MyGroupsPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch user's groups
    const { data: myGroupsData, isLoading, error } = useGetMyGroups({ size: 50 });
    const { mutate: leaveGroup, isPending: isLeaving } = useLeaveGroup();

    // Extract groups from response
    const myGroups = (myGroupsData?.data || []) as any[];

    // Filter by search
    const filteredGroups = myGroups.filter((group) =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLeave = (groupId: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        leaveGroup(groupId);
    };

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center gap-3 mb-3">
                    <button
                        onClick={() => router.back()}
                        className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-[17px] font-bold text-gray-900">Your Groups</h1>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-900" />
                    <input
                        type="text"
                        placeholder="Search your groups..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-[#e4e1dd] rounded-xl text-[16px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    />
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="mx-4 mt-4 p-4 bg-red-50 rounded-xl text-red-600 text-sm">
                    Failed to load your groups. Please try again.
                </div>
            )}

            {/* Groups List */}
            {!isLoading && !error && (
                <div className="px-4 pt-5">
                    {filteredGroups.length > 0 ? (
                        <div className="space-y-3">
                            {filteredGroups.map((group) => (
                                <Link
                                    key={group.id}
                                    href={`/groups/${group.id}`}
                                    className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    {/* Group Image */}
                                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                                        {group.profileImage ? (
                                            <Image
                                                src={group.profileImage}
                                                alt={group.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                <Users className="w-7 h-7 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Group Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 text-[16px] truncate">
                                            {group.name}
                                        </h3>
                                        <p className="text-[14px] text-gray-500">
                                            {group.memberCount} members
                                        </p>
                                        {group.isAdmin && (
                                            <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-[11px] font-bold rounded-full">
                                                Admin
                                            </span>
                                        )}
                                    </div>

                                    {/* Leave Button (only for non-admins) */}
                                    {!group.isAdmin && (
                                        <button
                                            onClick={(e) => handleLeave(group.id, e)}
                                            disabled={isLeaving}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-[13px] hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                                        >
                                            {isLeaving ? "Leaving..." : "Leave"}
                                        </button>
                                    )}
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-[16px] font-bold text-gray-900 mb-1">
                                {searchQuery ? "No groups found" : "No Groups Yet"}
                            </h3>
                            <p className="text-[14px] text-gray-500 mb-4">
                                {searchQuery
                                    ? "Try a different search term"
                                    : "Join groups to see them here"
                                }
                            </p>
                            {!searchQuery && (
                                <Link
                                    href="/groups"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl"
                                >
                                    Browse Groups
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
