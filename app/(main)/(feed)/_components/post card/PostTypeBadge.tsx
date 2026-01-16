"use client";

import { AlertTriangle, PawPrint, Megaphone, Newspaper } from "lucide-react";
import { FeedItemResponse } from "@/types/api/feed";

interface PostTypeBadgeProps {
    postType: FeedItemResponse["postType"];
}

export default function PostTypeBadge({ postType }: PostTypeBadgeProps) {
    if (postType === "GENERAL" || postType === "GROUP") return null;

    const badges = {
        ALERT: {
            icon: AlertTriangle,
            label: "Critical Alert",
            bgColor: "bg-red-50",
            textColor: "text-red-600"
        },
        LOST_FOUND: {
            icon: PawPrint,
            label: "Lost & Found",
            bgColor: "bg-orange-50",
            textColor: "text-orange-600"
        },
        NOTICE: {
            icon: Megaphone,
            label: "Community Notice",
            bgColor: "bg-green-50",
            textColor: "text-green-600"
        },
        NEWS: {
            icon: Newspaper,
            label: "Local News",
            bgColor: "bg-blue-50",
            textColor: "text-blue-600"
        }
    };

    const badge = badges[postType as keyof typeof badges];
    if (!badge) return null;

    const Icon = badge.icon;

    return (
        <div className="px-4 pt-3 pb-1">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${badge.bgColor} rounded-full`}>
                <Icon className={`w-3.5 h-3.5 ${badge.textColor}`} />
                <span className={`text-[11px] font-bold ${badge.textColor} uppercase tracking-wide`}>
                    {badge.label}
                </span>
            </div>
        </div>
    );
}
