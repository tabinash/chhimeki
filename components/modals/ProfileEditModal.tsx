"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Camera, Save } from "lucide-react";
import { UserProfile } from "@/data/mockProfileData";

interface ProfileEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserProfile;
    onSave: (data: ProfileFormData) => void;
}

export interface ProfileFormData {
    name: string;
    username: string;
    bio: string;
    phone: string;
    ward: string;
    city: string;
    tole: string;
}

export default function ProfileEditModal({ isOpen, onClose, user, onSave }: ProfileEditModalProps) {
    const [formData, setFormData] = useState<ProfileFormData>({
        name: user.name,
        username: user.username,
        bio: user.bio,
        phone: user.phone,
        ward: user.ward,
        city: user.city,
        tole: user.tole,
    });

    // Reset form data when modal opens or user changes
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: user.name,
                username: user.username,
                bio: user.bio,
                phone: user.phone,
                ward: user.ward,
                city: user.city,
                tole: user.tole,
            });
        }
    }, [isOpen, user]);

    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            {/* Modal Container */}
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSave}
                            className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md shadow-blue-200"
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Profile Photo Section */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Profile Photo</h3>
                        <div className="flex items-center gap-6">
                            <div className="relative flex-shrink-0">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-4 border-gray-50">
                                    <Image
                                        src={user.avatar}
                                        alt="Profile"
                                        width={96}
                                        height={96}
                                        className="object-cover"
                                    />
                                </div>
                                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 mb-1">{user.name}</h4>
                                <p className="text-sm text-gray-500 mb-3">@{user.username}</p>
                                <button className="text-sm text-blue-600 font-semibold hover:underline">
                                    Change Photo
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Personal Information</h3>
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
                                    maxLength={160}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    placeholder="Tell us about yourself..."
                                />
                                <p className="text-xs text-gray-500 mt-1">{formData.bio.length} / 160 characters</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Contact</h3>
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

                    {/* Location Information */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Location</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <div className="md:col-span-2">
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
                </div>
            </div>

            {/* Backdrop - Click to close */}
            <div
                className="absolute inset-0 -z-10"
                onClick={onClose}
            />
        </div>
    );
}
