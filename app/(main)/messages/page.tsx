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
    Image as ImageIcon,
    Loader2,
    Trash2,
} from "lucide-react";
import { useConversation, useSendMessage, useDeleteMessage } from "./_hook";

export default function MessagesPage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const [messageInput, setMessageInput] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { data: conversationData, isLoading } = useConversation(userId ? Number(userId) : null);
    console.log("conversationData", conversationData?.data);
    const conversation = conversationData?.data[0];
    console.log("conversation", conversation);

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
        if (!confirm("Are you sure you want to delete this message? This cannot be undone.")) {
            return;
        }

        deleteMessage(messageId, {
            onSuccess: () => {
                console.log("Message deleted successfully");
            },
            onError: (error) => {
                console.error("Failed to delete message:", error);
                alert("Failed to delete message. You can only delete your own unread messages.");
            },
        });
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-gray-500">Loading conversation...</div>
            </div>
        );
    }

    if (!userId || !conversation) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Send className="w-16 h-16 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Messages</h2>
                    <p className="text-gray-500 text-sm max-w-sm">
                        Select a conversation to start chatting with your neighbors.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-gradient-to-b from-gray-50 to-white h-full">
            {/* Chat Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 flex items-center gap-3 shadow-sm">
                {/* User Info */}
                <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-200">
                        {conversation.otherUser.profilePicture ? (
                            <Image
                                src={conversation.otherUser.profilePicture}
                                alt={conversation.otherUser.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
                                {conversation.otherUser.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-gray-900 text-sm">
                        {conversation.otherUser.name}
                    </h2>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <button className="p-2.5 hover:bg-blue-50 rounded-xl transition-all hover:scale-105 group" title="Voice Call">
                        <Phone className="w-5 h-5 text-gray-600 group-hover:text-blue-600" strokeWidth={2} />
                    </button>
                    <button className="p-2.5 hover:bg-blue-50 rounded-xl transition-all hover:scale-105 group" title="Video Call">
                        <Video className="w-5 h-5 text-gray-600 group-hover:text-blue-600" strokeWidth={2} />
                    </button>
                    <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-all hover:scale-105" title="More Options">
                        <MoreVertical className="w-5 h-5 text-gray-600" strokeWidth={2} />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {/* Date Divider */}
                <div className="flex items-center justify-center my-4">
                    <div className="px-4 py-1.5 bg-gray-200 rounded-full text-xs font-medium text-gray-600">
                        Today
                    </div>
                </div>

                {messages.map((message, index) => {
                    const showAvatar = !message.mine && (
                        index === 0 ||
                        messages[index - 1].mine
                    );

                    // Format time from ISO string
                    const formatTime = (isoString: string) => {
                        const date = new Date(isoString);
                        return date.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                        });
                    };

                    return (
                        <div
                            key={message.id}
                            className={`flex items-end gap-2 ${message.mine ? "justify-end" : "justify-start"} animate-fadeIn`}
                        >
                            {!message.mine && (
                                <div className="w-8 h-8 flex-shrink-0">
                                    {showAvatar && (
                                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                                            {conversation.otherUser.profilePicture ? (
                                                <Image
                                                    src={conversation.otherUser.profilePicture}
                                                    alt={conversation.otherUser.name}
                                                    width={32}
                                                    height={32}
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xs font-bold">
                                                    {conversation.otherUser.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                            <div
                                className={`relative group/message max-w-[70%] ${message.mine
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                    : "bg-white text-gray-900 shadow-md"
                                    } rounded-2xl px-4 py-2.5 transition-all hover:shadow-lg`}
                            >
                                {/* Delete button for own messages (only if unread) */}
                                {message.mine && !message.read && (
                                    <button
                                        onClick={() => handleDeleteMessage(message.id)}
                                        disabled={isDeleting}
                                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 rounded-full opacity-0 group-hover/message:opacity-100 transition-opacity shadow-lg"
                                        title="Delete message"
                                    >
                                        <Trash2 className="w-3 h-3 text-white" strokeWidth={2} />
                                    </button>
                                )}

                                <p className="text-sm leading-relaxed">{message.content}</p>
                                <div
                                    className={`flex items-center gap-1.5 mt-1 text-xs ${message.mine ? "text-blue-100" : "text-gray-400"
                                        }`}
                                >
                                    <span className="font-medium">{formatTime(message.createdAt)}</span>
                                    {message.mine && (
                                        <>
                                            {message.read ? (
                                                <CheckCheck className="w-3.5 h-3.5 text-blue-200" strokeWidth={2.5} />
                                            ) : (
                                                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4 pb-6">
                <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            placeholder="Type a message..."
                            className="w-full px-5 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                            disabled={isSending}
                        />
                        <button
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                            title="Emoji"
                            type="button"
                        >
                            <Smile className="w-5 h-5 text-gray-500" strokeWidth={2} />
                        </button>

                        {/* Emoji Picker */}
                        {showEmojiPicker && (
                            <div className="absolute bottom-full right-0 mb-2 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 w-72">
                                <div className="flex items-center justify-between mb-2 pb-2 border-b">
                                    <span className="text-sm font-semibold text-gray-700">Emoji</span>
                                    <button
                                        onClick={() => setShowEmojiPicker(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
                                    {['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊',
                                        '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘',
                                        '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪',
                                        '🤨', '🧐', '🤓', '😎', '🥳', '😏', '😒', '😞',
                                        '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩',
                                        '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯',
                                        '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓',
                                        '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑',
                                        '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙',
                                        '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💪',
                                        '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍',
                                        '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘',
                                        '🔥', '✨', '💫', '⭐', '🌟', '💯', '✅', '❌'].map((emoji) => (
                                            <button
                                                key={emoji}
                                                onClick={() => insertEmoji(emoji)}
                                                className="text-2xl hover:bg-gray-100 rounded p-1 transition-colors"
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim() || isSending}
                        className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-200 disabled:shadow-none"
                        title="Send Message"
                    >
                        {isSending ? (
                            <Loader2 className="w-5 h-5 text-white animate-spin" strokeWidth={2} />
                        ) : (
                            <Send className="w-5 h-5 text-white" strokeWidth={2} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}