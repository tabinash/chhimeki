"use client";

import { useState } from "react";
import { Bell, Settings, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockNotifications, Notification } from "@/data/mockNotificationData";
import NotificationItem from "@/components/notifications/NotificationItem";

type TabType = "All" | "Unread" | "Mentions";

export default function NotificationsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>("All");

    const filteredNotifications = mockNotifications.filter((n) => {
        if (activeTab === "Unread") return !n.isRead;
        if (activeTab === "Mentions") return n.type === "mention";
        return true;
    });

    // Simple grouping logic for prototype purposes
    const today = filteredNotifications.filter(n => n.timestamp.includes('mins') || n.timestamp.includes('hour'));
    const earlier = filteredNotifications.filter(n => !n.timestamp.includes('mins') && !n.timestamp.includes('hour'));

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
                <div className="flex items-center px-4 py-4 justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.back()}
                            className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">
                            Notifications
                        </h1>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex px-4 border-b border-gray-50">
                    {(["All", "Unread", "Mentions"] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${activeTab === tab ? "text-gray-900" : "text-gray-500"
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="divide-y divide-gray-100">
                {today.length > 0 && (
                    <>
                        <div className="px-4 py-3 bg-gray-50/50">
                            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Today</h2>
                        </div>
                        {today.map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </>
                )}

                {earlier.length > 0 && (
                    <>
                        <div className="px-4 py-3 bg-gray-50/50">
                            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Earlier</h2>
                        </div>
                        {earlier.map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </>
                )}

                {filteredNotifications.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Bell className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No notifications yet</h3>
                        <p className="text-sm text-gray-500">
                            When you get notifications, they'll show up here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
