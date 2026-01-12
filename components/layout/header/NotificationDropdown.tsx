"use client";

import { Bell, Heart, MessageSquare, UserPlus, Info, Check } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Notification Types
type NotificationType = "LIKE" | "COMMENT" | "FOLLOW" | "SYSTEM";

interface Notification {
    id: number;
    type: NotificationType;
    actorName: string;
    actorAvatar: string | null;
    content: string;
    time: string;
    isRead: boolean;
    link: string;
}

// Brand Colors
const COLORS = {
    primary: "#577cff",
    secondary: "#0c0f14",
    white: "#ffffff",
    accent: "#ff8700",
};

// Dummy Data
const DUMMY_NOTIFICATIONS: Notification[] = [
    {
        id: 1,
        type: "LIKE",
        actorName: "Sita Poudel",
        actorAvatar: null,
        content: "liked your post about the community garden.",
        time: "2m ago",
        isRead: false,
        link: "/post/1"
    },
    {
        id: 2,
        type: "COMMENT",
        actorName: "Ramesh Thapa",
        actorAvatar: null,
        content: "commented: 'Great initiative! I would love to help.'",
        time: "15m ago",
        isRead: false,
        link: "/post/1"
    },
    {
        id: 3,
        type: "FOLLOW",
        actorName: "Kriti Singh",
        actorAvatar: null,
        content: "started following you.",
        time: "2h ago",
        isRead: true,
        link: "/profile/104"
    },
    {
        id: 4,
        type: "SYSTEM",
        actorName: "System",
        actorAvatar: null,
        content: "Your business profile has been approved!",
        time: "1d ago",
        isRead: true,
        link: "/businesses"
    }
];

export default function NotificationDropdown() {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [notifications, setNotifications] = useState<Notification[]>(DUMMY_NOTIFICATIONS);

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

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, isRead: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case "LIKE": return <Heart className="w-3.5 h-3.5 text-white fill-current" />;
            case "COMMENT": return <MessageSquare className="w-3.5 h-3.5 text-white fill-current" />;
            case "FOLLOW": return <UserPlus className="w-3.5 h-3.5 text-white" />;
            case "SYSTEM": return <Info className="w-3.5 h-3.5 text-white" />;
        }
    };

    const getIconBgStyle = (type: NotificationType) => {
        switch (type) {
            case "LIKE": return { backgroundColor: "#ef4444" }; // Keep red for heart like
            case "COMMENT": return { backgroundColor: COLORS.primary };
            case "FOLLOW": return { backgroundColor: COLORS.accent };
            case "SYSTEM": return { backgroundColor: COLORS.secondary };
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-900 group relative"
                title="Notifications"
            >
                <Bell className="h-6 w-6 group-hover:fill-current transition-all text-[#0c0f14]" strokeWidth={2} />
                {unreadCount > 0 && (
                    <span
                        className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full border border-white"
                        style={{ backgroundColor: COLORS.accent }}
                    ></span>
                )}
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
                <div className="absolute right-0 mt-3 w-[360px] bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 py-0 z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-sm">
                        <h3 className="font-bold text-lg" style={{ color: COLORS.secondary }}>Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs font-semibold hover:opacity-80 transition-opacity flex items-center gap-1"
                                style={{ color: COLORS.primary }}
                            >
                                <Check className="w-3 h-3" /> Mark all read
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="py-8 text-center text-gray-500 text-sm">
                                <p>No notifications yet.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {notifications.map((notification) => (
                                    <Link
                                        key={notification.id}
                                        href={notification.link}
                                        className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none group relative`}
                                        style={{ backgroundColor: !notification.isRead ? `${COLORS.primary}10` : 'transparent' }} // 10 is approx 6% opacity hex
                                        onClick={() => {
                                            markAsRead(notification.id);
                                            setShowDropdown(false);
                                        }}
                                    >
                                        {/* Avatar & Icon */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-transparent group-hover:border-gray-200 transition-all">
                                                <Image
                                                    src={notification.actorAvatar || `https://ui-avatars.com/api/?background=random&color=fff&name=${notification.actorName}`}
                                                    alt={notification.actorName}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div
                                                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                                                style={getIconBgStyle(notification.type)}
                                            >
                                                {getIcon(notification.type)}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-[500] text-gray-600 leading-snug">
                                                <span className="font-bold" style={{ color: COLORS.secondary }}>{notification.actorName}</span>{' '}
                                                {notification.content}
                                            </p>
                                            <p className="text-xs mt-1" style={{ color: !notification.isRead ? COLORS.primary : '#9ca3af' }}>
                                                {notification.time}
                                            </p>
                                        </div>

                                        {/* Unread Dot */}
                                        {!notification.isRead && (
                                            <span
                                                className="absolute top-1/2 right-3 -translate-y-1/2 w-2 h-2 rounded-full"
                                                style={{ backgroundColor: COLORS.primary }}
                                            ></span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-2 border-t border-gray-100 bg-gray-50/50">
                        <Link
                            href="/notifications"
                            className="block w-full py-2.5 text-center text-sm font-bold hover:bg-white rounded-xl transition-all"
                            style={{ color: COLORS.secondary }}
                            onClick={() => setShowDropdown(false)}
                        >
                            View all notifications
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
