"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useUpdateProfile } from "../_hook";
import { AvatarWithFallback } from "@/components/shared-component/AvatarWithFallback";

export default function ProfileEditPage() {
    const router = useRouter();
    const { user, isLoading: userLoading } = useUser();
    const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();

    const [formData, setFormData] = useState({
        name: "",
        dateOfBirth: "",
    });

    // Initialize form data when user loads
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                dateOfBirth: user.dateOfBirth || "",
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        if (!formData.name.trim()) {
            alert("Name is required");
            return;
        }

        updateProfile(
            {
                purpose: "profile_info",
                name: formData.name.trim(),
                dateOfBirth: formData.dateOfBirth || undefined,
            },
            {
                onSuccess: () => {
                    router.push(`/profile/${user?.id}`);
                },
                onError: (error) => {
                    console.error("Failed to update profile:", error);
                    alert("Failed to update profile. Please try again.");
                },
            }
        );
    };

    // Loading state
    if (userLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    // Not logged in
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Please log in to edit your profile</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-[#e4e1dd] border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-white/50 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <h1 className="text-[17px] font-bold text-gray-900">Edit Profile</h1>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 bg-blue-600 text-white rounded-full text-[15px] font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSaving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-md mx-auto">
                {/* Profile Preview */}
                <div className="bg-white p-6 mb-2">
                    <h2 className="text-[13px] font-bold text-gray-500 uppercase tracking-wide mb-4">Profile</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                            <AvatarWithFallback
                                src={user.profilePicture}
                                name={formData.name || user.name}
                                size={64}
                            />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-[15px]">{formData.name || user.name}</p>
                            <p className="text-[13px] text-gray-500">
                                {user.wada}, {user.palika}
                            </p>
                        </div>
                    </div>
                    <p className="text-[13px] text-gray-400 mt-3">
                        To change your profile or cover photo, go to your profile page and tap the camera icon.
                    </p>
                </div>

                {/* Personal Information */}
                <div className="bg-white p-6 mb-2">
                    <h2 className="text-[13px] font-bold text-gray-500 uppercase tracking-wide mb-4">Personal Information</h2>
                    <div className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-[15px] font-bold text-gray-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-[15px] font-bold text-gray-700 mb-2">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <p className="text-[13px] text-gray-500 mt-1">
                                Your date of birth is used for age verification and will not be shown publicly.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Read-only Information */}
                <div className="bg-white p-6 mb-2">
                    <h2 className="text-[13px] font-bold text-gray-500 uppercase tracking-wide mb-4">Account Information</h2>
                    <div className="space-y-3 text-[15px]">
                        {user.phone && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Phone</span>
                                <span className="text-gray-900 font-medium">{user.phone}</span>
                            </div>
                        )}
                        {user.email && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Email</span>
                                <span className="text-gray-900 font-medium">{user.email}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-gray-500">Location</span>
                            <span className="text-gray-900 font-medium">{user.wada}, {user.palika}, {user.district}</span>
                        </div>
                    </div>
                    <p className="text-[13px] text-gray-400 mt-3">
                        Contact and location information cannot be changed. Please contact support if you need to update these details.
                    </p>
                </div>
            </div>
        </div>
    );
}
