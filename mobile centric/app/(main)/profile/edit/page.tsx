"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Save, Camera } from "lucide-react";
import { currentUser } from "@/data/mockProfileData";

export default function ProfileEditPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: currentUser.name,
        username: currentUser.username,
        bio: currentUser.bio,
        phone: currentUser.phone,
        ward: currentUser.ward,
        city: currentUser.city,
        tole: currentUser.tole,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        // TODO: Save data to backend
        console.log("Saving profile data:", formData);
        router.push("/profile");
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">Edit Profile</h1>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Save
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-md mx-auto">
                {/* Profile Photo Section */}
                <div className="bg-white p-6 mb-2">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Profile Photo</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                                <Image
                                    src={currentUser.avatar}
                                    alt="Profile"
                                    width={80}
                                    height={80}
                                    className="object-cover"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-colors">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{currentUser.name}</h3>
                            <p className="text-sm text-gray-500">@{currentUser.username}</p>
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white p-6 mb-2">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Personal Information</h2>
                    <div className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="@username"
                            />
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                placeholder="Tell us about yourself..."
                            />
                            <p className="text-xs text-gray-500 mt-1">{formData.bio.length} / 160 characters</p>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white p-6 mb-2">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Contact</h2>
                    <div className="space-y-4">
                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="+977 98XXXXXXXX"
                            />
                        </div>
                    </div>
                </div>

                {/* Location Information */}
                <div className="bg-white p-6 mb-2">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Location</h2>
                    <div className="space-y-4">
                        {/* City */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Kathmandu"
                            />
                        </div>

                        {/* Ward */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Ward
                            </label>
                            <input
                                type="text"
                                name="ward"
                                value={formData.ward}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ward 4"
                            />
                        </div>

                        {/* Tole/Area */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Tole / Area
                            </label>
                            <input
                                type="text"
                                name="tole"
                                value={formData.tole}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Baneshwor"
                            />
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white p-6 mb-4">
                    <h2 className="text-sm font-bold text-red-600 uppercase tracking-wide mb-4">Danger Zone</h2>
                    <button className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}
