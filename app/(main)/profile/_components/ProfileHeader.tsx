"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
    Edit3,
    MoreHorizontal,
    UserPlus,
    MessageCircle,
    Briefcase,
    ShoppingBag,
    ShieldCheck
} from "lucide-react";
import { UserProfile } from "@/data/mockProfileData";
import ProfileEditModal, { ProfileFormData } from "@/components/modals/ProfileEditModal";
import { getChatUrl } from "@/lib/chatUtils";

interface ProfileHeaderProps {
    user: UserProfile;
    isOwnProfile: boolean;
}

export default function ProfileHeader({ user, isOwnProfile }: ProfileHeaderProps) {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "posts";
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const router = useRouter();

    const handleSaveProfile = (data: ProfileFormData) => {
        console.log("Saving profile data:", data);
        // TODO: Save to backend
    };

    const tabs = [
        { id: "posts", label: "Posts", icon: <Briefcase className="w-4 h-4" /> },
        { id: "marketplace", label: "Marketplace", icon: <ShoppingBag className="w-4 h-4" /> },
        { id: "jobs", label: "Jobs", icon: <Briefcase className="w-4 h-4" /> },
    ];

    return (
        <div className="max-w-6xl mx-auto pt-6 px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Cover Photo */}
                <div className="relative h-48 sm:h-64 md:h-80 bg-gray-100">
                    <Image
                        src={user.cover}
                        alt="Cover"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {isOwnProfile && (
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-xs font-bold hover:bg-white transition-colors flex items-center gap-2"
                        >
                            <Edit3 className="w-3 h-3" />
                            Edit Cover
                        </button>
                    )}
                </div>

                {/* Profile Header Content */}
                <div className="px-6 pb-6 sm:px-10">
                    <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-12 md:-mt-16 mb-4 relative z-10">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0 mx-auto md:mx-0">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden relative">
                                <Image
                                    src={user.avatar}
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {user.isVerified && (
                                <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-md text-white" title="Verified Neighbor">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                            )}
                        </div>

                        {/* Main Info */}
                        <div className="flex-1 text-center md:text-left pt-2 md:pt-0 md:pb-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                                <span className="text-gray-500 text-lg">(@{user.username})</span>
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 justify-center md:justify-end md:pb-4">
                            {isOwnProfile ? (
                                <>
                                    <button
                                        onClick={() => setIsEditModalOpen(true)}
                                        className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                        Edit Profile
                                    </button>
                                    <button className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-blue-200">
                                        <UserPlus className="w-4 h-4" />
                                        Connect
                                    </button>
                                    <button
                                        onClick={() => router.push(getChatUrl(user.id, { hideSidebar: true, source: "profile" }))}
                                        className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
                                        <MessageCircle className="w-4 h-4" />
                                        Message
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-1 border-t border-gray-100 pt-1 mt-6 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.id}
                                href={`/profile?${isOwnProfile ? "" : `user=${user.id}&`}tab=${tab.id}`}
                                className={`relative px-6 py-4 text-sm font-bold transition-all flex-shrink-0 ${activeTab === tab.id
                                    ? "text-blue-600"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    {tab.icon}
                                    {tab.label}
                                </span>
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full mx-4" />
                                )}
                            </Link>
                        ))}

                    </div>
                </div>
            </div>

            {/* Profile Edit Modal */}
            <ProfileEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={user}
                onSave={handleSaveProfile}
            />
        </div>
    );
}
