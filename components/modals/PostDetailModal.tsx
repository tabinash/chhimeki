"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { X, Heart, MessageCircle, Share2, Send, MoreHorizontal } from "lucide-react";
import { FeedItemResponse } from "@/types/api/feed";
import { useEffect, useState } from "react";

interface PostDetailModalProps {
    post: FeedItemResponse | null;
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

function getYouTubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default function PostDetailModal({ post }: PostDetailModalProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [commentText, setCommentText] = useState("");
    const isOpen = searchParams.get("modal") === "postdetailmodal";

    // Close modal when pressing Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const closeModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("modal");
        params.delete("postId");
        router.push(`?${params.toString()}`, { scroll: false });
    };

    if (!isOpen || !post) return null;

    // Using flat FeedItemResponse structure
    const primaryImage = post.imageUrls?.[0] || null;
    const primaryVideo = post.videoUrl || null;
    const youTubeId = primaryVideo ? getYouTubeId(primaryVideo) : null;

    // Generate avatar if not available
    const authorAvatar = post.authorProfilePicture ||
        `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(post.authorName)}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            {/* Modal Container - Facebook Style: Image Left, Content Right */}
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with Author Info */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden relative border border-gray-100">
                            <Image src={authorAvatar} alt={post.authorName} fill className="object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <h3 className="font-bold text-gray-900 text-sm">{post.authorName}</h3>
                                {post.authorType === 'GOVERNMENT' && (
                                    <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Official</span>
                                )}
                                {post.authorType === 'NON_GOVERNMENT' && (
                                    <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Org</span>
                                )}
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
                    <div className="flex items-center gap-1">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <MoreHorizontal className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                            onClick={closeModal}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Content Area - Split Layout */}
                <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                    {/* Left Side - Image or Video */}
                    {(primaryImage || primaryVideo) && (
                        <div className="md:flex-1 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-0">
                            <div className="relative w-full h-full flex items-center justify-center">
                                {primaryVideo ? (
                                    youTubeId ? (
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    ) : (
                                        <video
                                            src={primaryVideo}
                                            controls
                                            className="max-h-full max-w-full"
                                            poster={post.videoThumbnail || undefined}
                                            autoPlay
                                        />
                                    )
                                ) : (
                                    <Image
                                        src={primaryImage!}
                                        alt="Post image"
                                        fill
                                        className="object-contain"
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Right Side - Content & Comments */}
                    <div className={`flex flex-col ${(primaryImage || primaryVideo) ? 'md:w-[420px]' : 'flex-1'} bg-white border-l border-gray-200`}>
                        {/* Post Content Section */}
                        <div className="flex-shrink-0 border-b border-gray-100 p-5">
                            <p className="text-gray-800 text-sm font-medium leading-relaxed whitespace-pre-line">
                                {post.content}
                            </p>
                        </div>

                        {/* Stats & Actions */}
                        <div className="flex-shrink-0 px-5 py-3 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                                <span>{post.likeCount} likes</span>
                                <div className="flex gap-3">
                                    <span>{post.commentCount} comments</span>
                                    <span>{post.shareCount} shares</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-around py-1">
                                <button className="flex items-center gap-2 text-gray-600 text-sm font-semibold transition-colors py-2 px-3 rounded-lg hover:bg-gray-50">
                                    <Heart className="w-5 h-5" />
                                    <span>Like</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 text-sm font-semibold transition-colors py-2 px-3 rounded-lg hover:bg-gray-50">
                                    <MessageCircle className="w-5 h-5" />
                                    <span>Comment</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 text-sm font-semibold transition-colors py-2 px-3 rounded-lg hover:bg-gray-50">
                                    <Share2 className="w-5 h-5" />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>

                        {/* Comments Section - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-5">
                            <h4 className="font-bold text-gray-900 mb-4 text-sm">Comments ({post.commentCount})</h4>
                            <div className="space-y-4 mb-4">
                                <div className="text-center py-12 text-gray-400 text-sm">
                                    No comments yet. Be the first to comment!
                                </div>
                            </div>
                        </div>

                        {/* Comment Input - Fixed at Bottom */}
                        <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-white">
                            <div className="flex gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                    A
                                </div>
                                <div className="flex-1 flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className="flex-1 px-4 py-2 bg-gray-100 border-0 rounded-full text-sm focus:outline-none focus:bg-gray-200 transition-colors"
                                    />
                                    <button
                                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                        disabled={!commentText.trim()}
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop - Click to close */}
            <div
                className="absolute inset-0 -z-10"
                onClick={closeModal}
            />
        </div>
    );
}
