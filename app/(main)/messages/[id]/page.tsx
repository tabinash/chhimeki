"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    MoreVertical,
    Send,
    Smile,
    Paperclip,
    Check,
    CheckCheck,
    Image as ImageIcon,
    Loader2,
    Trash2,
    X,
} from "lucide-react";
import { useConversation, useSendMessage, useMarkAsRead, useDeleteMessage } from "../_hook";
import { SimpleMessageDTO } from "@/types/api/message";

// Format time for display
const formatMessageTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Format date for date dividers
const formatDateDivider = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" });
};

export default function ConversationPage() {
    const params = useParams();
    const router = useRouter();
    const otherUserId = parseInt(params.id as string, 10);
    const [messageInput, setMessageInput] = useState("");
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch conversation data
    const { data: conversationData, isLoading, error } = useConversation(
        isNaN(otherUserId) ? null : otherUserId
    );

    // Get the conversation details (first item in array)
    const conversationDetails = conversationData?.data?.[0];
    const otherUser = conversationDetails?.otherUser;
    const rawMessages = conversationDetails?.messages || [];

    // Reverse messages: API returns latest first, we need oldest first for UI
    const messages = rawMessages.slice().reverse();

    // Mutation hooks
    const sendMessageMutation = useSendMessage();
    const markAsReadMutation = useMarkAsRead();
    const deleteMessageMutation = useDeleteMessage();

    // Mark messages as read when opening conversation
    useEffect(() => {
        if (otherUserId && !isNaN(otherUserId) && rawMessages.some(m => !m.mine && !m.read)) {
            markAsReadMutation.mutate(otherUserId);
        }
    }, [otherUserId, rawMessages]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (!messageInput.trim() || !otherUserId) return;

        sendMessageMutation.mutate(
            {
                receiverId: otherUserId,
                content: messageInput.trim(),
            },
            {
                onSuccess: () => {
                    setMessageInput("");
                },
                onError: (error) => {
                    alert(`Failed to send message: ${error.message}`);
                },
            }
        );
    };

    const handleDeleteClick = (messageId: number) => {
        setDeleteConfirmId(messageId);
    };

    const confirmDelete = (messageId: number) => {
        deleteMessageMutation.mutate(messageId, {
            onSuccess: () => {
                setDeleteConfirmId(null);
            },
            onError: (error) => {
                alert(`Failed to delete message: ${error.message}`);
                setDeleteConfirmId(null);
            },
        });
    };

    const cancelDelete = () => {
        setDeleteConfirmId(null);
    };

    // Get avatar URL with fallback
    const getAvatar = (name: string, profilePicture: string | null) => {
        return profilePicture || `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(name)}`;
    };

    // Loading state - Simple shimmer
    if (isLoading) {
        return (
            <div className="flex flex-col bg-white h-screen">
                {/* Header Shimmer */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                        <div className="flex-1">
                            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-1" />
                            <div className="w-20 h-3 bg-gray-100 rounded animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Messages Shimmer */}
                <div className="flex-1 p-4 space-y-4 bg-gray-50">
                    {/* Their message */}
                    <div className="flex justify-start">
                        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mr-2" />
                        <div className="w-48 h-12 bg-gray-200 rounded-2xl rounded-bl-none animate-pulse" />
                    </div>
                    {/* My message */}
                    <div className="flex justify-end">
                        <div className="w-40 h-10 bg-blue-200 rounded-2xl rounded-br-none animate-pulse" />
                    </div>
                    {/* Their message */}
                    <div className="flex justify-start">
                        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mr-2" />
                        <div className="w-56 h-16 bg-gray-200 rounded-2xl rounded-bl-none animate-pulse" />
                    </div>
                    {/* My message */}
                    <div className="flex justify-end">
                        <div className="w-52 h-10 bg-blue-200 rounded-2xl rounded-br-none animate-pulse" />
                    </div>
                </div>

                {/* Input Shimmer */}
                <div className="fixed bottom-0 bg-white border-t border-gray-200 p-3 w-full">
                    <div className="h-12 bg-gray-100 rounded-full animate-pulse" />
                </div>
            </div>
        );
    }

    // Error state
    if (error || !conversationDetails || !otherUser) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-500">
                        {error ? "Failed to load conversation" : "Conversation not found"}
                    </p>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-white h-screen">
            {/* Chat Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center gap-3">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="text-gray-600 hover:text-gray-900 -ml-2"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    {/* User Info - Link to profile */}
                    <Link
                        href={`/profile/${otherUser.id}`}
                        className="flex items-center gap-3 flex-1 min-w-0"
                    >
                        <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden relative">
                                <Image
                                    src={getAvatar(otherUser.name, otherUser.profilePicture)}
                                    alt={otherUser.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h2 className="font-bold text-gray-900 text-sm truncate">
                                {otherUser.name}
                            </h2>
                            <p className="text-xs text-gray-500">Tap for profile</p>
                        </div>
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <MoreVertical className="w-5 h-5 text-gray-600" strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {/* Date Divider */}
                {messages.length > 0 && (
                    <div className="flex items-center justify-center my-4">
                        <div className="px-4 py-1.5 bg-gray-200 rounded-full text-xs font-medium text-gray-600">
                            {formatDateDivider(messages[0].createdAt)}
                        </div>
                    </div>
                )}

                {messages.map((msg: SimpleMessageDTO) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.mine ? "justify-end" : "justify-start"} group`}
                    >
                        {/* Delete Button for Own Unread Messages */}
                        {msg.mine && !msg.read && (
                            <div className="relative flex items-center self-center mr-1">
                                {deleteConfirmId === msg.id ? (
                                    <div className="flex items-center gap-1 bg-white shadow-md border rounded-lg p-1 animate-in fade-in duration-200 absolute right-0 bottom-full mb-1 z-10 whitespace-nowrap">
                                        <span className="text-[10px] font-semibold text-gray-700 px-1">Delete?</span>
                                        <button
                                            onClick={() => confirmDelete(msg.id)}
                                            className="p-1 hover:bg-red-50 rounded text-red-600 hover:text-red-700"
                                            title="Confirm Delete"
                                        >
                                            {deleteMessageMutation.isPending ? (
                                                <Loader2 className="w-3 h-3 animate-spin" />
                                            ) : (
                                                <Check className="w-3 h-3" strokeWidth={3} />
                                            )}
                                        </button>
                                        <button
                                            onClick={cancelDelete}
                                            className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700"
                                            title="Cancel"
                                        >
                                            <X className="w-3 h-3" strokeWidth={3} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleDeleteClick(msg.id)}
                                        className="p-1 text-gray-400 text-red-500 avtive:scale-110 "
                                        title="Delete message"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Avatar for Other User */}
                        {!msg.mine && (
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 self-end mb-1 flex-shrink-0">
                                <Image
                                    src={getAvatar(otherUser.name, otherUser.profilePicture)}
                                    alt={otherUser.name}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                />
                            </div>
                        )}

                        {/* Message Bubble */}
                        <div
                            className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${msg.mine
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-white text-gray-900 border border-gray-100 rounded-bl-none"
                                }`}
                        >
                            <p className="leading-relaxed">{msg.content}</p>
                            <div
                                className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${msg.mine ? "text-blue-100" : "text-gray-400"
                                    }`}
                            >
                                {formatMessageTime(msg.createdAt)}
                                {msg.mine && (
                                    msg.read ? (
                                        <CheckCheck className="w-3 h-3" />
                                    ) : (
                                        <Check className="w-3 h-3" />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                {messages.length === 0 && (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <p className="text-gray-500">No messages yet</p>
                            <p className="text-gray-400 text-sm mt-1">Say hello to start the conversation!</p>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Message Input - Fixed at bottom */}
            <div className="fixed bottom-0 bg-white border-t border-gray-200 p-3 w-full">
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 active:bg-gray-200 active:scale-90 focus-within:bg-white border border-transparent focus-within:border-blue-500 transition-all">
                    <button className="p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                        <ImageIcon className="w-5 h-5" />
                    </button>
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent text-sm focus:outline-none placeholder-gray-500 text-gray-900"
                        disabled={sendMessageMutation.isPending}
                    />
                    <button className="p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                        <Smile className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim() || sendMessageMutation.isPending}
                        className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 rounded-full text-white transition-all shadow-sm disabled:shadow-none"
                    >
                        {sendMessageMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" strokeWidth={2.5} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
