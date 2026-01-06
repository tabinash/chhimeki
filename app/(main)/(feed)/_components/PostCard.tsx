"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
    AlertTriangle,
    PawPrint,
    Megaphone,
    MapPin,
    MoreHorizontal,
    Heart,
    MessageCircle,
    Share2
} from "lucide-react";
import { Post } from "@/data/mockFeedData";

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isAlert = post.type === 'alert';
    const isLostFound = post.type === 'lost-found';
    const isNotice = post.type === 'notice';

    const handlePostClick = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("modal", "postdetailmodal");
        params.set("postId", post.id.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <article
            className="rounded-2xl p-5 shadow-sm border border-gray-100 bg-white transition-shadow hover:shadow-md cursor-pointer"
            onClick={handlePostClick}
        >
            {/* Type Badge */}
            {isAlert && (
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-50">
                    <AlertTriangle className="w-4 h-4 text-red-600 fill-red-100" />
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Critical Alert</span>
                </div>
            )}
            {isLostFound && (
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-50">
                    <PawPrint className="w-4 h-4 text-orange-600 fill-orange-100" />
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Lost & Found</span>
                </div>
            )}
            {isNotice && (
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-50">
                    <Megaphone className="w-4 h-4 text-green-600 fill-green-100" />
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Official Notice</span>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden relative border border-gray-100">
                        <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-gray-900 text-sm">{post.author.name}</h3>
                            {post.author.isOfficial && <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Official</span>}
                            {post.author.isBusiness && <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Biz</span>}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>{post.time}</span>
                            <span>•</span>
                            <div className="flex items-center gap-0.5">
                                <MapPin className="w-3 h-3" />
                                <span>{post.author.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Title */}
            {post.title && (
                <h4 className="text-base font-bold mb-2 text-gray-900">
                    {post.title}
                </h4>
            )}

            {/* Content */}
            <p className="text-gray-800 text-sm leading-relaxed mb-3 whitespace-pre-line">
                {post.content}
            </p>

            {/* Media */}
            {post.images.length > 0 && (
                <div className="rounded-xl overflow-hidden mb-4 relative aspect-video border border-gray-100">
                    <Image src={post.images[0]} alt="Post image" fill className="object-cover" />
                </div>
            )}

            {/* Stats & Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div className="flex gap-6">
                    <button
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${post.isLiked ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span>{post.stats.likes}</span>
                    </button>
                    <button
                        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.stats.comments}</span>
                    </button>
                    <button
                        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Share2 className="w-5 h-5" />
                        <span>{post.stats.shares}</span>
                    </button>
                </div>
                <div className="text-xs text-gray-400 font-medium">
                    Seen by {post.stats.shares * 12} neighbors
                </div>
            </div>
        </article>
    );
}
