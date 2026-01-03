"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MessageCircle, Heart, Share2, MapPin, MoreHorizontal, Send } from "lucide-react";
import Image from "next/image";
import { posts } from "@/data/mockFeedData";
import { currentUser } from "@/data/mockChatData";

// This helps handle the dynamic route params in a client component or server component correctly
export default function PostDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const post = posts.find((p) => p.id === Number(id));

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <p className="text-gray-500 mb-4">Post not found</p>
                <button
                    onClick={() => router.back()}
                    className="text-blue-600 font-bold hover:underline"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Custom Header (Author Info) */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-900" />
                    </button>

                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full overflow-hidden relative border border-gray-100">
                            <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-1.5 leading-none mb-1">
                                <h4 className="font-bold text-gray-900 text-sm truncate">{post.author.name}</h4>
                                {post.author.isOfficial && <span className="bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 rounded-full font-bold">Official</span>}
                                {post.author.isBusiness && <span className="bg-purple-100 text-purple-700 text-[9px] px-1.5 py-0.5 rounded-full font-bold">Biz</span>}
                            </div>
                            <p className="text-[11px] text-gray-500 flex items-center gap-1 leading-none">
                                {post.time} • {post.author.location}
                            </p>
                        </div>
                    </div>
                </div>

                <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <main className="pb-24">
                <article className="p-4">
                    {/* Content */}
                    {post.title && (
                        <h2 className="font-bold text-gray-900 text-xl mb-3 leading-tight">{post.title}</h2>
                    )}

                    <p className="text-gray-800 text-base leading-relaxed mb-4 whitespace-pre-line">
                        {post.content}
                    </p>

                    {/* Images */}
                    {post.images.length > 0 && (
                        <div className="space-y-3 mb-6">
                            {post.images.map((img, idx) => (
                                <div key={idx} className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                                    <Image src={img} alt={`Post image ${idx + 1}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Stats & Actions */}
                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button className={`flex items-center gap-2 transition-colors ${post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}>
                                <Heart className={`w-6 h-6 ${post.isLiked ? 'fill-current' : ''}`} />
                                <span className="text-sm font-medium">{post.stats.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                                <MessageCircle className="w-6 h-6" />
                                <span className="text-sm font-medium">{post.stats.comments}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                                <Share2 className="w-6 h-6" />
                                <span className="text-sm font-medium">{post.stats.shares}</span>
                            </button>
                        </div>
                    </div>
                </article>

                {/* Linear Comments Section */}
                <div className="border-t border-gray-100 mt-2 bg-gray-50/50 min-h-[200px]">
                    <div className="p-4 pb-2">
                        <h3 className="text-sm font-bold text-gray-900">Comments <span className="text-gray-500 font-normal">({post.comments.length})</span></h3>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {post.comments && post.comments.length > 0 ? (
                            post.comments.map((comment: any) => (
                                <div key={comment.id} className="p-4 bg-white flex gap-3">
                                    <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0 bg-gray-200">
                                        <Image src={comment.user.avatar} alt={comment.user.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="text-xs font-bold text-gray-900">{comment.user.name}</h4>
                                            <span className="text-[10px] text-gray-400">{comment.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-400 py-12">
                                <MessageCircle className="w-8 h-8 mx-auto text-gray-300 mb-2 opacity-50" />
                                <p className="text-xs font-medium">No comments yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Fixed Comment Input */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 px-4 flex items-end gap-3 pb-safe-area shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
                <div className="w-9 h-9 rounded-full overflow-hidden relative flex-shrink-0 border border-gray-200 shadow-sm mb-1">
                    <Image src={currentUser.avatar} alt="You" fill className="object-cover" />
                </div>
                <div className="flex-1 bg-gray-50 rounded-[20px] flex items-center px-4 py-2.5 min-h-[44px] border border-gray-200 shadow-inner focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-200 transition-all">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-gray-400 font-medium text-gray-700"
                    />
                    <button className="ml-2 text-blue-600 p-1.5 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50">
                        <Send className="w-4 h-4 fill-current" />
                    </button>
                </div>
            </div>
        </div>
    );
}
