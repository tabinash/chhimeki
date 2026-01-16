"use client";

import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { GroupListResponse } from "@/types/api/group";

interface GroupCardSmallProps {
    group: GroupListResponse;
}

/**
 * Compact group card for horizontal scroll sections (e.g., "Your Groups")
 * No join/leave button - just a clickable card
 */
export default function GroupCardSmall({ group }: GroupCardSmallProps) {
    return (
        <Link
            href={`/groups/${group.id}`}
            className="flex-shrink-0 w-32 group"
        >
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-2xl overflow-hidden relative mb-2 ring-1 ring-gray-100 group-hover:ring-blue-200 transition-all">
                {group.profileImage ? (
                    <Image
                        src={group.profileImage}
                        alt={group.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Users className="w-10 h-10 text-white" />
                    </div>
                )}
            </div>

            {/* Name */}
            <p className="font-bold text-[13px] text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                {group.name}
            </p>

            {/* Member Count */}
            <p className="text-[12px] text-gray-500">
                {group.memberCount} members
            </p>
        </Link>
    );
}
