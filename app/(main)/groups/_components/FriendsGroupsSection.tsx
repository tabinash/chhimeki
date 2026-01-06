"use client";
import { FriendsGroupCard } from "./FriendsGroupCard";

interface FriendsGroup {
    name: string;
    members: string;
    image: string;
    memberAvatars: string[];
}

interface FriendsGroupsSectionProps {
    groups: FriendsGroup[];
}

export function FriendsGroupsSection({ groups }: FriendsGroupsSectionProps) {
    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">Your Friends Group</h2>
                <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                    See All
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {groups.map((group, index) => (
                    <FriendsGroupCard
                        key={index}
                        name={group.name}
                        members={group.members}
                        image={group.image}
                        memberAvatars={group.memberAvatars}
                    />
                ))}
            </div>
        </div>
    );
}
