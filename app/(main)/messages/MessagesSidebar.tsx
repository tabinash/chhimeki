"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { conversations } from "@/data/mockChatData";

export function MessagesSidebar() {
    const searchParams = useSearchParams();
    const activeConversationId = searchParams.get("chat") || conversations[0]?.id;

    return (
        <>
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full pl-10 pr-4 py-2 bg-[#F4F3F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                    <Link
                        key={conversation.id}
                        href={`/messages?chat=${conversation.id}`}
                        className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                            activeConversationId === conversation.id ? "bg-blue-50" : ""
                        }`}
                    >
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden relative">
                                <Image
                                    src={conversation.user.avatar}
                                    alt={conversation.user.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {conversation.user.isOnline && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-gray-900 text-sm truncate">
                                    {conversation.user.name}
                                </h3>
                                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                    {conversation.lastMessage.timestamp}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600 truncate">
                                    {conversation.lastMessage.text}
                                </p>
                                {conversation.unreadCount > 0 && (
                                    <span className="flex-shrink-0 ml-2 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {conversation.unreadCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
