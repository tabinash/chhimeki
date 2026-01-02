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
            <div className="p-4 border-b border-gray-200 bg-gradient-to-b from-white to-gray-50">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                    <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                        {conversations.filter(c => c.unreadCount > 0).length}
                    </span>
                </div>
                {/* Search */}
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" strokeWidth={2} />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                    <Link
                        key={conversation.id}
                        href={`/messages?chat=${conversation.id}`}
                        className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-all border-b border-gray-100 group ${
                            activeConversationId === conversation.id ? "bg-blue-50 border-l-4 border-l-blue-600" : ""
                        }`}
                    >
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden relative ring-2 ring-gray-200 group-hover:ring-blue-400 transition-all">
                                <Image
                                    src={conversation.user.avatar}
                                    alt={conversation.user.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {conversation.user.isOnline && (
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className={`font-semibold text-sm truncate ${
                                    conversation.unreadCount > 0 ? "text-gray-900" : "text-gray-700"
                                }`}>
                                    {conversation.user.name}
                                </h3>
                                <span className={`text-xs flex-shrink-0 ml-2 font-medium ${
                                    conversation.unreadCount > 0 ? "text-blue-600" : "text-gray-500"
                                }`}>
                                    {conversation.lastMessage.timestamp}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <p className={`text-sm truncate ${
                                    conversation.unreadCount > 0 ? "text-gray-900 font-medium" : "text-gray-500"
                                }`}>
                                    {conversation.lastMessage.text}
                                </p>
                                {conversation.unreadCount > 0 && (
                                    <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
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
