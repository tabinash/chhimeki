"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
    AlertTriangle,
    Megaphone,
    MoreHorizontal,
    Heart,
    MessageCircle,
    Share2,
} from "lucide-react";
import { FeedItemResponse } from "@/types/api/feed";
import VideoPlayer from "@/components/VideoPlayer";

interface PostCardProps {
    post: FeedItemResponse;
}

function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
}

export default function PostCard({ post }: PostCardProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Use flat structure from API
    const primaryImage = post.imageUrls?.[0] || null;
    const primaryVideo = post.videoUrl || null;

    const isAlert = post.postType === 'ALERT';
    const isOfficialNotice = post.authorType === 'GOVERNMENT' && post.postType !== 'ALERT';

    const handlePostClick = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("modal", "postdetailmodal");
        params.set("postId", post.postId.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    // Generate avatar if not available
    const authorAvatar = post.authorProfilePicture || `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(post.authorName)}`;

    return (
        <article
            className="rounded-2xl p-5 border-1 border-gray-300 bg-white transition-shadow hover:shadow-md cursor-pointer"
        // onClick={handlePostClick}
        >
            {/* Type Badge */}
            {isAlert && (
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-50">
                    <AlertTriangle className="w-4 h-4 text-red-600 fill-red-100" />
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Critical Alert</span>
                </div>
            )}

            {isOfficialNotice && (
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-50">
                    <Megaphone className="w-4 h-4 text-green-600 fill-green-100" />
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Official Notice</span>
                </div>
            )}

            {/* Group Badge */}
            {post.postType === 'GROUP' && post.groupName && (
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-50">
                    <div className="w-5 h-5 rounded-full overflow-hidden relative bg-blue-100">
                        {post.groupProfileImage ? (
                            <Image src={post.groupProfileImage} alt={post.groupName} fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full bg-blue-200" />
                        )}
                    </div>
                    <span className="text-xs font-bold text-blue-600">{post.groupName}</span>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden relative border border-gray-100">
                        <Image src={authorAvatar} alt={post.authorName} fill className="object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-gray-900 text-sm">{post.authorName}</h3>
                            {post.authorType === 'GOVERNMENT' && <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Official</span>}
                            {post.authorType === 'NON_GOVERNMENT' && <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Org</span>}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>{formatTimeAgo(post.createdAt)}</span>
                            {post.postType === 'GROUP' && post.groupName && (
                                <>
                                    <span>•</span>
                                    <span className="text-blue-600 font-medium">{post.groupName}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            {post.content && (
                <p className="text-gray-800 text-sm font-medium leading-relaxed mb-3 whitespace-pre-line">
                    {post.content}
                </p>
            )}

            {/* Images */}
            {primaryImage && (
                <div className="rounded-xl overflow-hidden mb-4 relative aspect-video border border-gray-100">
                    <Image src={primaryImage} alt="Post image" fill className="object-cover" />
                    {/* Image count badge if multiple images */}
                    {post.imageUrls && post.imageUrls.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-lg">
                            +{post.imageUrls.length - 1} more
                        </div>
                    )}
                </div>
            )}

            {/* Video - Using VideoPlayer component with HLS support */}
            {primaryVideo && !primaryImage && (
                <div className="mb-4">
                    <VideoPlayer
                        src={primaryVideo}
                        poster={post.videoThumbnail || undefined}
                        autoPlay={true}
                        className="border border-gray-100"
                    />
                </div>
            )}

            {/* Stats & Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div className="flex gap-6">
                    <button
                        className="flex items-center gap-1.5 text-sm font-medium transition-colors text-gray-500 hover:text-pink-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Heart className="w-5 h-5" />
                        <span>{post.likeCount}</span>
                    </button>
                    <button
                        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.commentCount}</span>
                    </button>
                    <button
                        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Share2 className="w-5 h-5" />
                        <span>{post.shareCount || 'Share'}</span>
                    </button>
                </div>
            </div>
        </article>
    );
}
