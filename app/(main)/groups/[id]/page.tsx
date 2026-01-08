"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useGetGroupById, useGetGroupFeed, useGetGroupMembers } from "../_hook";
import GroupLeftSidebar from "./_components/GroupLeftSidebar";
import PostCard from "../_components/PostCard";
import CreatePostWidget from "../_components/CreatePostWidget";
import { MessageSquare, Users as UsersIcon, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function GroupDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const groupId = Number(params.id);
    const activeTab = searchParams.get("tab") || "feed";

    // Fetch group details (also fetched in layout, but cached by React Query)
    const { data: groupData } = useGetGroupById(groupId);

    // Fetch group feed
    const { data: feedData, isLoading: isLoadingFeed } = useGetGroupFeed(groupId, { page: 0, size: 20 });

    // Fetch group members
    const { data: membersData, isLoading: isLoadingMembers } = useGetGroupMembers(groupId, { page: 0, size: 20 });

    const group = groupData?.data;

    if (!group) return null;

    const isMember = group.isMember;

    // Helper to calculate days ago
    const getDaysAgo = (dateString: string) => {
        const diff = Date.now() - new Date(dateString).getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24));
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
                        ) : feedData?.data.data && feedData.data.data.length > 0 ? (
                            feedData.data.data.map((post) => (
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
                                            {member.role === "ADMIN" && (
                                                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-md">
                                                    Admin
                                                </span>
                                            )}
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

                {/* About Tab */}
                {activeTab === "about" && (
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">About This Group</h3>

                        {group.description ? (
                            <p className="text-gray-700 leading-relaxed mb-6">{group.description}</p>
                        ) : (
                            <p className="text-gray-400 italic mb-6">No description provided</p>
                        )}

                        <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Created</span>
                                <span className="font-semibold text-gray-900">
                                    {new Date(group.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Total Members</span>
                                <span className="font-semibold text-gray-900">{group.memberCount}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Created By</span>
                                <span className="font-semibold text-gray-900">{group.admin.name}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
