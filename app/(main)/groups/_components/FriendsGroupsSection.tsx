"use client";
import { FriendsGroupCard } from "./FriendsGroupCard";
import { GroupListResponse } from "@/types/api/group";

interface FriendsGroupsSectionProps {
    groups: GroupListResponse[];
    isLoading: boolean;
}

export function FriendsGroupsSection({ groups, isLoading }: FriendsGroupsSectionProps) {
    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">Your Groups</h2>
                {groups.length > 0 && (
                    <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                        See All
                    </button>
                )}
            </div>

            {isLoading ? (
                // Loading skeleton
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
                            <div className="flex gap-3">
                                <div className="w-16 h-16 rounded-xl bg-gray-200" />
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : groups.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                    {groups.map((group) => (
                        <FriendsGroupCard key={group.id} group={group} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 text-sm">You haven't joined any groups yet</p>
                </div>
            )}
        </div>
    );
}
