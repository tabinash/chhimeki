"use client";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
    MoreVertical,
    Send,
    Smile,
    Phone,
    Video,
    Check,
    CheckCheck,
    Paperclip,
    Loader2,
    Trash2,
    MessageCircle,
    ArrowLeft,
} from "lucide-react";
import { useConversation, useSendMessage, useDeleteMessage } from "./_hook";
import Link from "next/link";

export default function MessagesPage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const [messageInput, setMessageInput] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { data: conversationData, isLoading } = useConversation(userId ? Number(userId) : null);
    const conversation = conversationData?.data[0];

    // Reverse messages so recent ones appear at bottom
    const messages = conversation?.messages ? [...conversation.messages].reverse() : [];

    const { mutate: sendMessage, isPending: isSending } = useSendMessage();
    const { mutate: deleteMessage, isPending: isDeleting } = useDeleteMessage();

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (!messageInput.trim() || !userId || isSending) return;

        sendMessage(
            {
                receiverId: Number(userId),
                content: messageInput.trim(),
            },
            {
                onSuccess: () => {
                    setMessageInput("");
                    inputRef.current?.focus();
                },
                onError: (error) => {
                    console.error("Failed to send message:", error);
                    alert("Failed to send message. Please try again.");
                },
            }
        );
    };

    const insertEmoji = (emoji: string) => {
        setMessageInput(prev => prev + emoji);
        setShowEmojiPicker(false);
        inputRef.current?.focus();
    };

    const handleDeleteMessage = (messageId: number) => {
        if (!confirm("Delete this message?")) return;

        deleteMessage(messageId, {
            onError: (error) => {
                console.error("Failed to delete message:", error);
                alert("Failed to delete message.");
            },
        });
    };

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!userId || !conversation) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center px-8">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
                        <MessageCircle className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Your Messages</h2>
                    <p className="text-gray-500 text-sm max-w-xs mx-auto">
                        Select a conversation to start chatting
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
                {/* Back button (mobile) */}
                <Link href="/messages" className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                    {conversation.otherUser.profilePicture ? (
                        <Image
                            src={conversation.otherUser.profilePicture}
                            alt={conversation.otherUser.name}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                            {conversation.otherUser.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-gray-900 text-sm truncate">
                        {conversation.otherUser.name}
                    </h2>
                    <p className="text-xs text-gray-500">Tap for info</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Voice Call">
                        <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Video Call">
                        <Video className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="More">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
                {/* Date Divider */}
                <div className="flex items-center justify-center mb-4">
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-500 shadow-sm">
                        Today
                    </span>
                </div>

                <div className="space-y-1">
                    {messages.map((message, index) => {
                        const showAvatar = !message.mine && (
                            index === 0 ||
                            messages[index - 1].mine
                        );

                        // Check if this is the start of a new message group
                        const isFirstInGroup = index === 0 || messages[index - 1].mine !== message.mine;
                        const isLastInGroup = index === messages.length - 1 || messages[index + 1].mine !== message.mine;

                        return (
                            <div
                                key={message.id}
                                className={`flex items-end gap-2 ${message.mine ? "justify-end" : "justify-start"}`}
                            >
                                {/* Avatar placeholder for alignment */}
                                {!message.mine && (
                                    <div className="w-7 h-7 flex-shrink-0">
                                        {showAvatar && (
                                            <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200">
                                                {conversation.otherUser.profilePicture ? (
                                                    <Image
                                                        src={conversation.otherUser.profilePicture}
                                                        alt={conversation.otherUser.name}
                                                        width={28}
                                                        height={28}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-semibold">
                                                        {conversation.otherUser.name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Message Bubble */}
                                <div
                                    className={`relative group/message max-w-[75%] ${message.mine
                                        ? `bg-blue-600 text-white ${isFirstInGroup ? 'rounded-t-2xl' : 'rounded-t-md'} ${isLastInGroup ? 'rounded-bl-2xl rounded-br-md' : 'rounded-b-md'}`
                                        : `bg-white text-gray-900 shadow-sm ${isFirstInGroup ? 'rounded-t-2xl' : 'rounded-t-md'} ${isLastInGroup ? 'rounded-br-2xl rounded-bl-md' : 'rounded-b-md'}`
                                        } px-3.5 py-2 transition-all`}
                                >
                                    {/* Delete button */}
                                    {message.mine && !message.read && (
                                        <button
                                            onClick={() => handleDeleteMessage(message.id)}
                                            disabled={isDeleting}
                                            className="absolute -top-1 -right-1 p-1 bg-red-500 hover:bg-red-600 rounded-full opacity-0 group-hover/message:opacity-100 transition-opacity shadow"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-2.5 h-2.5 text-white" />
                                        </button>
                                    )}

                                    <p className="text-sm leading-relaxed">{message.content}</p>

                                    {/* Time & Status - only show on last message of group */}
                                    {isLastInGroup && (
                                        <div className={`flex items-center gap-1 mt-0.5 text-[10px] ${message.mine ? "text-blue-200 justify-end" : "text-gray-400"}`}>
                                            <span>{formatTime(message.createdAt)}</span>
                                            {message.mine && (
                                                message.read ? (
                                                    <CheckCheck className="w-3 h-3" />
                                                ) : (
                                                    <Check className="w-3 h-3" />
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 px-4 py-3">
                <div className="flex items-center gap-2">
                    {/* Attachment */}
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
                        <Paperclip className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Input */}
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            placeholder="Message..."
                            className="w-full px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white transition-all"
                            disabled={isSending}
                        />
                    </div>

                    {/* Emoji */}
                    <button
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 relative"
                        type="button"
                    >
                        <Smile className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Send */}
                    <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim() || isSending}
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed rounded-full transition-all flex-shrink-0"
                    >
                        {isSending ? (
                            <Loader2 className="w-5 h-5 text-white animate-spin" />
                        ) : (
                            <Send className="w-5 h-5 text-white" />
                        )}
                    </button>
                </div>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                    <div className="absolute bottom-20 right-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 w-72 z-50">
                        <div className="flex items-center justify-between mb-2 pb-2 border-b">
                            <span className="text-sm font-semibold text-gray-700">Emoji</span>
                            <button
                                onClick={() => setShowEmojiPicker(false)}
                                className="text-gray-400 hover:text-gray-600 text-sm"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="grid grid-cols-8 gap-1 max-h-40 overflow-y-auto">
                            {['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊',
                                '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘',
                                '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪',
                                '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙',
                                '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍',
                                '🔥', '✨', '💫', '⭐', '🌟', '💯', '✅', '❌'].map((emoji) => (
                                    <button
                                        key={emoji}
                                        onClick={() => insertEmoji(emoji)}
                                        className="text-xl hover:bg-gray-100 rounded p-1 transition-colors"
                                    >
                                        {emoji}
                                    </button>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}