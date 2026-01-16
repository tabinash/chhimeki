"use client";

import { use, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    FileText,
    Users,
    Calendar,
    ShieldCheck,
    Image as ImageIcon,
    Edit3,
    Loader2,
    UserX,
    X,
} from "lucide-react";
import { useGetGroupById, useGetGroupFeed, useGetGroupMembers, useRemoveMember } from "../_hook";
import PostCard from "../_components/PostCard";

import { FeedItemResponse, GroupMemberResponse } from "@/types/api/group";
import CreatePostWidget from "../_components/CreatePostWidget";

interface GroupDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

// Simple Loading Shimmer
const LoadingShimmer = () => (
    <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Loading...</p>
        </div>
    </div>
);

export default function GroupDetailPage({ params }: GroupDetailPageProps) {
    const { id } = use(params);
    const searchParams = useSearchParams();
    const groupId = parseInt(id, 10);
    const activeTab = searchParams.get("tab") || "posts";

    // State for remove member modal
    const [memberToRemove, setMemberToRemove] = useState<{ userId: number; name: string } | null>(null);

    // Fetch group data (cached from layout, so no extra API call)
    const { data: groupData, isLoading: isLoadingGroup } = useGetGroupById(groupId);
    const group = groupData?.data;

    // Check if group data has loaded
    const isGroupLoaded = !isLoadingGroup && !!group;

    // Fetch group feed - only when on posts or media tab
    const shouldLoadFeed = activeTab === "posts" || activeTab === "media";
    const { data: feedData, isLoading: isLoadingFeed } = useGetGroupFeed(
        shouldLoadFeed ? groupId : null,
        { page: 0, size: 20 }
    );
    console.log("feed data", feedData?.data)

    const posts: FeedItemResponse[] = feedData?.data || [];

    // Fetch group members - only when on members tab
    const shouldLoadMembers = activeTab === "members";
    const { data: membersData, isLoading: isLoadingMembers } = useGetGroupMembers(
        shouldLoadMembers ? groupId : null,
        { page: 0, size: 50 }
    );
    const members: GroupMemberResponse[] = membersData?.data || [];

    // Remove member mutation
    const removeMemberMutation = useRemoveMember();

    // Get membership status from actual API data (only valid after group loads)
    const isMember = group?.isMember ?? false;
    const isAdmin = group?.isAdmin ?? false;

    // Handle remove member
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

    // Extract media from posts for Media tab
    const mediaItems = posts.filter(post =>
        (post.imageUrls && post.imageUrls.length > 0) || post.videoUrl
    );

    return (
        <>
            <div className="pb-24">
                {/* Posts Tab */}
                {activeTab === "posts" && (
                    <div className="divide-y space-y-3 mt-1 divide-gray-100">
                        {/* Create Post Widget (only for members) */}
                        {isMember && (
                            <CreatePostWidget groupId={groupId} />
                        )}

                        {/* Non-member notice (only show after group data is loaded) */}
                        {isGroupLoaded && !isMember && (
                            <div className="text-center py-12 bg-gray-50">
                                <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                <h3 className="font-bold text-gray-900">Join to see posts</h3>
                                <p className="text-gray-500 text-sm mt-1">You need to be a member to view this group&apos;s feed</p>
                            </div>
                        )}

                        {/* Loading State */}
                        {(isLoadingGroup || (isMember && isLoadingFeed)) && (
                            <LoadingShimmer />
                        )}

                        {/* Posts List */}
                        {isMember && !isLoadingFeed && posts.length > 0 && (
                            posts.map((post) => (
                                <PostCard key={post.postId} post={post} groupId={groupId} />
                            ))
                        )}

                        {/* Empty State */}
                        {isMember && !isLoadingFeed && posts.length === 0 && (
                            <div className="text-center py-12">
                                <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                <h3 className="font-bold text-gray-900">No posts yet</h3>
                                <p className="text-gray-500 text-sm mt-1">Be the first to post in this group</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Members Tab */}
                {activeTab === "members" && (
                    <div className="p-4 space-y-3">
                        {/* Non-member notice (only show after group data is loaded) */}
                        {isGroupLoaded && !isMember && (
                            <div className="text-center py-12 bg-gray-50 rounded-2xl">
                                <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                <h3 className="font-bold text-gray-900">Join to see members</h3>
                                <p className="text-gray-500 text-sm mt-1">You need to be a member to view the member list</p>
                            </div>
                        )}

                        {/* Loading State */}
                        {(isLoadingGroup || (isMember && isLoadingMembers)) && (
                            <LoadingShimmer />
                        )}

                        {/* Members List */}
                        {isMember && !isLoadingMembers && members.length > 0 && (
                            <>
                                {/* Admins Section */}
                                <div className="mb-4">
                                    <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-3">
                                        Admins
                                    </h3>
                                    {members
                                        .filter((m) => m.role === "ADMIN")
                                        .map((member) => (
                                            <div
                                                key={member.userId}
                                                className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border border-gray-100 mb-2"
                                            >
                                                <Link href={`/profile/${member.userId}`} className="w-12 h-12 rounded-full overflow-hidden relative ring-2 ring-orange-400 flex-shrink-0">
                                                    {member.profilePicture ? (
                                                        <Image
                                                            src={member.profilePicture}
                                                            alt={member.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                                                    )}
                                                </Link>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <Link href={`/profile/${member.userId}`} className="font-bold text-[15px] text-gray-900 truncate">{member.name}</Link>
                                                        <ShieldCheck className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                                    </div>
                                                    <p className="text-[13px] text-orange-600 font-medium">Admin</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                {/* Members Section */}
                                <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-3">
                                    Members ({members.filter((m: any) => m.role === "MEMBER").length})
                                </h3>
                                {members
                                    .filter((m: any) => m.role === "MEMBER")
                                    .map((member: any) => (
                                        <div
                                            key={member.userId}
                                            className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border border-gray-100 mb-2"
                                        >
                                            <Link href={`/profile/${member.userId}`} className="w-12 h-12 rounded-full overflow-hidden relative bg-gray-200 flex-shrink-0">
                                                {member.profilePicture ? (
                                                    <Image
                                                        src={member.profilePicture}
                                                        alt={member.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                                                )}
                                            </Link>
                                            <div className="flex-1 min-w-0">
                                                <Link href={`/profile/${member.userId}`} className="font-bold text-[15px] text-gray-900 truncate block">{member.name}</Link>
                                                <p className="text-[13px] text-gray-500">
                                                    Joined {new Date(member.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                                </p>
                                            </div>
                                            {/* Remove button (admin only, can't remove self) */}
                                            {isAdmin && (
                                                <button
                                                    onClick={() => setMemberToRemove({ userId: member.userId, name: member.name })}
                                                    className="px-4 py-2 bg-red-600 text-white hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                    title="Remove member"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                            </>
                        )}

                        {/* Empty State */}
                        {isMember && !isLoadingMembers && members.length === 0 && (
                            <div className="text-center py-12">
                                <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                <h3 className="font-bold text-gray-900">No members yet</h3>
                            </div>
                        )}
                    </div>
                )}

                {/* About Tab */}
                {activeTab === "about" && group && (
                    <div className="p-4 space-y-4">
                        {/* Description */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-2">About this group</h3>
                            <p className="text-[15px] text-gray-700 leading-relaxed">
                                {group.description || "No description provided."}
                            </p>
                        </div>

                        {/* Group Info */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-3">Group Info</h3>

                            <div className="space-y-4">
                                {/* Created Date */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">
                                            Created
                                        </p>
                                        <p className="font-medium text-gray-900 text-sm">
                                            {new Date(group.createdAt).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Member Count */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <Users className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">
                                            Members
                                        </p>
                                        <p className="font-medium text-gray-900 text-sm">
                                            {group.memberCount.toLocaleString()} members
                                        </p>
                                    </div>
                                </div>

                                {/* Last Updated */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">
                                            Last Updated
                                        </p>
                                        <p className="font-medium text-gray-900 text-sm">
                                            {new Date(group.updatedAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Admin */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-3">Admin</h3>
                            <Link
                                href={`/profile/${group.admin.id}`}
                                className="flex items-center gap-3"
                            >
                                <div className="w-12 h-12 rounded-full overflow-hidden relative ring-2 ring-orange-400">
                                    {group.admin.profilePicture ? (
                                        <Image
                                            src={group.admin.profilePicture}
                                            alt={group.admin.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-[15px] text-gray-900">{group.admin.name}</p>
                                        <ShieldCheck className="w-4 h-4 text-orange-500" />
                                    </div>
                                    <p className="text-[13px] text-gray-500">Group Admin</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Media Tab */}
                {activeTab === "media" && (
                    <div className="p-4">
                        {/* Non-member notice (only show after group data is loaded) */}
                        {isGroupLoaded && !isMember && (
                            <div className="text-center py-12 bg-gray-50 rounded-2xl">
                                <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                <h3 className="font-bold text-gray-900">Join to see media</h3>
                                <p className="text-gray-500 text-sm mt-1">You need to be a member to view media</p>
                            </div>
                        )}

                        {/* Loading State */}
                        {(isLoadingGroup || (isMember && isLoadingFeed)) && (
                            <LoadingShimmer />
                        )}

                        {/* Media Grid */}
                        {isMember && !isLoadingFeed && mediaItems.length > 0 && (
                            <div className="grid grid-cols-3 gap-1">
                                {mediaItems.map((post) => (
                                    post.imageUrls && post.imageUrls.map((url, idx) => (
                                        <div key={`${post.postId}-${idx}`} className="aspect-square relative rounded-lg overflow-hidden">
                                            <Image
                                                src={url}
                                                alt="Media"
                                                fill
                                                className="object-cover hover:scale-105 transition-transform"
                                            />
                                        </div>
                                    ))
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {isMember && !isLoadingFeed && mediaItems.length === 0 && (
                            <div className="text-center py-12">
                                <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                <h3 className="font-bold text-gray-900">No media yet</h3>
                                <p className="text-gray-500 text-sm mt-1">Photos and videos shared in this group will appear here</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Remove Member Confirmation Modal */}
            {memberToRemove && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-red-600">Remove Member</h2>
                            <button
                                onClick={() => setMemberToRemove(null)}
                                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                                disabled={removeMemberMutation.isPending}
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="mb-5">
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <UserX className="w-7 h-7 text-red-600" />
                            </div>
                            <p className="text-gray-800 text-center text-sm mb-1">
                                Are you sure you want to remove <span className="font-bold">{memberToRemove.name}</span> from this group?
                            </p>
                            <p className="text-xs text-gray-500 text-center">
                                They will no longer have access to group posts and content.
                            </p>
                        </div>

                        <div className="flex gap-2">
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
                                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {removeMemberMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Removing...
                                    </>
                                ) : (
                                    <>
                                        <UserX className="w-4 h-4" />
                                        Remove
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
