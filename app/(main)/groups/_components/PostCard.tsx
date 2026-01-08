import Image from "next/image";
import { MapPin, MessageCircle, MoreHorizontal, Heart } from "lucide-react";

interface PostCardProps {
    userName: string;
    userAvatar: string;
    userWard: string;
    daysAgo: number;
    content?: string;
    imageUrl: string;
    likes: number;
}

export default function PostCard({
    userName,
    userAvatar,
    userWard,
    daysAgo,
    content,
    imageUrl,
    likes
}: PostCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <Image
                        src={userAvatar}
                        alt={userName}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">{userName}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        {daysAgo} days ago • <MapPin className="w-3 h-3" /> {userWard}
                    </p>
                </div>
                <button className="ml-auto text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Text Content */}
            {content && (
                <div className="px-4 pb-3">
                    <p className="text-gray-800 text-base font-[500] leading-relaxed">
                        {content}
                    </p>
                </div>
            )}

            {/* Image */}
            {imageUrl && <div className="relative aspect-video bg-gray-100">
                <Image
                    src={imageUrl}
                    alt="Post image"
                    fill
                    className="object-cover"
                />
            </div>}

            {/* Actions */}
            <div className="px-4 py-3 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 text-sm font-medium transition-colors group">
                        <Heart className="w-5 h-5 group-hover:fill-current" />
                        <span>{likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 text-sm font-medium transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>Comment</span>
                    </button>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
