"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Minus, Send, Smile, Check, CheckCheck, Loader2Icon, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeChat, minimizeChat, restoreChat } from "@/redux/slices/chatSlice";
import { useConversation, useSendMessage, useDeleteMessage } from "@/hooks/message/useMessage";

export default function FloatingChatWindow() {
    const dispatch = useDispatch();
    const { isOpen, isMinimized, activeUser, activeUserId } = useSelector((state: RootState) => state.chat);

    // Fetch Conversation
    const { data: conversationResponse, isLoading } = useConversation(activeUserId);
    const messages = conversationResponse?.data[0]?.messages || []; // Assuming array response based on repository

    // Send Message Mutation
    const { mutate: sendMessage, isPending: isSending } = useSendMessage();

    // Delete Message Mutation
    const { mutate: deleteMessage, isPending: isDeleting } = useDeleteMessage();

    const [messageInput, setMessageInput] = useState("");
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (isOpen && !isMinimized) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen, isMinimized]);

    const handleSend = () => {
        if (!messageInput.trim() || !activeUserId) return;

        sendMessage(
            { receiverId: activeUserId, content: messageInput.trim() },
            {
                onSuccess: () => {
                    setMessageInput("");
                },
                onError: (err) => {
                    console.error("Failed to send message", err);
                }
            }
        );
    };

    const handleDeleteClick = (messageId: number) => {
        setDeleteConfirmId(messageId);
    };

    const confirmDelete = (messageId: number) => {
        deleteMessage(messageId);
        // setDeleteConfirmId(null);
    };

    const cancelDelete = () => {
        setDeleteConfirmId(null);
    };

    if (!isOpen || !activeUser) return null;

    if (isMinimized) {
        return (
            <div
                className="fixed bottom-2 right-4 w-72 bg-white rounded-t-xl shadow-2xl border border-gray-200 z-50 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => dispatch(restoreChat())}
            >
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                <Image
                                    src={activeUser.profilePicture || `https://ui-avatars.com/api/?background=random&color=fff&name=${activeUser.name}`}
                                    alt={activeUser.name}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <span className="font-semibold text-gray-900 text-sm truncate max-w-[150px]">{activeUser.name}</span>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); dispatch(closeChat()); }}
                        className="p-1 hover:bg-gray-200 rounded-full text-gray-500"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-5 right-4 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col h-[500px] animate-in slide-in-from-bottom-5 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white rounded-t-xl shadow-sm z-10">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => dispatch(minimizeChat())}>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                            <Image
                                src={activeUser.profilePicture || `https://ui-avatars.com/api/?background=random&color=fff&name=${activeUser.name}`}
                                alt={activeUser.name}
                                width={40}
                                height={40}
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight hover:underline">{activeUser.name}</h3>
                        <span className="text-xs text-green-600 font-medium">Active now</span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => dispatch(minimizeChat())}
                        className="p-1.5 hover:bg-gray-100 rounded-full text-blue-600 transition-colors"
                        title="Minimize"
                    >
                        <Minus className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => dispatch(closeChat())}
                        className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                        title="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50 scrollbar-thin scrollbar-thumb-gray-200">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">No messages yet</div>
                ) : (
                    messages.slice().reverse().map((msg: any) => ( // Reversing because API usually returns latest first, but UI needs oldest at top usually? Or check API.
                        <div key={msg.id} className={`flex ${msg.mine ? 'justify-end' : 'justify-start'} group`}>
                            {/* Delete Button for Own Messages */}
                            {msg.mine && !msg.read && (
                                <div className="relative flex items-center self-center mr-1">
                                    {deleteConfirmId === msg.id ? (
                                        <div className="flex items-center gap-1 bg-white shadow-md border rounded-lg p-1 animate-in fade-in zoom-in duration-200 absolute right-0 bottom-full mb-1 z-10 whitespace-nowrap">
                                            <span className="text-[10px] font-semibold text-gray-700 px-1">Delete?</span>
                                            <button
                                                onClick={() => confirmDelete(msg.id)}
                                                className="p-1 hover:bg-red-50 rounded text-red-600 hover:text-red-700"
                                                title="Confirm Delete"
                                            >
                                                {isDeleting ? (
                                                    <Loader2Icon className="w-3 h-3 animate-spin" />
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
                                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-opacity"
                                            title="Delete message"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            )}

                            {!msg.mine && (
                                <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden mr-2 self-end mb-1">
                                    <Image
                                        src={activeUser.profilePicture || `https://ui-avatars.com/api/?background=random&color=fff&name=${activeUser.name}`}
                                        alt={activeUser.name}
                                        width={24}
                                        height={24}
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                            )}
                            <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow-sm ${msg.mine
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-white text-gray-900 border border-gray-100 rounded-bl-none'
                                }`}>
                                <p>{msg.content}</p>
                                <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${msg.mine ? 'text-blue-100' : 'text-gray-400'}`}>
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    {msg.mine && (
                                        msg.read ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="p-3 bg-white border-t border-gray-100">
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:bg-white border border-transparent focus-within:border-blue-500 transition-all">
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent text-sm focus:outline-none placeholder-gray-500 text-gray-900"
                        disabled={isSending}
                    />
                    <div className="flex items-center gap-1">
                        <button className="p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                            <Smile className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!messageInput.trim() || isSending}
                            className="p-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 rounded-full text-white transition-all shadow-sm disabled:shadow-none"
                        >
                            {isSending ? <Loader2Icon className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" strokeWidth={2.5} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
