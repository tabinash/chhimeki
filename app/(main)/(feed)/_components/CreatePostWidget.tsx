"use client";

import { ImageIcon, Video, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { AvatarWithFallback } from "@/components/shared-component/AvatarWithFallback";

export default function CreatePostWidget() {
    const { user } = useUser();

    return (
        <div className="bg-white border-b border-gray-200">
            {/* Main Input Area */}
            <Link
                href="/post/create?bottomNav=false"
                className="flex gap-3 items-center px-4 py-3"
            >
                {/* Avatar */}
                <AvatarWithFallback
                    src={user?.profilePicture}
                    name={user?.name}
                    size={36}
                    className="flex-shrink-0 ring-1 ring-gray-200"
                />

                {/* Input Placeholder */}
                <div className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 hover:bg-gray-50 transition-colors">
                    <span className="text-[14px] text-gray-600">
                        What&apos;s on your mind?
                    </span>
                </div>
            </Link>

            {/* Divider */}
            <div className="h-px bg-gray-200 mx-4" />

            {/* Quick Actions */}
            <div className="flex items-center justify-around px-2 py-1.5">
                <Link
                    href="/post/create?type=photo&bottomNav=false"
                    className="flex items-center gap-2 py-2.5 px-4 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                    <ImageIcon className="w-5 h-5 text-green-600" />
                    <span className="text-[13px] font-medium text-gray-700">Photo</span>
                </Link>

                <Link
                    href="/post/create?type=video&bottomNav=false"
                    className="flex items-center gap-2 py-2.5 px-4 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                    <Video className="w-5 h-5 text-red-500" />
                    <span className="text-[13px] font-medium text-gray-700">Video</span>
                </Link>

                <Link
                    href="/post/create?type=alert&bottomNav=false"
                    className="flex items-center gap-2 py-2.5 px-4 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <span className="text-[13px] font-medium text-gray-700">Alert</span>
                </Link>
            </div>
        </div>
    );
}
