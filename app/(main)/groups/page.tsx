"use client";
import { GroupsHeader } from "./_components/GroupsHeader";
import { SuggestedGroupsSection } from "./_components/SuggestedGroupsSection";
import { FriendsGroupsSection } from "./_components/FriendsGroupsSection";
import { suggestedGroups, friendsGroups } from "@/data/mockGroupsData";

export default function DiscoverGroups() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <GroupsHeader />

                {/* Suggested Section */}
                <SuggestedGroupsSection groups={suggestedGroups} />

                {/* Your Friends Group Section */}
                <FriendsGroupsSection groups={friendsGroups} />
            </div>
        </div>
    );
}