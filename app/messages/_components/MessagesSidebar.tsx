"use client";

import { Search, MessageCircle, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAllConversations } from "../_hook";
import { useEffect, useState } from "react";

function formatTime(isoString: string, now: Date) {
    const date = new Date(isoString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function MessagesSidebar() {
    const searchParams = useSearchParams();
    const activeUserId = searchParams.get("userId");

    const { data: conversationsResponse, isLoading } = useAllConversations();
    const conversations = conversationsResponse?.data || [];

    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());
        // Update time every minute
        const interval = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(interval);
    }, []);

    const unreadCount = conversations.filter(c => c.hasUnreadMessages).length;

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-gray-900">Chats</h1>
                        {unreadCount > 0 && (
                            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search messages"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white transition-all placeholder:text-gray-500"
                    />
                </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                        <div className="text-gray-400 text-sm">Loading...</div>
                    </div>
                ) : conversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <MessageCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-600 mb-1">No messages yet</p>
                        <p className="text-xs text-gray-400">
                            Start a conversation with your neighbors
                        </p>
                    </div>
                ) : (
                    <div className="py-2">
                        {conversations.map(conversation => {
                            const isActive = activeUserId === String(conversation.otherUserId);
                            return (
                                <Link
                                    key={conversation.otherUserId}
                                    href={`/messages?userId=${conversation.otherUserId}`}
                                    className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all ${isActive
                                        ? "bg-blue-50"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                            {conversation.profilePicture ? (
                                                <Image
                                                    src={conversation.profilePicture}
                                                    alt={conversation.otherUsername}
                                                    width={48}
                                                    height={48}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-lg">
                                                    {conversation.otherUsername.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        {/* Online indicator could go here */}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <h3 className={`text-sm truncate ${conversation.hasUnreadMessages
                                                ? "font-bold text-gray-900"
                                                : "font-medium text-gray-800"
                                                }`}>
                                                {conversation.otherUsername}
                                            </h3>
                                            <span className={`text-xs flex-shrink-0 ml-2 ${conversation.hasUnreadMessages
                                                ? "text-blue-600 font-semibold"
                                                : "text-gray-400"
                                                }`}>
                                                {now ? formatTime(conversation.lastMessageTime, now) : ""}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <p className={`text-sm truncate flex-1 ${conversation.hasUnreadMessages
                                                ? "text-gray-900 font-medium"
                                                : "text-gray-500"
                                                }`}>
                                                {conversation.lastMessage}
                                            </p>

                                            {conversation.unreadCount > 0 && (
                                                <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                    {conversation.unreadCount > 9 ? "9+" : conversation.unreadCount}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
