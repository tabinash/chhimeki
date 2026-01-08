"use client";
import { useState } from "react";
import { GroupsHeader } from "./_components/GroupsHeader";
import { SuggestedGroupsSection } from "./_components/SuggestedGroupsSection";
import { FriendsGroupsSection } from "./_components/FriendsGroupsSection";
import { useGetAllGroups, useGetMyGroups } from "./_hook";
import CreateGroupModal from "./_modal/CreateGroupModal";

export default function DiscoverGroups() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Fetch all groups in user's palika
    const { data: allGroupsData, isLoading: isLoadingAll } = useGetAllGroups({ page: 0, size: 6 });

    // Fetch user's joined groups
    const { data: myGroupsData, isLoading: isLoadingMy } = useGetMyGroups({ page: 0, size: 6 });

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <GroupsHeader onCreateClick={() => setIsCreateModalOpen(true)} />

                {/* Suggested Section (All Groups) */}
                <SuggestedGroupsSection
                    groups={allGroupsData?.data || []}
                    isLoading={isLoadingAll}
                />

                {/* Your Joined Groups Section */}
                <FriendsGroupsSection
                    groups={myGroupsData?.data || []}
                    isLoading={isLoadingMy}
                />
            </div>

            {/* Create Group Modal */}
            <CreateGroupModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    );
}