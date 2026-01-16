"use client";

import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";

interface PostActionsProps {
    likeCount: number;
    commentCount: number;
    shareCount: number;
}

export default function PostActions({ likeCount, commentCount, shareCount }: PostActionsProps) {
    return (
        <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full font-medium transition-colors group">
                    <ThumbsUp className="w-4 h-4 text-gray-700 group-hover:text-blue-500" strokeWidth={2} />
                    <span className="text-sm text-gray-800">{likeCount}</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full font-medium transition-colors group">
                    <MessageCircle className="w-4 h-4 text-gray-700 group-hover:text-blue-500" strokeWidth={2} />
                    <span className="text-sm text-gray-800">{commentCount}</span>
                </button>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full font-medium transition-colors group">
                <Share2 className="w-4 h-4 text-gray-700 group-hover:text-green-500" strokeWidth={2} />
                <span className="text-sm text-gray-800">{shareCount}</span>
            </button>
        </div>
    );
}
