"use client";

import { ImageIcon, MapPin, Smile } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { AvatarWithFallback } from "@/components/shared-component/AvatarWithFallback";

export default function CreatePostWidget() {
    const { user } = useUser();

    return (
        <Link
            href="/post/create?bottomNav=false"
            className="block bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
            <div className="flex gap-3 items-center">
                {/* Avatar */}
                <AvatarWithFallback
                    src={user?.profilePicture}
                    name={user?.name}
                    size={40}
                    className="flex-shrink-0"
                />

                {/* Input Placeholder */}
                <div className="flex-1 bg-gray-50 rounded-full px-4 py-3 flex items-center">
                    <span className="text-sm text-gray-500">What's happening in your area?</span>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-gray-500">
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-xs font-medium">Photo</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-medium">Location</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                    <Smile className="w-4 h-4" />
                    <span className="text-xs font-medium">Feeling</span>
                </div>
            </div>
        </Link>
    );
}
