"use client";

import { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { useCreateGroup } from "../_hook";

interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function CreateGroupModal({ isOpen, onClose, onSuccess }: CreateGroupModalProps) {
    const { mutate: createGroup, isPending } = useCreateGroup();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState<string>("");
    const [coverPreview, setCoverPreview] = useState<string>("");

    if (!isOpen) return null;

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setProfilePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setCoverPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
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
                    onSuccess?.();
                    onClose();
                    // Reset form
                    setFormData({ name: "", description: "" });
                    setProfileImage(null);
                    setCoverImage(null);
                    setProfilePreview("");
                    setCoverPreview("");
                },
                onError: (error) => {
                    alert(`Failed to create group: ${error.message}`);
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Create New Group</h2>
                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Cover Image */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Cover Image (Optional)
                        </label>
                        <div className="relative h-32 bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                            {coverPreview ? (
                                <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <ImageIcon className="w-8 h-8 mb-2" />
                                    <span className="text-xs">Click to upload cover image</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleCoverImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Profile Image (Optional)
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="relative w-20 h-20 bg-gray-100 rounded-full overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                                {profilePreview ? (
                                    <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <Upload className="w-6 h-6" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfileImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                            <span className="text-xs text-gray-500">
                                Upload a profile picture for your group
                            </span>
                        </div>
                    </div>

                    {/* Group Name */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">
                            Group Name *
                        </label>
                        <input
                            type="text"
                            required
                            maxLength={100}
                            placeholder="e.g. Baneshwor Community"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">
                            Description (Optional)
                        </label>
                        <textarea
                            rows={4}
                            maxLength={500}
                            placeholder="Describe what your group is about..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                        <div className="text-xs text-gray-400 mt-1 text-right">
                            {formData.description.length}/500
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 px-4 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-gray-200 disabled:opacity-50"
                        >
                            {isPending ? "Creating..." : "Create Group"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
