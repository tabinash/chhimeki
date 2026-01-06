"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    Edit3,
    MoreHorizontal,
    UserPlus,
    MessageCircle,
    ShieldCheck
} from "lucide-react";
import { UserProfile } from "@/data/mockProfileData";

interface ProfileHeaderProps {
    user: UserProfile;
    isOwnProfile: boolean;
}

export default function ProfileHeader({ user, isOwnProfile }: ProfileHeaderProps) {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "posts";

    const tabs = [
        { id: "about", label: "About" },
        { id: "posts", label: "Posts" },
        { id: "marketplace", label: "Marketplace" },
        { id: "jobs", label: "Jobs" },
    ];

    return (
        <div className="bg-white pb-1">
            {/* Cover Photo - Edge to Edge */}
            <div className="relative h-48 md:h-64 bg-gray-100">
                <Image
                    src={user.cover}
                    alt="Cover"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/10" />

                {isOwnProfile && (
                    <button className="absolute bottom-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors">
                        <Edit3 className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Profile Info */}
            <div className="px-4 relative">
                {/* Avatar & Actions Row */}
                <div className="flex justify-between items-end -mt-10 mb-4">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden relative">
                            <Image
                                src={user.avatar}
                                alt={user.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {user.isVerified && (
                            <div className="absolute bottom-1 right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white text-white">
                                <ShieldCheck className="w-3.5 h-3.5" />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 mb-1">
                        {!isOwnProfile ? (
                            <Link
                                href="/profile/edit"
                                className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full text-sm font-bold border border-gray-200 hover:bg-gray-200 transition-colors"
                            >
                                Edit Profile
                            </Link>
                        ) : (
                            <>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold shadow-sm">
                                    Follow
                                </button>
                                <Link href={`/messages/${user.id}`} className="p-2 bg-gray-100 text-gray-900 rounded-full border border-gray-200">
                                    <MessageCircle className="w-5 h-5" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Name & Username */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">{user.name}</h1>
                    <p className="text-gray-500 font-medium">@{user.username}</p>
                    {user.bio && (
                        <p className="mt-3 text-gray-700 text-sm leading-relaxed">{user.bio}</p>
                    )}

                    {/* Stats Row */}
                    <div className="flex items-center gap-6 mt-4 pb-2">
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-gray-900">1.2k</span>
                            <span className="text-gray-500 text-xs">Followers</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-gray-900">850</span>
                            <span className="text-gray-500 text-xs">Following</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-6 border-b border-gray-300 -mx-4 px-4 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.id}
                            href={`/profile?${isOwnProfile ? "" : `user=${user.id}&`}tab=${tab.id}`}
                            className={`relative py-3 text-base font-bold whitespace-nowrap transition-colors ${activeTab === tab.id
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
