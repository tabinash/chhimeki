"use client";

import Image from "next/image";
import { Heart, MessageCircle, UserPlus, Bell, AtSign } from "lucide-react";
import { Notification } from "@/data/mockNotificationData";

interface NotificationItemProps {
    notification: Notification;
}

export default function NotificationItem({ notification }: NotificationItemProps) {
    const getIcon = () => {
        switch (notification.type) {
            case 'like':
                return <Heart className="w-4 h-4 text-white" fill="currentColor" />;
            case 'comment':
                return <MessageCircle className="w-4 h-4 text-white" fill="currentColor" />;
            case 'follow':
                return <UserPlus className="w-4 h-4 text-white" />;
            case 'mention':
                return <AtSign className="w-4 h-4 text-white" />;
            default:
                return <Bell className="w-4 h-4 text-white" />;
        }
    };

    const getBgColor = () => {
        switch (notification.type) {
            case 'like': return 'bg-red-500';
            case 'comment': return 'bg-blue-500';
            case 'follow': return 'bg-green-500';
            case 'mention': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className={`flex items-start gap-4 p-4 transition-colors ${notification.isRead ? 'bg-white active:bg-gray-50' : 'bg-blue-50/40 active:bg-blue-100/50'}`}>
            <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image
                        src={notification.actor.avatar}
                        alt={notification.actor.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white ${getBgColor()}`}>
                    {getIcon()}
                </div>
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-[15px] text-gray-900 leading-snug">
                    <span className="font-bold">{notification.actor.name}</span> {notification.content}
                </p>
                <span className="text-xs text-gray-500 font-medium mt-1.5 block">
                    {notification.timestamp}
                </span>
            </div>

            {!notification.isRead && (
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
            )}
        </div>
    );
}
