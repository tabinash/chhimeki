"use client";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
    MoreVertical,
    Send,
    Smile,
    Paperclip,
    Phone,
    Video,
    Check,
    CheckCheck,
} from "lucide-react";
import { conversations, currentUser } from "@/data/mockChatData";

export default function MessagesPage() {
    const searchParams = useSearchParams();
    const chatId = searchParams.get("chat") || conversations[0]?.id;
    const [messageInput, setMessageInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeConversation = conversations.find((c) => c.id === chatId);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeConversation?.messages]);

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;
        // TODO: Add message to conversation
        setMessageInput("");
    };

    if (!activeConversation) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Your Messages</h2>
                    <p className="text-gray-500 text-sm">
                        Select a conversation to start messaging
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-[#F4F3F0] h-full">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
                {/* User Info */}
                <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative">
                        <Image
                            src={activeConversation.user.avatar}
                            alt={activeConversation.user.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {activeConversation.user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-gray-900 text-sm">
                        {activeConversation.user.name}
                    </h2>
                    <p className="text-xs text-gray-500">
                        {activeConversation.user.isOnline
                            ? "Active now"
                            : `Last seen ${activeConversation.user.lastSeen}`}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Phone className="w-5 h-5 text-gray-700" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Video className="w-5 h-5 text-gray-700" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConversation.messages.map((message) => {
                    const isCurrentUser = message.senderId === currentUser.id;
                    return (
                        <div
                            key={message.id}
                            className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[70%] ${
                                    isCurrentUser
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-gray-900"
                                } rounded-2xl px-4 py-2 shadow-sm`}
                            >
                                <p className="text-sm">{message.text}</p>
                                <div
                                    className={`flex items-center gap-1 mt-1 text-xs ${
                                        isCurrentUser ? "text-blue-100" : "text-gray-500"
                                    }`}
                                >
                                    <span>{message.timestamp}</span>
                                    {isCurrentUser && (
                                        <>
                                            {message.status === "read" && (
                                                <CheckCheck className="w-3 h-3" />
                                            )}
                                            {message.status === "delivered" && (
                                                <CheckCheck className="w-3 h-3" />
                                            )}
                                            {message.status === "sent" && (
                                                <Check className="w-3 h-3" />
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
            <div className="bg-white border-t border-gray-200 p-4 pb-6">
                <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Paperclip className="w-5 h-5 text-gray-600" />
                    </button>
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 bg-[#F4F3F0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                    />
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Smile className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                        className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
                    >
                        <Send className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}