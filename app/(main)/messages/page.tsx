"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { conversations } from "@/data/mockChatData";

export default function MessagesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredConversations = conversations.filter(conv =>
        conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                    {conversations.filter(c => c.unreadCount > 0).length > 0 && (
                        <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                            {conversations.filter(c => c.unreadCount > 0).length}
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

            {/* Conversation List */}
            <div className="divide-y divide-gray-100">
                {filteredConversations.map((conversation) => (
                    <Link
                        key={conversation.id}
                        href={`/messages/${conversation.id}?bottomNav=false`}
                        className="flex items-start gap-3 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-14 h-14 rounded-full overflow-hidden relative">
                                <Image
                                    src={conversation.user.avatar}
                                    alt={conversation.user.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {conversation.user.isOnline && (
                                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className={`font-semibold text-sm truncate ${conversation.unreadCount > 0 ? "text-gray-900" : "text-gray-700"
                                    }`}>
                                    {conversation.user.name}
                                </h3>
                                <span className={`text-xs flex-shrink-0 ml-2 font-medium ${conversation.unreadCount > 0 ? "text-blue-600" : "text-gray-500"
                                    }`}>
                                    {conversation.lastMessage.timestamp}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <p className={`text-sm truncate ${conversation.unreadCount > 0 ? "text-gray-900 font-medium" : "text-gray-500"
                                    }`}>
                                    {conversation.lastMessage.text}
                                </p>
                                {conversation.unreadCount > 0 && (
                                    <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {conversation.unreadCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}

                {filteredConversations.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No conversations found</p>
                    </div>
                )}
            </div>
        </div>
    );
}