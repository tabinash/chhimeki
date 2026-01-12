"use client";

import { MessageCircle, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ConversationResponseDTO } from "@/types/api/message";
import { useDispatch } from "react-redux";
import { openChat } from "@/redux/slices/chatSlice";
import { useConversations } from "@/hooks/message/useMessage";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=random&color=fff&name=";

function formatTime(isoString: string) {
    const date = new Date(isoString);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000; // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
    return date.toLocaleDateString();
}

export default function MessageDropdown() {
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fetch conversations
    const { data: conversationsData, isLoading } = useConversations();
    const conversations = conversationsData?.data || [];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const unreadTotal = conversations.filter(c => c.hasUnreadMessages).length;

    const handleConversationClick = (conversation: ConversationResponseDTO) => {
        dispatch(openChat({
            id: conversation.otherUserId,
            name: conversation.otherUsername,
            profilePicture: conversation.profilePicture
        }));
        setShowDropdown(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-900 group relative"
                title="Messages"
            >
                <MessageCircle className="h-6 w-6 group-hover:fill-current transition-all" strokeWidth={2} />
                {unreadTotal > 0 && (
                    <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-blue-600 border-2 border-white pointer-events-none"></span>
                )}
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
                <div className="absolute right-0 mt-3 w-[360px] bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 py-0 z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-sm">
                        <h3 className="font-bold text-lg text-gray-900">Messages</h3>
                        <div className="flex items-center gap-2">
                            <button className="text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors">
                                Mark all read
                            </button>
                            <Link
                                href="/messages"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                onClick={() => setShowDropdown(false)}
                            >
                                <MoreHorizontal className="w-5 h-5 text-gray-500" />
                            </Link>

                        </div>
                    </div>

                    {/* Chat List */}
                    <div className="max-h-[400px] overflow-y-auto">
                        {isLoading ? (
                            <div className="p-8 text-center text-gray-500 text-sm">
                                Loading...
                            </div>
                        ) : conversations.length === 0 ? (
                            <div className="py-8 text-center text-gray-500 text-sm">
                                <p>No messages yet.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {conversations.map((conversation) => (
                                    <button
                                        key={conversation.otherUserId}
                                        onClick={() => handleConversationClick(conversation)}
                                        className={`flex items-start gap-3 px-4 py-3 w-full text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none group ${conversation.hasUnreadMessages ? 'bg-blue-50/30' : ''}`}
                                    >
                                        {/* Avatar */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border border-transparent group-hover:border-gray-200 transition-all">
                                                <Image
                                                    src={conversation.profilePicture || `${DEFAULT_AVATAR}${conversation.otherUsername}`}
                                                    alt={conversation.otherUsername}
                                                    width={48}
                                                    height={48}
                                                    className="object-cover w-full h-full"
                                                    unoptimized
                                                />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0 pr-1">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <p className={`text-sm truncate ${conversation.hasUnreadMessages ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                                                    {conversation.otherUsername}
                                                </p>
                                                <span className={`text-[11px] flex-shrink-0 ${conversation.hasUnreadMessages ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                                                    {formatTime(conversation.lastMessageTime)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className={`text-base font-[500] truncate w-full pr-2 ${conversation.hasUnreadMessages ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                                    {conversation.lastMessage}
                                                </p>
                                                {conversation.hasUnreadMessages && (
                                                    <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-2 border-t border-gray-100 bg-gray-50/50">
                        <Link
                            href="/messages"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-2.5 text-center text-sm font-bold text-blue-600 hover:underline decoration-2 underline-offset-2 transition-all rounded-xl hover:bg-white hover:shadow-sm"
                            onClick={() => setShowDropdown(false)}
                        >
                            See all in Messenger
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
