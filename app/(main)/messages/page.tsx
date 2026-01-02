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
    Image as ImageIcon,
    Plus,
} from "lucide-react";
import { conversations, currentUser } from "@/data/mockChatData";

export default function MessagesPage() {
    const searchParams = useSearchParams();
    const chatId = searchParams.get("chat") || conversations[0]?.id;
    const [messageInput, setMessageInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Send className="w-16 h-16 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Messages</h2>
                    <p className="text-gray-500 text-sm max-w-sm">
                        Connect with your neighbors. Share updates, ask questions, and build community.
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

                {activeConversation.messages.map((message, index) => {
                    const isCurrentUser = message.senderId === currentUser.id;
                    const showAvatar = !isCurrentUser && (
                        index === 0 || 
                        activeConversation.messages[index - 1].senderId !== message.senderId
                    );
                    
                    return (
                        <div
                            key={message.id}
                            className={`flex items-end gap-2 ${isCurrentUser ? "justify-end" : "justify-start"} animate-fadeIn`}
                        >
                            {!isCurrentUser && (
                                <div className="w-8 h-8 flex-shrink-0">
                                    {showAvatar && (
                                        <div className="w-8 h-8 rounded-full overflow-hidden">
                                            <Image
                                                src={activeConversation.user.avatar}
                                                alt={activeConversation.user.name}
                                                width={32}
                                                height={32}
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                            <div
                                className={`max-w-[70%] ${
                                    isCurrentUser
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                        : "bg-white text-gray-900 shadow-md"
                                } rounded-2xl px-4 py-2.5 transition-all hover:shadow-lg`}
                            >
                                <p className="text-sm leading-relaxed">{message.text}</p>
                                <div
                                    className={`flex items-center gap-1.5 mt-1 text-xs ${
                                        isCurrentUser ? "text-blue-100" : "text-gray-400"
                                    }`}
                                >
                                    <span className="font-medium">{message.timestamp}</span>
                                    {isCurrentUser && (
                                        <>
                                            {message.status === "read" && (
                                                <CheckCheck className="w-3.5 h-3.5 text-blue-200" strokeWidth={2.5} />
                                            )}
                                            {message.status === "delivered" && (
                                                <CheckCheck className="w-3.5 h-3.5" strokeWidth={2.5} />
                                            )}
                                            {message.status === "sent" && (
                                                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex items-end gap-2 animate-fadeIn">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Image
                                src={activeConversation.user.avatar}
                                alt={activeConversation.user.name}
                                width={32}
                                height={32}
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                            </div>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4 pb-6">
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-blue-50 rounded-xl transition-all hover:scale-105 group" title="Attach File">
                        <Paperclip className="w-5 h-5 text-gray-500 group-hover:text-blue-600" strokeWidth={2} />
                    </button>
                    <button className="p-2 hover:bg-blue-50 rounded-xl transition-all hover:scale-105 group" title="Attach Image">
                        <ImageIcon className="w-5 h-5 text-gray-500 group-hover:text-blue-600" strokeWidth={2} />
                    </button>
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            onFocus={() => setIsTyping(false)}
                            onBlur={() => setIsTyping(false)}
                            placeholder="Type a message..."
                            className="w-full px-5 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                        />
                        <button 
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                            title="Emoji"
                        >
                            <Smile className="w-5 h-5 text-gray-500" strokeWidth={2} />
                        </button>
                    </div>
                    <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                        className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-200 disabled:shadow-none"
                        title="Send Message"
                    >
                        <Send className="w-5 h-5 text-white" strokeWidth={2} />
                    </button>
                </div>
            </div>
        </div>
    );
}