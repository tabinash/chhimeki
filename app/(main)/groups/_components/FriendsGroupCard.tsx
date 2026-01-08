"use client";
import { GroupListResponse } from "@/types/api/group";
import { useRouter } from "next/navigation";

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
            className="bg-white rounded-2xl p-4 flex items-center gap-3 cursor-pointer"
        >
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-white">
                <img
                    src={group.profileImage || "/placeholder-group.png"}
                    alt={group.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
                    {group.name}
                </h3>
                <p className="text-xs text-gray-500 mb-1.5">
                    {group.memberCount} {group.memberCount === 1 ? 'member' : 'members'}
                </p>
                <div className="flex items-center">
                    {/* Placeholder for member avatars - could fetch from getGroupMembers API if needed */}
                    <div className="text-xs text-gray-400">
                        {group.isAdmin ? '👑 Admin' : 'Member'}
                    </div>
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                }}
                className="px-4 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm flex-shrink-0 border border-gray-200"
            >
                View
            </button>
        </div>
    );
}
