"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { X, Heart, MessageCircle, Share2, MapPin, Send, MoreHorizontal } from "lucide-react";
import { Post } from "@/data/mockFeedData";
import { useEffect, useState } from "react";

interface PostDetailModalProps {
    post: Post | null;
}

export default function PostDetailModal({ post }: PostDetailModalProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [commentText, setCommentText] = useState("");
    const isOpen = searchParams.get("modal") === "postdetailmodal";

    // Close modal when clicking outside or pressing Escape
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
                            <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <h3 className="font-bold text-gray-900 text-sm">{post.author.name}</h3>
                                {post.author.isOfficial && <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Official</span>}
                                {post.author.isBusiness && <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">Biz</span>}
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
                    {/* Left Side - Image */}
                    {post.images.length > 0 && (
                        <div className="md:flex-1 bg-black flex items-center justify-center relative">
                            <div className="relative w-full h-full">
                                <Image
                                    src={post.images[0]}
                                    alt="Post image"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    )}

                    {/* Right Side - Content & Comments */}
                    <div className={`flex flex-col ${post.images.length > 0 ? 'md:w-[420px]' : 'flex-1'} bg-white border-l border-gray-200`}>
                        {/* Post Content Section */}
                        <div className="flex-shrink-0 border-b border-gray-100 p-5">
                            {/* Post Title */}
                            {post.title && (
                                <h3 className="text-lg font-bold mb-2 text-gray-900">
                                    {post.title}
                                </h3>
                            )}

                            {/* Post Content */}
                            <p className="text-gray-800 text-base font-medium leading-relaxed whitespace-pre-line">
                                {post.content}
                            </p>
                        </div>

                        {/* Stats & Actions */}
                        <div className="flex-shrink-0 px-5 py-3 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                                <span>{post.stats.likes} likes</span>
                                <div className="flex gap-3">
                                    <span>{post.stats.comments} comments</span>
                                    <span>{post.stats.shares} shares</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-around py-1">
                                <button className={`flex items-center gap-2 text-sm font-semibold transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 ${post.isLiked ? 'text-pink-500' : 'text-gray-600'}`}>
                                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
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
                            <h4 className="font-bold text-gray-900 mb-4 text-sm">Comments ({post.comments.length})</h4>

                            {/* Comments List */}
                            <div className="space-y-4 mb-4">
                                {post.comments.length > 0 ? (
                                    post.comments.map((comment) => (
                                        <div key={comment.id} className="flex gap-2.5">
                                            <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0">
                                                <Image src={comment.user.avatar} alt={comment.user.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="bg-gray-100 rounded-2xl px-3.5 py-2.5">
                                                    <h5 className="font-bold text-gray-900 text-xs mb-0.5">{comment.user.name}</h5>
                                                    <p className="text-gray-700 text-sm leading-relaxed">{comment.text}</p>
                                                </div>
                                                <span className="text-xs text-gray-500 mt-1.5 inline-block px-3.5">{comment.time}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-400 text-sm">
                                        No comments yet. Be the first to comment!
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Comment Input - Fixed at Bottom */}
                        <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-white">
                            <div className="flex gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
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
