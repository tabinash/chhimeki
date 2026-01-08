"use client";
import { SuggestedGroupCard } from "./SuggestedGroupCard";
import { GroupListResponse } from "@/types/api/group";

interface SuggestedGroupsSectionProps {
    groups: GroupListResponse[];
    isLoading: boolean;
}

export function SuggestedGroupsSection({ groups, isLoading }: SuggestedGroupsSectionProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">Suggested Groups</h2>
                {groups.length > 0 && (
                    <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                        See All
                    </button>
                )}
            </div>

            {isLoading ? (
                // Loading skeleton
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
                            <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-3" />
                            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                        </div>
                    ))}
                </div>
            ) : groups.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {groups.map((group) => (
                        <SuggestedGroupCard key={group.id} group={group} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 text-sm">No suggested groups available</p>
                </div>
            )}
        </div>
    );
}
