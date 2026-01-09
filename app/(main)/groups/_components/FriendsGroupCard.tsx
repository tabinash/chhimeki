"use client";

import { GroupListResponse } from "@/types/api/group";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface FriendsGroupCardProps {
    group: GroupListResponse;
}

export function FriendsGroupCard({ group }: FriendsGroupCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/groups/${group.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 cursor-pointer
                 hover:bg-gray-50 hover:shadow-sm transition-all"
        >
            {/* Avatar */}
            <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                    src={group.profileImage || "/placeholder-group.png"}
                    alt={group.name}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {group.name}
                </h3>

                <p className="text-xs text-gray-500">
                    {group.memberCount.toLocaleString()}{" "}
                    {group.memberCount === 1 ? "member" : "members"}
                </p>

                <div className="mt-0.5 text-xs font-medium text-gray-400">
                    {group.isAdmin ? "👑 Admin" : "Member"}
                </div>
            </div>

            {/* Action */}
            <div className="flex items-center gap-1 text-gray-400 group-hover:text-gray-700 transition-colors">
                <span className="text-xs font-medium hidden sm:inline">
                    View
                </span>
                <ChevronRight className="h-4 w-4" />
            </div>
        </div>
    );
}
