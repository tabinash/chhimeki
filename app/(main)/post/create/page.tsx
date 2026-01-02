"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, X, ImageIcon, MapPin, Smile, AlertTriangle, PawPrint, Megaphone } from "lucide-react";
import Image from "next/image";

export default function CreatePostPage() {
    const router = useRouter();
    const [postType, setPostType] = useState<"general" | "alert" | "lost-found" | "notice">("general");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [location, setLocation] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleRemoveImage = () => {
        setPreviewUrl(null);
    };

    const handlePost = () => {
        // Handle post submission
        console.log({ postType, title, content, location, images });
        router.back();
    };

    const postTypes = [
        { id: "general", label: "General", icon: Smile, color: "blue" },
        { id: "alert", label: "Alert", icon: AlertTriangle, color: "red" },
        { id: "lost-found", label: "Lost & Found", icon: PawPrint, color: "orange" },
        { id: "notice", label: "Notice", icon: Megaphone, color: "green" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => router.back()}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">Create Post</h1>
                    <button
                        onClick={handlePost}
                        disabled={!content.trim()}
                        className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${content.trim()
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-100 text-gray-400"
                            }`}
                    >
                        Post
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative">
                        <Image
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                            alt="You"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm">You</h3>
                        <p className="text-xs text-gray-500">Posting to your neighborhood</p>
                    </div>
                </div>

                {/* Post Type Selector */}
                <div className="bg-white rounded-xl p-3 border border-gray-200">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                        Post Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {postTypes.map((type) => {
                            const Icon = type.icon;
                            const isSelected = postType === type.id;

                            return (
                                <button
                                    key={type.id}
                                    onClick={() => setPostType(type.id as any)}
                                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${isSelected
                                        ? `border-${type.color}-500 bg-${type.color}-50`
                                        : "border-gray-200 bg-white hover:bg-gray-50"
                                        }`}
                                >
                                    <Icon
                                        className={`w-5 h-5 ${isSelected ? `text-${type.color}-600` : "text-gray-400"
                                            }`}
                                    />
                                    <span
                                        className={`text-sm font-semibold ${isSelected ? `text-${type.color}-700` : "text-gray-600"
                                            }`}
                                    >
                                        {type.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Title (Optional) */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <input
                        type="text"
                        placeholder="Add a title (optional)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-lg font-bold text-gray-900 placeholder:text-gray-400 outline-none"
                    />
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <textarea
                        placeholder="What's happening in your area?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={6}
                        className="w-full text-sm text-gray-800 placeholder:text-gray-400 outline-none resize-none"
                    />
                </div>

                {/* Image Upload */}
                {previewUrl ? (
                    <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                        <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                        <button
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <label className="block bg-white rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Add Photo</p>
                                <p className="text-xs text-gray-500">Tap to upload an image</p>
                            </div>
                        </div>
                    </label>
                )}

                {/* Location */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Add location (e.g., Ward 4, Baneshwor)"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="flex-1 text-sm text-gray-800 placeholder:text-gray-400 outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
