"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useGetGroupById, useGetGroupFeed, useGetGroupMembers, useRemoveMember } from "../_hook";
import GroupLeftSidebar from "./_components/GroupLeftSidebar";
import PostCard from "../_components/PostCard";
import CreatePostWidget from "../_components/CreatePostWidget";
import { MessageSquare, Users as UsersIcon, ShieldCheck, UserX } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function GroupDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const groupId = Number(params.id);
    const activeTab = searchParams.get("tab") || "feed";

    // State for remove member modal
    const [memberToRemove, setMemberToRemove] = useState<{ userId: number; name: string } | null>(null);

    // Fetch group details (also fetched in layout, but cached by React Query)
    const { data: groupData } = useGetGroupById(groupId);

    // Fetch group feed
    const { data: feedData, isLoading: isLoadingFeed } = useGetGroupFeed(groupId, { page: 0, size: 20 });
    console.log("feed data", feedData);

    // Fetch group members
    const { data: membersData, isLoading: isLoadingMembers } = useGetGroupMembers(groupId, { page: 0, size: 20 });

    // Remove member mutation
    const removeMemberMutation = useRemoveMember();

    const group = groupData?.data;

    if (!group) return null;

    const isMember = group.isMember;
    const isAdmin = group.isAdmin;

    // Helper to calculate days ago
    const getDaysAgo = (dateString: string) => {
        const diff = Date.now() - new Date(dateString).getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    };

    const handleRemoveMember = () => {
        if (!memberToRemove) return;

        removeMemberMutation.mutate(
            {
                groupId,
                userId: memberToRemove.userId,
            },
            {
                onSuccess: () => {
                    setMemberToRemove(null);
                },
                onError: (error) => {
                    alert(`Failed to remove member: ${error.message}`);
                },
            }
        );
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN (Sticky Sidebar) */}
            <div className="lg:col-span-4 lg:sticky lg:top-4 lg:h-fit">
                <GroupLeftSidebar group={group} />
            </div>

            {/* RIGHT COLUMN (Content) */}
            <div className="lg:col-span-8 space-y-6">
                {/* Feed Tab */}
                {activeTab === "feed" && (
                    <div className="space-y-6">
                        {/* Create Post Widget (only for members) */}
                        {isMember && <CreatePostWidget groupId={groupId} />}

                        {!isMember ? (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <h3 className="font-bold text-gray-900">Join to see posts</h3>
                                <p className="text-sm text-gray-500">You need to be a member to view this group's feed</p>
                            </div>
                        ) : isLoadingFeed ? (
                            <div className="text-center py-12">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="text-gray-600 mt-4">Loading feed...</p>
                            </div>
                        ) : feedData?.data && feedData.data.length > 0 ? (
                            feedData.data.map((post) => (
                                <PostCard
                                    key={post.id}
                                    userName={post.authorName}
                                    userAvatar={post.authorProfilePicture || `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(post.authorName)}`}
                                    userWard="Group Member"
                                    daysAgo={getDaysAgo(post.createdAt)}
                                    content={post.content || undefined}
                                    imageUrl={post.imageUrls[0]}
                                    likes={post.likeCount}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <h3 className="font-bold text-gray-900">No posts yet</h3>
                                <p className="text-sm text-gray-500">Be the first to post in this group</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Members Tab */}
                {activeTab === "members" && (
                    <div className="space-y-4">
                        {!isMember ? (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                                <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <h3 className="font-bold text-gray-900">Join to see members</h3>
                                <p className="text-sm text-gray-500">You need to be a member to view the member list</p>
                            </div>
                        ) : isLoadingMembers ? (
                            <div className="text-center py-12">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="text-gray-600 mt-4">Loading members...</p>
                            </div>
                        ) : membersData?.data && membersData.data.length > 0 ? (
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-4">
                                    Members ({membersData.pagination.totalElements})
                                </h3>
                                <div className="space-y-3">
                                    {membersData.data.map((member) => (
                                        <div key={member.userId} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                                {member.profilePicture ? (
                                                    <Image
                                                        src={member.profilePicture}
                                                        alt={member.name}
                                                        width={48}
                                                        height={48}
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-gray-900">{member.name}</p>
                                                    {member.role === "ADMIN" && (
                                                        <ShieldCheck className="w-4 h-4 text-orange-500" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    Joined {new Date(member.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                            {member.role === "ADMIN" ? (
                                                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-md">
                                                    Admin
                                                </span>
                                            ) : isAdmin ? (
                                                <button
                                                    onClick={() => setMemberToRemove({ userId: member.userId, name: member.name })}
                                                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                                                >
                                                    <UserX className="w-3.5 h-3.5" />
                                                    Remove
                                                </button>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                                <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <h3 className="font-bold text-gray-900">No members yet</h3>
                            </div>
                        )}
                    </div>
                )}


            </div>

            {/* Remove Member Confirmation Modal */}
            {memberToRemove && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-red-600">Remove Member</h2>
                            <button
                                onClick={() => setMemberToRemove(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                disabled={removeMemberMutation.isPending}
                            >
                                <span className="text-gray-600 text-xl">✕</span>
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserX className="w-8 h-8 text-red-600" />
                            </div>
                            <p className="text-gray-800 text-center mb-2">
                                Are you sure you want to remove <span className="font-bold">{memberToRemove.name}</span> from this group?
                            </p>
                            <p className="text-sm text-gray-500 text-center">
                                They will no longer have access to group posts and content.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setMemberToRemove(null)}
                                disabled={removeMemberMutation.isPending}
                                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRemoveMember}
                                disabled={removeMemberMutation.isPending}
                                className="flex-1 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {removeMemberMutation.isPending ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                        Removing...
                                    </>
                                ) : (
                                    <>
                                        <UserX className="w-4 h-4" />
                                        Remove Member
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
