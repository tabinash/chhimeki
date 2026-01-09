"use client";

import { GroupListResponse } from "@/types/api/group";
import { useJoinGroup } from "../_hook";

interface SuggestedGroupCardProps {
    group: GroupListResponse;
}

export function SuggestedGroupCard({ group }: SuggestedGroupCardProps) {
    const joinMutation = useJoinGroup();

    const handleJoin = () => {
        joinMutation.mutate(group.id, {
            onError: (error) => {
                alert(`Failed to join group: ${error.message}`);
            },
        });
    };

    return (
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow">

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
            </div>

            {/* CTA */}
            <button
                onClick={handleJoin}
                disabled={joinMutation.isPending || group.isMember}
                className={`ml-auto rounded-lg px-3 py-1.5 text-xs font-semibold transition-all
          ${group.isMember
                        ? "bg-gray-100 text-gray-500 cursor-default"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }
          ${joinMutation.isPending ? "opacity-80" : ""}
        `}
            >
                {joinMutation.isPending
                    ? "Joining…"
                    : group.isMember
                        ? "Joined"
                        : "Join"}
            </button>
        </div>
    );
}
