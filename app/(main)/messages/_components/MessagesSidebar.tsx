"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAllConversations } from "../_hook";
import { useEffect, useState } from "react";

/* =========================
   STEP 1: Time formatter
   ========================= */
function formatTime(isoString: string, now: Date) {
    const date = new Date(isoString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}

export function MessagesSidebar() {
    const searchParams = useSearchParams();
    const activeUserId = searchParams.get("userId");

    const { data: conversationsResponse, isLoading } = useAllConversations();
    const conversations = conversationsResponse?.data || [];

    /* =========================
       STEP 2: Client-only "now"
       ========================= */
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());
    }, []);

    return (
        <>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-b from-white to-gray-50">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                    {conversations.filter(c => c.hasUnreadMessages).length > 0 && (
                        <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                            {conversations.filter(c => c.hasUnreadMessages).length}
                        </span>
                    )}
                </div>

                {/* Search */}
                <div className="relative group">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                        strokeWidth={2}
                    />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                        <div className="text-gray-500 text-sm">
                            Loading conversations...
                        </div>
                    </div>
                ) : conversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                        <div className="text-gray-400 mb-2">
                            No conversations yet
                        </div>
                        <p className="text-xs text-gray-500">
                            Start chatting with your neighbors!
                        </p>
                    </div>
                ) : (
                    conversations.map(conversation => (
                        <Link
                            key={conversation.otherUserId}
                            href={`/messages?userId=${conversation.otherUserId}`}
                            className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-all border-b border-gray-100 group ${activeUserId === String(conversation.otherUserId)
                                    ? "bg-blue-50 border-l-4 border-l-blue-600"
                                    : ""
                                }`}
                        >
                            {/* Avatar */}
                            <div className="relative flex-shrink-0">
                                <div className="w-12 h-12 rounded-full overflow-hidden relative ring-2 ring-gray-200 group-hover:ring-blue-400 transition-all bg-gray-200">
                                    {conversation.profilePicture ? (
                                        <Image
                                            src={conversation.profilePicture}
                                            alt={conversation.otherUsername}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold text-lg">
                                            {conversation.otherUsername
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 text-left">
                                <div className="flex items-center justify-between mb-1">
                                    <h3
                                        className={`font-semibold text-sm truncate ${conversation.hasUnreadMessages
                                                ? "text-gray-900"
                                                : "text-gray-700"
                                            }`}
                                    >
                                        {conversation.otherUsername}
                                    </h3>

                                    {/* ✅ Hydration-safe time */}
                                    <span
                                        className={`text-xs flex-shrink-0 ml-2 font-medium ${conversation.hasUnreadMessages
                                                ? "text-blue-600"
                                                : "text-gray-500"
                                            }`}
                                    >
                                        {now
                                            ? formatTime(
                                                conversation.lastMessageTime,
                                                now
                                            )
                                            : ""}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                    <p
                                        className={`text-sm truncate ${conversation.hasUnreadMessages
                                                ? "text-gray-900 font-medium"
                                                : "text-gray-500"
                                            }`}
                                    >
                                        {conversation.lastMessage}
                                    </p>

                                    {conversation.unreadCount > 0 && (
                                        <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                                            {conversation.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </>
    );
}
