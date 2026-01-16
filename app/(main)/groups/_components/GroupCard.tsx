"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Loader2 } from "lucide-react";
import { useJoinGroup, useLeaveGroup } from "../_hook";
import { GroupListResponse } from "@/types/api/group";

interface GroupCardProps {
    group: GroupListResponse;
}

export default function GroupCard({ group }: GroupCardProps) {
    const { mutate: joinGroup, isPending: isJoining } = useJoinGroup();
    const { mutate: leaveGroup, isPending: isLeaving } = useLeaveGroup();

    const handleJoin = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        joinGroup(group.id);
    };

    const handleLeave = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        leaveGroup(group.id);
    };

    const isLoading = isJoining || isLeaving;

    return (
        <Link
            href={`/groups/${group.id}`}
            className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:shadow-sm transition-shadow"
        >
            {/* Profile Image */}
            <div className="w-12 h-12 rounded-xl overflow-hidden relative flex-shrink-0">
                {group.profileImage ? (
                    <Image
                        src={group.profileImage}
                        alt={group.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-[16px] font-bold text-gray-900 truncate">
                    {group.name}
                </p>
                <p className="text-[14px] text-gray-500">
                    {group.memberCount} members
                </p>
            </div>

            {/* Join / Leave Button */}
            {group.isMember ? (
                <button
                    onClick={handleLeave}
                    disabled={isLoading}
                    className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-[14px] hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                    {isLeaving ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Leaving...
                        </>
                    ) : (
                        "Joined"
                    )}
                </button>
            ) : (
                <button
                    onClick={handleJoin}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-[14px] hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                    {isJoining ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Joining...
                        </>
                    ) : (
                        "Join"
                    )}
                </button>
            )}
        </Link>
    );
}
