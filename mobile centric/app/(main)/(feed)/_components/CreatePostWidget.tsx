"use client";

import { ImageIcon, MapPin, Smile } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CreatePostWidget() {
    return (
        <Link
            href="/post/create?bottomNav=false"
            className="block bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
            <div className="flex gap-3 items-center">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 relative">
                    <Image
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                        alt="You"
                        fill
                        className="object-cover"
                    />
                </div>

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
