"use client";

import { Bell, Settings } from "lucide-react";
import { mockNotifications } from "@/data/mockNotificationData";
import NotificationItem from "@/components/notifications/NotificationItem";

export default function NotificationsPage() {
    return (
        <div className="w-full py-6 px-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Bell className="w-6 h-6 text-gray-700" />
                    Notifications
                </h1>
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            {/* List */}
            <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                    <div className="p-4 bg-gray-50/50 border-b border-gray-100">
                        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Recent</h2>
                    </div>
                    {mockNotifications.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </div>
            </div>
        </div>
    );
}
