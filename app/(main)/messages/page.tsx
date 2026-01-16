"use client";

import { useState } from "react";
import { Search, Loader2, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAllConversations } from "./_hook";
import { ConversationResponseDTO } from "@/types/api/message";

// Helper to format relative time
const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
};

export default function MessagesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch conversations from API
    const { data: conversationsData, isLoading, error } = useAllConversations();
    const conversations: ConversationResponseDTO[] = conversationsData?.data || [];

    // Filter conversations based on search
    const filteredConversations = conversations.filter(conv =>
        conv.otherUsername.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Count total unread conversations
    const unreadConversationsCount = conversations.filter(c => c.unreadCount > 0).length;

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                    {unreadConversationsCount > 0 && (
                        <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                            {unreadConversationsCount}
                        </span>
                    )}
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" strokeWidth={2} />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center py-16">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        <p className="text-gray-500 text-sm">Loading conversations...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="text-center py-12">
                    <p className="text-red-500">Failed to load conversations</p>
                    <p className="text-gray-500 text-sm mt-1">{error.message}</p>
                </div>
            )}

            {/* Conversation List */}
            {!isLoading && !error && (
                <div className="divide-y divide-gray-100">
                    {filteredConversations.map((conversation) => {
                        const avatar = conversation.profilePicture ||
                            `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(conversation.otherUsername)}`;

                        return (
                            <Link
                                key={conversation.otherUserId}
                                href={`/messages/${conversation.otherUserId}?bottomNav=false`}
                                className="flex items-start gap-3 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                            >
                                {/* Avatar - Link to profile */}
                                <Link
                                    href={`/profile/${conversation.otherUserId}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="relative flex-shrink-0"
                                >
                                    <div className="w-14 h-14 rounded-full overflow-hidden relative">
                                        <Image
                                            src={avatar}
                                            alt={conversation.otherUsername}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </Link>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className={`font-semibold text-sm truncate ${conversation.unreadCount > 0 ? "text-gray-900" : "text-gray-700"
                                            }`}>
                                            {conversation.otherUsername}
                                        </h3>
                                        <span className={`text-xs flex-shrink-0 ml-2 font-medium ${conversation.unreadCount > 0 ? "text-blue-600" : "text-gray-500"
                                            }`}>
                                            {formatRelativeTime(conversation.lastMessageTime)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className={`text-sm truncate ${conversation.unreadCount > 0 ? "text-gray-900 font-medium" : "text-gray-500"
                                            }`}>
                                            {conversation.lastMessage}
                                        </p>
                                        {conversation.unreadCount > 0 && (
                                            <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                {conversation.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}

                    {/* Empty State */}
                    {filteredConversations.length === 0 && !isLoading && (
                        <div className="text-center py-16">
                            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            {searchQuery ? (
                                <>
                                    <h3 className="font-bold text-gray-900">No results found</h3>
                                    <p className="text-gray-500 text-sm mt-1">Try a different search term</p>
                                </>
                            ) : (
                                <>
                                    <h3 className="font-bold text-gray-900">No conversations yet</h3>
                                    <p className="text-gray-500 text-sm mt-1">Start a conversation with someone!</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}