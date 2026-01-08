"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    Edit3,
    Camera,
    MessageCircle,
    ShieldCheck,
    Loader2
} from "lucide-react";
import { UserProfileResponse } from "@/types/api/user";
import { AvatarWithFallback } from "@/components/shared-component/AvatarWithFallback";
import { useUpdateProfilePicture, useUpdateCoverPicture } from "../_hook";

interface ProfileHeaderProps {
    user: UserProfileResponse;
    isOwnProfile: boolean;
}

export default function ProfileHeader({ user, isOwnProfile }: ProfileHeaderProps) {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "posts";

    // File input refs
    const profilePictureInputRef = useRef<HTMLInputElement>(null);
    const coverPictureInputRef = useRef<HTMLInputElement>(null);

    // Mutation hooks
    const { mutate: updateProfilePicture, isPending: isUploadingProfile } = useUpdateProfilePicture();
    const { mutate: updateCoverPicture, isPending: isUploadingCover } = useUpdateCoverPicture();

    const tabs = [
        { id: "about", label: "About" },
        { id: "posts", label: "Posts" },
        { id: "marketplace", label: "Marketplace" },
        { id: "jobs", label: "Jobs" },
    ];

    // Default cover image if none provided
    const coverImage = user.coverPicture || "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=400&fit=crop";

    // Handle profile picture selection
    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateProfilePicture(file, {
                onError: (error) => {
                    console.error("Failed to upload profile picture:", error);
                    alert("Failed to upload profile picture. Please try again.");
                },
            });
        }
    };

    // Handle cover picture selection
    const handleCoverPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateCoverPicture(file, {
                onError: (error) => {
                    console.error("Failed to upload cover picture:", error);
                    alert("Failed to upload cover picture. Please try again.");
                },
            });
        }
    };

    return (
        <div className="bg-white pb-1">
            {/* Hidden file inputs */}
            <input
                type="file"
                ref={profilePictureInputRef}
                onChange={handleProfilePictureChange}
                accept="image/*"
                className="hidden"
            />
            <input
                type="file"
                ref={coverPictureInputRef}
                onChange={handleCoverPictureChange}
                accept="image/*"
                className="hidden"
            />

            {/* Cover Photo - Edge to Edge */}
            <div className="relative h-48 md:h-64 bg-gray-100">
                <Image
                    src={coverImage}
                    alt="Cover"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/10" />

                {/* Cover picture upload button */}
                {isOwnProfile && (
                    <button
                        onClick={() => coverPictureInputRef.current?.click()}
                        disabled={isUploadingCover}
                        className="absolute bottom-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors disabled:opacity-50 hover:cursor-pointer z-10"
                    >
                        {isUploadingCover ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Edit3 className="w-4 h-4" />
                        )}
                    </button>
                )}
            </div>

            {/* Profile Info */}
            <div className="px-4 relative">
                {/* Avatar & Actions Row */}
                <div className="flex justify-between items-end -mt-10 mb-4">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                            <AvatarWithFallback
                                src={user.profilePicture}
                                name={user.name}
                                size={96}
                            />
                        </div>

                        {/* Profile picture upload button */}
                        {isOwnProfile && (
                            <button
                                onClick={() => profilePictureInputRef.current?.click()}
                                disabled={isUploadingProfile}
                                className="absolute bottom-1 right-1 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 hover:cursor-pointer"
                            >
                                {isUploadingProfile ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                    <Camera className="w-3.5 h-3.5" />
                                )}
                            </button>
                        )}

                        {user.isVerified && !isOwnProfile && (
                            <div className="absolute bottom-1 right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white text-white">
                                <ShieldCheck className="w-3.5 h-3.5" />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 mb-1">
                        {isOwnProfile ? (
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

                {/* Name & Location */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">{user.name}</h1>
                    <p className="text-gray-500 font-medium">
                        {user.wada}, {user.palika}, {user.district}
                    </p>

                    {/* User Type Badge */}
                    {user.userType !== "GENERAL" && (
                        <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-bold ${user.userType === "GOVERNMENT_OFFICE"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                            }`}>
                            {user.userType === "GOVERNMENT_OFFICE" ? "Government Office" : "Business"}
                        </span>
                    )}

                    {/* Stats Row */}
                    <div className="flex items-center gap-6 mt-4 pb-2">
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-gray-900">--</span>
                            <span className="text-gray-500 text-xs">Followers</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-gray-900">--</span>
                            <span className="text-gray-500 text-xs">Following</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-6 border-b border-gray-300 -mx-4 px-4 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.id}
                            href={`/profile/${user.id}?tab=${tab.id}`}
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
