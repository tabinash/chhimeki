"use client";

import { useState } from "react";
import {
    Search,
    Plus,
    Users,
    ChevronRight,
    Loader2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    useGetAllGroups,
    useGetMyGroups,
    useJoinGroup,
    useLeaveGroup
} from "./_hook";

export default function GroupsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    /* ---------------- API calls ---------------- */
    const { data: allGroupsData, isLoading: isLoadingAll, error } =
        useGetAllGroups({ size: 20 });

    const { data: myGroupsData, isLoading: isLoadingMy } =
        useGetMyGroups({ size: 10 });

    const { mutate: joinGroup, isPending: isJoining } = useJoinGroup();
    const { mutate: leaveGroup, isPending: isLeaving } = useLeaveGroup();

    /* ---------------- Data extraction ---------------- */
    const allGroups = (allGroupsData?.data || []) as any[];
    const myGroups = (myGroupsData?.data || []) as any[];

    /* ---------------- Search filters ---------------- */
    const filteredMyGroups = myGroups.filter((g) =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredAllGroups = allGroups.filter((g) =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    /* ---------------- Handlers ---------------- */
    const handleJoin = (groupId: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        joinGroup(groupId);
    };

    const handleLeave = (groupId: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        leaveGroup(groupId);
    };

    const isLoading = isLoadingAll || isLoadingMy;

    /* ================================================= */
    return (
        <div className="min-h-screen bg-white pb-24">
            {/* ================= Header ================= */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 pt-4 pb-3">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-[22px] font-bold text-gray-900">
                            Groups
                        </h1>

                        <Link
                            href="/groups/create"
                            className="flex items-center gap-1.5 px-4 py-2 bg-blue-900 text-white rounded-full text-[15px] font-bold shadow-lg shadow-blue-900/30"
                        >
                            <Plus className="w-4 h-4" />
                            Create
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-900" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search groups..."
                            className="w-full pl-12 pr-4 py-3 bg-[#e4e1ddff] rounded-xl text-[16px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>
            </div>

            {/* ================= Loading ================= */}
            {isLoading && (
                <div className="flex justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            )}

            {/* ================= Error ================= */}
            {error && (
                <div className="mx-4 mt-4 p-4 bg-red-50 rounded-xl text-red-600 text-[15px] font-medium">
                    Failed to load groups. Please try again.
                </div>
            )}

            {/* ================= Content ================= */}
            {!isLoading && !error && (
                <div className="px-4 pt-5 space-y-6">

                    {/* ========== My Groups ========== */}
                    {filteredMyGroups.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-[17px] font-bold text-gray-900">
                                    Your Groups
                                </h2>
                                <Link
                                    href="/groups/my"
                                    className="flex items-center gap-1 text-[15px] text-blue-600 font-semibold"
                                >
                                    See All
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                                {filteredMyGroups.slice(0, 5).map((group) => (
                                    <Link
                                        key={group.id}
                                        href={`/groups/${group.id}`}
                                        className="flex-shrink-0 w-32"
                                    >
                                        <div className="w-32 h-32 rounded-2xl overflow-hidden relative mb-2">
                                            {group.profileImage ? (
                                                <Image
                                                    src={group.profileImage}
                                                    alt={group.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                                                    <Users className="w-10 h-10 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <p className="font-bold text-[15px] text-gray-900 line-clamp-2">
                                            {group.name}
                                        </p>
                                        <p className="text-[13px] text-gray-500 font-medium">
                                            {group.memberCount} members
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ========== Groups in Your Area ========== */}
                    <section>
                        <h2 className="text-[17px] font-bold text-gray-900 mb-3 flex items-center justify-between">
                            Groups in Your Area
                            <Link
                                href="/groups/suggested"
                                className="flex items-center gap-1 text-[15px] text-blue-600 font-semibold"
                            >
                                See All
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </h2>

                        <div className="space-y-2">
                            {filteredAllGroups.map((group) => (
                                <Link
                                    key={group.id}
                                    href={`/groups/${group.id}`}
                                    className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100"
                                >
                                    {/* Image */}
                                    <div className="w-12 h-12 rounded-xl overflow-hidden relative">
                                        {group.profileImage ? (
                                            <Image
                                                src={group.profileImage}
                                                alt={group.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-green-600 flex items-center justify-center">
                                                <Users className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[17px] font-bold text-gray-900 truncate">
                                            {group.name}
                                        </p>
                                        <p className="text-[15px] text-gray-500 font-medium">
                                            {group.memberCount} members
                                        </p>
                                    </div>

                                    {/* Join / Joined / Leave */}
                                    {group.isMember ? (
                                        <button
                                            onClick={(e) => handleLeave(group.id, e)}
                                            disabled={isLeaving}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-[15px] disabled:opacity-50"
                                        >
                                            {isLeaving ? "Leaving..." : "Joined"}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => handleJoin(group.id, e)}
                                            disabled={isJoining}
                                            className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-[15px] hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {isJoining ? "Joining..." : "Join"}
                                        </button>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* ========== Empty State ========== */}
                    {allGroups.length === 0 && myGroups.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-[17px] font-bold text-gray-900 mb-1">
                                No Groups Yet
                            </h3>
                            <p className="text-[15px] text-gray-500 mb-4">
                                Be the first to create a group in your area!
                            </p>
                            <Link
                                href="/groups/create"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl"
                            >
                                <Plus className="w-5 h-5" />
                                Create Group
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
