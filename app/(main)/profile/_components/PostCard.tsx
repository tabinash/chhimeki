"use client";

import React from "react";
import { useRouter } from "next/navigation";
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

interface PostCardProps {
    post: any;
}

export default function PostCard({ post }: PostCardProps) {
    const router = useRouter();

    const isAlert = post.type === 'alert';
    const isLostFound = post.type === 'lost-found';
    const isNotice = post.type === 'notice';

    return (
        <article
            className="bg-white p-4 cursor-pointer transition-colors active:bg-gray-50"
            onClick={() => router.push(`/post/${post.id}?bottomNav=false`)}
        >
            {/* Type Badge */}
            {isAlert && (
                <div className="flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">Critical Alert</span>
                </div>
            )}
            {isLostFound && (
                <div className="flex items-center gap-1.5 mb-2">
                    <PawPrint className="w-3.5 h-3.5 text-orange-600" />
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wide">Lost & Found</span>
                </div>
            )}
            {isNotice && (
                <div className="flex items-center gap-1.5 mb-2">
                    <Megaphone className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">Official Notice</span>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-gray-900 text-sm truncate">{post.author.name}</h4>
                        {post.author.isOfficial && <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Official</span>}
                        {post.author.isBusiness && <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Biz</span>}
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        {post.time} • <MapPin className="w-3 h-3" /> {post.author.location}
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

            {/* Title */}
            {post.title && (
                <h3 className="font-bold text-gray-900 text-base mb-2">{post.title}</h3>
            )}

            {/* Content */}
            <p className="text-gray-800 font-[500] leading-relaxed mb-3 whitespace-pre-line">
                {post.content}
            </p>

            {/* Image */}
            {post.images.length > 0 && (
                <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-3">
                    <Image src={post.images[0]} alt="Post image" fill className="object-cover" />
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 pt-1">
                <button
                    className={`flex items-center gap-2 transition-colors ${post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        // Like logic
                    }}
                >
                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{post.stats.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.stats.comments}</span>
                </button>
                <button
                    className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Share logic
                    }}
                >
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.stats.shares}</span>
                </button>
            </div>
        </article>
    );
}
