"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    MessageCircle,
    ChevronLeft,
    ChevronRight,
    ThumbsUp,
    Share2,
    AlertTriangle,
    PawPrint,
    Megaphone,
    Newspaper,
    Users,
    MoreHorizontal
} from "lucide-react";
import { FeedItemResponse } from "@/types/api/feed";

interface PostCardProps {
    post: FeedItemResponse;
}

// Helper to calculate relative time
const getRelativeTime = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "1 day ago";
    if (days < 7) return `${days} days ago`;
    return new Date(dateString).toLocaleDateString();
};

export default function PostCard({ post }: PostCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Touch swipe state
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    // Avatar fallback
    const userAvatar = post.authorProfilePicture ||
        `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(post.authorName)}`;

    const hasMultipleImages = post.imageUrls && post.imageUrls.length > 1;

    const goToPrevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? (post.imageUrls?.length || 1) - 1 : prev - 1
        );
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === (post.imageUrls?.length || 1) - 1 ? 0 : prev + 1
        );
    };

    // Touch handlers for swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const swipeDistance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                goToNextImage();
            } else {
                goToPrevImage();
            }
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    // Post type checks
    const isGroupPost = post.postType === "GROUP" && post.groupId && post.groupName;
    const isAlert = post.postType === "ALERT";
    const isLostFound = post.postType === "LOST_FOUND";
    const isNotice = post.postType === "NOTICE";
    const isNews = post.postType === "NEWS";
    const isGovernment = post.authorType === "GOVERNMENT";
    const isBusiness = post.authorType === "NON_GOVERNMENT";

    const groupAvatar = post.groupProfileImage ||
        `https://ui-avatars.com/api/?background=6366f1&color=fff&name=${encodeURIComponent(post.groupName || "G")}`;

    // Build location string
    const getLocationText = () => {
        if (post.visibilityLevel === "WADA" && post.wada) {
            return `Ward ${post.wada}`;
        }
        if (post.visibilityLevel === "PALIKA" && post.palika) {
            return post.palika;
        }
        if (post.visibilityLevel === "DISTRICT" && post.district) {
            return post.district;
        }
        return post.visibilityLevel;
    };

    return (
        <div className="bg-white border-b border-gray-100">
            {/* Post Type Badge */}
            {(isAlert || isLostFound || isNotice || isNews) && (
                <div className="px-4 pt-3 pb-1">
                    {isAlert && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 rounded-full">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wide">Critical Alert</span>
                        </div>
                    )}
                    {isLostFound && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 rounded-full">
                            <PawPrint className="w-3.5 h-3.5 text-orange-600" />
                            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wide">Lost & Found</span>
                        </div>
                    )}
                    {isNotice && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full">
                            <Megaphone className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-[11px] font-bold text-green-600 uppercase tracking-wide">Community Notice</span>
                        </div>
                    )}
                    {isNews && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 rounded-full">
                            <Newspaper className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">Local News</span>
                        </div>
                    )}
                </div>
            )}

            {/* Header */}
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
                                <span>{getLocationText()}</span>
                            </>
                        )}
                    </p>
                </div>

                {/* More Options */}
                <button className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Text Content */}
            {post.content && (
                <div className="px-4 pb-3">
                    <p className="text-gray-800 text-[15px] font-medium leading-[1.6] tracking-[0.01em] whitespace-pre-line">
                        {post.content}
                    </p>
                </div>
            )}

            {/* Image Carousel */}
            {post.imageUrls && post.imageUrls.length > 0 && (
                <div
                    className="relative aspect-square bg-gray-100 touch-pan-y"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <Image
                        src={post.imageUrls[currentImageIndex]}
                        alt={`Post image ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                    />

                    {/* Navigation Arrows */}
                    {hasMultipleImages && (
                        <>
                            <button
                                onClick={goToPrevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={goToNextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    {/* Dot Indicators */}
                    {hasMultipleImages && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                            {post.imageUrls.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex
                                        ? "bg-white w-2.5 h-2.5"
                                        : "bg-white/50 hover:bg-white/75"
                                        }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Image Counter Badge */}
                    {hasMultipleImages && (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded-full text-white text-xs font-medium">
                            {currentImageIndex + 1}/{post.imageUrls.length}
                        </div>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full font-medium transition-colors group">
                        <ThumbsUp className="w-4 h-4 text-gray-700 group-hover:text-blue-500" strokeWidth={2} />
                        <span className="text-sm text-gray-800">{post.likeCount}</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full font-medium transition-colors group">
                        <MessageCircle className="w-4 h-4 text-gray-700 group-hover:text-blue-500" strokeWidth={2} />
                        <span className="text-sm text-gray-800">{post.commentCount}</span>
                    </button>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full font-medium transition-colors group">
                    <Share2 className="w-4 h-4 text-gray-700 group-hover:text-green-500" strokeWidth={2} />
                    <span className="text-sm text-gray-800">{post.shareCount}</span>
                </button>
            </div>
        </div>
    );
}
