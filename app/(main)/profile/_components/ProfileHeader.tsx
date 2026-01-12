"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useRef, ChangeEvent } from "react";
import {
    Edit3,
    MoreHorizontal,
    UserPlus,
    MessageCircle,
    Briefcase,
    ShoppingBag,
    ShieldCheck,
    Camera,
    Loader2,
    X
} from "lucide-react";
import { UserProfileResponse } from "@/types/api/user";
import { useUpdateProfile } from "../_hook/useUpdateProfile";
import { useFollowUser } from "../_hook/useFollowUser";
import { useUnfollowUser } from "../_hook/useUnfollowUser";
import { useDispatch } from "react-redux";
import { openChat } from "@/redux/slices/chatSlice";


interface ProfileHeaderProps {
    user: UserProfileResponse;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "posts";
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: user.name, dateOfBirth: user.dateOfBirth || "" });
    const dispatch = useDispatch();
    const followuser = useFollowUser();
    const unfollowuser = useUnfollowUser();

    // Refs for file inputs
    const profilePictureInputRef = useRef<HTMLInputElement>(null);
    const coverPictureInputRef = useRef<HTMLInputElement>(null);

    // Update profile hook
    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const isOwnProfile = user.isMine;

    // Generate username from name if not available
    const username = user.name.toLowerCase().replace(/\s+/g, '_');

    // Default images if not provided
    const profileImage = user.profilePicture || `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(user.name)}`;
    const coverImage = user.coverPicture || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop";

    // Handlers
    const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateProfile({ purpose: "cover_picture", coverPicture: file });
        }
    };

    const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateProfile({ purpose: "profile_picture", profilePicture: file });
        }
    };

    const handleProfileInfoSave = () => {
        updateProfile(
            {
                purpose: "profile_info",
                name: formData.name,
                dateOfBirth: formData.dateOfBirth
            },
            {
                onSuccess: () => {
                    setIsEditModalOpen(false);
                }
            }
        );
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
                        src={coverImage}
                        alt="Cover"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {isOwnProfile && (
                        <>
                            <input
                                ref={coverPictureInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleCoverChange}
                            />
                            <button
                                onClick={() => coverPictureInputRef.current?.click()}
                                disabled={isPending}
                                className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-xs font-bold hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Camera className="w-4 h-4" />

                                    </>
                                )}
                            </button>
                        </>
                    )}
                </div>

                {/* Profile Header Content */}
                <div className="px-6 pb-6 sm:px-10">
                    <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-12 md:-mt-16 mb-4 relative z-10">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0 mx-auto md:mx-0">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden relative">
                                <Image
                                    src={profileImage}
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Verified Badge */}
                            {user.isVerified && (
                                <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-md text-white" title="Verified Neighbor">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                            )}

                            {/* Camera Button (for own profile) */}
                            {isOwnProfile && (
                                <>
                                    <input
                                        ref={profilePictureInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleProfilePictureChange}
                                    />
                                    <button
                                        onClick={() => profilePictureInputRef.current?.click()}
                                        disabled={isPending}
                                        className="absolute bottom-2 left-2 w-8 h-8 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center border-2 border-white shadow-md text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Change profile picture"
                                    >
                                        {isPending ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Camera className="w-4 h-4" />
                                        )}
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Main Info */}
                        <div className="flex-1 text-center md:text-left pt-2 md:pt-0 md:pb-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                                <span className="text-gray-500 text-lg">(@{username})</span>
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
                                        Follow
                                    </button>
                                    <button
                                        onClick={() => dispatch(openChat({ id: user.id, name: user.name, profilePicture: user.profilePicture }))}
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
                                href={`/profile/${user.id}?tab=${tab.id}`}
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

            {/* Profile Info Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleProfileInfoSave}
                                disabled={isPending}
                                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

