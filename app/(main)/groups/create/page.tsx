"use client";

import { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateGroup } from "../_hook";

export default function CreateGroupPage() {
    const router = useRouter();
    const { mutate: createGroup, isPending } = useCreateGroup();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState<string>("");
    const [coverPreview, setCoverPreview] = useState<string>("");

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setProfileImage(file);
        const reader = new FileReader();
        reader.onloadend = () => setProfilePreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setCoverImage(file);
        const reader = new FileReader();
        reader.onloadend = () => setCoverPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createGroup(
            {
                name: formData.name,
                description: formData.description || undefined,
                profileImage: profileImage || undefined,
                coverImage: coverImage || undefined,
            },
            {
                onSuccess: () => {
                    router.back();
                },
                onError: (error) => {
                    alert(`Failed to create group: ${error.message}`);
                },
            }
        );
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Mobile Header */}
            <div className="sticky bg-[#e4e1dd] top-0 z-10 border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-full bg-gray-100 active:bg-gray-200"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                <h1 className="text-[17px] font-bold text-gray-900">
                    Create Group
                </h1>

                {/* CREATE BUTTON */}
                <button
                    type="submit"
                    form="create-group-form"
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-full font-bold text-[15px] transition-all active:scale-95 flex items-center gap-1.5"
                >
                    {isPending ? "Creating..." : "Create"}
                </button>
            </div>

            {/* Form */}
            <form
                id="create-group-form"
                onSubmit={handleSubmit}
                className="flex-1 px-4 py-5 space-y-5"
            >
                {/* Cover Image */}
                <div>
                    <label className="block text-[15px] font-bold text-gray-700 mb-2">
                        Cover Image (Optional)
                    </label>
                    <div className="relative h-32 bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300">
                        {coverPreview ? (
                            <img
                                src={coverPreview}
                                alt="Cover"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <ImageIcon className="w-7 h-7 mb-1" />
                                <span className="text-[13px]">
                                    Tap to upload cover
                                </span>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverImageChange}
                            className="absolute inset-0 opacity-0"
                        />
                    </div>
                </div>

                {/* Profile Image */}
                <div>
                    <label className="block text-[15px] font-bold text-gray-700 mb-2">
                        Profile Image (Optional)
                    </label>
                    <div className="flex items-center gap-3">
                        <div className="relative w-20 h-20 bg-gray-100 rounded-full overflow-hidden border-2 border-dashed border-gray-300">
                            {profilePreview ? (
                                <img
                                    src={profilePreview}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <Upload className="w-5 h-5" />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfileImageChange}
                                className="absolute inset-0 opacity-0"
                            />
                        </div>
                        <p className="text-[13px] text-gray-500 leading-tight">
                            Upload a profile picture for your group
                        </p>
                    </div>
                </div>

                {/* Group Name */}
                <div>
                    <label className="block text-[15px] font-bold text-gray-700 mb-1.5">
                        Group Name *
                    </label>
                    <input
                        type="text"
                        required
                        maxLength={100}
                        placeholder="e.g. Baneshwor Community"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-black"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-[15px] font-bold text-gray-700 mb-1.5">
                        Description (Optional)
                    </label>
                    <textarea
                        rows={4}
                        maxLength={500}
                        placeholder="Describe what your group is about..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[15px] resize-none focus:outline-none focus:ring-2 focus:ring-black"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                    />
                    <div className="text-[13px] text-gray-400 mt-1 text-right">
                        {formData.description.length}/500
                    </div>
                </div>
            </form>
        </div>
    );
}
