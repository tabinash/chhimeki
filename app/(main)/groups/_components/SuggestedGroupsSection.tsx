"use client";
import { SuggestedGroupCard } from "./SuggestedGroupCard";

interface SuggestedGroup {
    name: string;
    members: string;
    image: string;
}

interface SuggestedGroupsSectionProps {
    groups: SuggestedGroup[];
}

export function SuggestedGroupsSection({ groups }: SuggestedGroupsSectionProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">Suggested</h2>
                <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                    See All
                </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {groups.map((group, index) => (
                    <SuggestedGroupCard
                        key={index}
                        name={group.name}
                        members={group.members}
                        image={group.image}
                    />
                ))}
            </div>
        </div>
    );
}
