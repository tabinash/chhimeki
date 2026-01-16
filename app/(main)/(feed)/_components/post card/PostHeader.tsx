"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, MoreHorizontal } from "lucide-react";
import { FeedItemResponse } from "@/types/api/feed";
import { getRelativeTime, getAvatarUrl, getLocationText } from "./utils";

interface PostHeaderProps {
    post: FeedItemResponse;
}

export default function PostHeader({ post }: PostHeaderProps) {
    const isGroupPost = post.postType === "GROUP" && post.groupId && post.groupName;
    const isGovernment = post.authorType === "GOVERNMENT";
    const isBusiness = post.authorType === "NON_GOVERNMENT";

    const userAvatar = getAvatarUrl(post.authorProfilePicture, post.authorName);
    const groupAvatar = getAvatarUrl(post.groupProfileImage, post.groupName || "G", "6366f1");

    return (
        <div className="p-4 flex items-center gap-3">
            {/* Avatar Section - Dual for group posts */}
            {isGroupPost ? (
                <div className="relative flex-shrink-0">
                    {/* User Avatar (main) */}
                    <Link href={`/profile/${post.authorId}`} className="w-11 h-11 rounded-full overflow-hidden relative block">
                        <Image
                            src={userAvatar}
                            alt={post.authorName}
                            fill
                            className="object-cover"
                        />
                    </Link>
                    {/* Group Avatar (overlapping badge) */}
                    <Link
                        href={`/groups/${post.groupId}`}
                        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full overflow-hidden border-2 border-white shadow-sm"
                    >
                        <Image
                            src={groupAvatar}
                            alt={post.groupName || "Group"}
                            fill
                            className="object-cover"
                        />
                    </Link>
                </div>
            ) : (
                <Link href={`/profile/${post.authorId}`} className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image
                        src={userAvatar}
                        alt={post.authorName}
                        fill
                        className="object-cover"
                    />
                </Link>
            )}

            {/* Text Section */}
            <div className="flex-1 min-w-0">
                {isGroupPost ? (
                    <h4 className="font-bold text-gray-900 text-[15px] truncate">
                        <Link href={`/profile/${post.authorId}`} className="hover:underline">
                            {post.authorName}
                        </Link>
                        <span className="font-normal text-gray-500"> in </span>
                        <Link href={`/groups/${post.groupId}`} className="hover:underline text-indigo-600">
                            {post.groupName}
                        </Link>
                    </h4>
                ) : (
                    <div className="flex items-center gap-1.5">
                        <Link href={`/profile/${post.authorId}`}>
                            <h4 className="font-bold text-gray-900 text-[15px] truncate hover:underline">{post.authorName}</h4>
                        </Link>
                        {isGovernment && (
                            <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Official</span>
                        )}
                        {isBusiness && (
                            <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Biz</span>
                        )}
                    </div>
                )}
                <p className="text-[13px] text-gray-500 flex items-center gap-1">
                    {getRelativeTime(post.createdAt)}
                    {post.visibilityLevel && (
                        <>
                            <span>•</span>
                            <MapPin className="w-3 h-3" />
                            <span>{getLocationText(post)}</span>
                        </>
                    )}
                </p>
            </div>

            {/* More Options */}
            <button className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                <MoreHorizontal className="w-5 h-5" />
            </button>
        </div>
    );
}
