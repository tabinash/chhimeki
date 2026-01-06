"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, X, ImageIcon, Users, Globe, Lock } from "lucide-react";
import Image from "next/image";

export default function CreateGroupPage() {
    const router = useRouter();
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [privacy, setPrivacy] = useState<"public" | "private">("public");
    const [coverImage, setCoverImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setCoverImage(url);
        }
    };

    const handleCreate = () => {
        console.log({ groupName, description, category, privacy, coverImage });
        router.back();
    };

    const categories = ["Business", "Tech", "Sports", "Arts", "Education", "Other"];

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
                    <h1 className="text-lg font-bold text-gray-900">Create Group</h1>
                    <button
                        onClick={handleCreate}
                        disabled={!groupName.trim() || !description.trim()}
                        className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${groupName.trim() && description.trim()
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-100 text-gray-400"
                            }`}
                    >
                        Create
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {/* Cover Image */}
                {coverImage ? (
                    <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                        <Image src={coverImage} alt="Cover" fill className="object-cover" />
                        <button
                            onClick={() => setCoverImage(null)}
                            className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <label className="block aspect-video bg-white rounded-2xl border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <div className="h-full flex flex-col items-center justify-center gap-2">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-semibold text-gray-900">Add Cover Image</p>
                                <p className="text-xs text-gray-500">Tap to upload</p>
                            </div>
                        </div>
                    </label>
                )}

                {/* Group Name */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <input
                        type="text"
                        placeholder="Group name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="w-full text-lg font-bold text-gray-900 placeholder:text-gray-400 outline-none"
                        autoFocus
                    />
                </div>

                {/* Description */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <textarea
                        placeholder="Describe your group..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full text-sm text-gray-800 placeholder:text-gray-400 outline-none resize-none"
                    />
                </div>

                {/* Category */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full text-sm text-gray-900 outline-none bg-transparent"
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Privacy */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide px-4 pt-4 pb-2 block">
                        Privacy
                    </label>
                    <button
                        onClick={() => setPrivacy("public")}
                        className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${privacy === "public" ? "bg-blue-50" : "hover:bg-gray-50"
                            }`}
                    >
                        <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${privacy === "public" ? "border-blue-600" : "border-gray-300"
                                }`}
                        >
                            {privacy === "public" && (
                                <div className="w-3 h-3 bg-blue-600 rounded-full" />
                            )}
                        </div>
                        <Globe className="w-5 h-5 text-gray-600" strokeWidth={2} />
                        <div className="flex-1 text-left">
                            <p className="text-sm font-semibold text-gray-900">Public</p>
                            <p className="text-xs text-gray-500">Anyone can see and join</p>
                        </div>
                    </button>
                    <div className="border-t border-gray-100" />
                    <button
                        onClick={() => setPrivacy("private")}
                        className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${privacy === "private" ? "bg-blue-50" : "hover:bg-gray-50"
                            }`}
                    >
                        <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${privacy === "private" ? "border-blue-600" : "border-gray-300"
                                }`}
                        >
                            {privacy === "private" && (
                                <div className="w-3 h-3 bg-blue-600 rounded-full" />
                            )}
                        </div>
                        <Lock className="w-5 h-5 text-gray-600" strokeWidth={2} />
                        <div className="flex-1 text-left">
                            <p className="text-sm font-semibold text-gray-900">Private</p>
                            <p className="text-xs text-gray-500">Only members can see content</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
