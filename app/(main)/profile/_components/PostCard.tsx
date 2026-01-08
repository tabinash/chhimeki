"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    AlertTriangle,
    Megaphone,
    MapPin,
    MoreHorizontal,
    Heart,
    MessageCircle,
    Share2
} from "lucide-react";
import { PostResponse } from "@/types/api/post";
import { AvatarWithFallback } from "@/components/shared-component/AvatarWithFallback";

interface PostCardProps {
    post: PostResponse;
}

export default function PostCard({ post }: PostCardProps) {
    const router = useRouter();

    const isAlert = post.postType === "ALERT";
    const isGroup = post.postType === "GROUP";

    // Format relative time from createdAt
    const getRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <article
            className="bg-white p-4 cursor-pointer transition-colors active:bg-gray-50"
            onClick={() => router.push(`/post/${post.id}?bottomNav=false`)}
        >
            {/* Type Badge */}
            {isAlert && (
                <div className="flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">Alert</span>
                </div>
            )}
            {isGroup && post.groupName && (
                <div className="flex items-center gap-1.5 mb-2">
                    <Megaphone className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">{post.groupName}</span>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
                <AvatarWithFallback
                    src={post.authorProfilePicture}
                    name={post.authorName}
                    size={40}
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-gray-900 text-sm truncate">{post.authorName}</h4>
                        {post.authorUserType === "GOVERNMENT_OFFICE" && (
                            <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Official</span>
                        )}
                        {post.authorUserType === "BUSINESS" && (
                            <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Biz</span>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        {getRelativeTime(post.createdAt)} • <MapPin className="w-3 h-3" /> {post.palika}
                    </p>
                </div>
                <button
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Menu logic
                    }}
                >
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            {post.content && (
                <p className="text-gray-800 font-[500] leading-relaxed mb-3 whitespace-pre-line">
                    {post.content}
                </p>
            )}

            {/* Image */}
            {post.imageUrls && post.imageUrls.length > 0 && (
                <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-3">
                    <Image src={post.imageUrls[0]} alt="Post image" fill className="object-cover" />
                    {post.imageUrls.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full font-bold">
                            +{post.imageUrls.length - 1}
                        </div>
                    )}
                </div>
            )}

            {/* Video */}
            {post.videoUrl && post.videoThumbnail && (
                <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-3">
                    <Image src={post.videoThumbnail} alt="Video thumbnail" fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent ml-1" />
                        </div>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 pt-1">
                <button
                    className={`flex items-center gap-2 transition-colors ${post.isLikedByCurrentUser ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        // Like logic
                    }}
                >
                    <Heart className={`w-5 h-5 ${post.isLikedByCurrentUser ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{post.likeCount}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.commentCount}</span>
                </button>
                <button
                    className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Share logic
                    }}
                >
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.shareCount}</span>
                </button>
            </div>
        </article>
    );
}
