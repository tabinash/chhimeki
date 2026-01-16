"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle, ChevronLeft, ChevronRight, Trash2, X, Loader2, Trash, ThumbsUp } from "lucide-react";
import { PostResponse } from "@/types/api/post";
import { useUser } from "@/hooks/useUser";
import { useDeletePost } from "../_hook";

interface PostCardProps {
    post: PostResponse;
}

// Helper to calculate days ago
const getDaysAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
};

export default function PostCard({ post }: PostCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Touch swipe state
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const { user } = useUser();
    const deletePostMutation = useDeletePost();

    const isAuthor = user?.id === post.authorId;

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

    const handleDelete = () => {
        deletePostMutation.mutate(
            post.id,
            {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setShowMenu(false);
                },
                onError: (error) => {
                    alert(`Failed to delete post: ${error.message}`);
                },
            }
        );
    };

    const isGroupPost = post.postType === "GROUP" && post.groupId && post.groupName;

    const groupAvatar = post.groupProfileImage ||
        `https://ui-avatars.com/api/?background=6366f1&color=fff&name=${encodeURIComponent(post.groupName || "G")}`;

    return (
        <>
            <div className="bg-white border-b border-gray-100">
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
                            <>
                                <h4 className="font-bold text-gray-900 text-[15px] truncate">
                                    <Link href={`/profile/${post.authorId}`} className="hover:underline">
                                        {post.authorName}
                                    </Link>
                                    <span className="font-normal text-gray-500"> in </span>
                                    <Link href={`/groups/${post.groupId}`} className="hover:underline">
                                        {post.groupName}
                                    </Link>
                                </h4>
                            </>
                        ) : (
                            <Link href={`/profile/${post.authorId}`}>
                                <h4 className="font-bold text-gray-900 text-[17px] truncate">{post.authorName}</h4>
                            </Link>
                        )}
                        <p className="text-[13px] text-gray-500 flex items-center gap-1">
                            {getDaysAgo(post.createdAt)}
                            {post.visibilityLevel && (
                                <>
                                    <span>•</span>
                                    <MapPin className="w-3 h-3" />
                                    <span>{post.visibilityLevel}</span>
                                </>
                            )}
                        </p>
                    </div>

                    {/* Delete Button (only for author) */}
                    {isAuthor && (
                        <div className="relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="text-red-600 hover:text-red-400 p-2 bg-[#e4e1dd] rounded-full"
                            >
                                <Trash className="w-5 h-5" />
                            </button>

                            {/* Dropdown Menu */}
                            {showMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowMenu(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden">
                                        <button
                                            onClick={() => {
                                                setShowMenu(false);
                                                setShowDeleteModal(true);
                                            }}
                                            className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete Post
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Text Content */}
                {post.content && (
                    <div className="px-4 pb-3">
                        <p className="text-gray-800 text-[16px] font-medium leading-[1.6] tracking-[0.01em]">
                            {post.content}
                        </p>
                    </div>
                )}

                {/* Image Carousel */}
                {post.imageUrls && post.imageUrls.length > 0 && (
                    <div
                        className="relative aspect-[5/5] bg-gray-100 touch-pan-y"
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

                {/* Video */}
                {post.videoUrl && (
                    <div className="relative aspect-[5/5] bg-black">
                        <video
                            src={post.videoUrl}
                            poster={post.videoThumbnail || undefined}
                            controls
                            className="w-full h-full object-contain"
                        />
                    </div>
                )}

                {/* Actions */}
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button className={`flex items-center gap-2 px-3 py-1 text-[18px] bg-[#e4e1dd] rounded-full font-medium transition-colors group ${post.isLikedByCurrentUser
                            ? "text-blue-500"
                            : "text-gray-900 hover:text-blue-500"
                            }`}>
                            <ThumbsUp className={`w-4 h-4 ${post.isLikedByCurrentUser ? "fill-white bg-blue-500 rounded-full p-1" : "group-hover:fill-current"}`} strokeWidth={2} />
                            <span className="text-black">{post.likeCount}</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1 bg-[#e4e1dd] rounded-full text-gray-900 hover:text-blue-500 text-[18px] font-medium transition-colors">
                            <MessageCircle className="w-4 h-4" strokeWidth={2} />
                            <span>{post.commentCount}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-red-600">Delete Post</h2>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                                disabled={deletePostMutation.isPending}
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="mb-5">
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Trash2 className="w-7 h-7 text-red-600" />
                            </div>
                            <p className="text-gray-800 text-center text-sm mb-1">
                                Are you sure you want to delete this post?
                            </p>
                            <p className="text-xs text-gray-500 text-center">
                                This action cannot be undone.
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                disabled={deletePostMutation.isPending}
                                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deletePostMutation.isPending}
                                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {deletePostMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Delete
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
