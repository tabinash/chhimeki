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
            }
        });
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden bg-white">
                <img
                    src={group.profileImage || "/placeholder-group.png"}
                    alt={group.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-0.5">
                    {group.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                    {group.memberCount} {group.memberCount === 1 ? 'member' : 'members'}
                </p>
                <button
                    onClick={handleJoin}
                    disabled={joinMutation.isPending || group.isMember}
                    className={`w-full py-2 
                    bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors text-sm border border-gray-200 disabled:opacity-80 disabled:cursor-not-allowed`}
                >
                    {joinMutation.isPending ? 'Joining...' : group.isMember ? 'Joined' : 'Join Group'}
                </button>
            </div>
        </div>
    );
}
