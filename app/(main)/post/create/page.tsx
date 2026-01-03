"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Image as ImageIcon, MapPin, Camera, X } from "lucide-react";
import Image from "next/image";

type PostType = "general" | "alert" | "lost-found";

export default function CreatePostPage() {
    const router = useRouter();
    const [content, setContent] = useState("");
    const [selectedType, setSelectedType] = useState<PostType>("general");
    const [images, setImages] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const POST_TYPES: { id: PostType; label: string; color: string }[] = [
        { id: "general", label: "General", color: "bg-blue-100 text-blue-700" },
        { id: "alert", label: "Alert", color: "bg-red-100 text-red-700" },
        { id: "lost-found", label: "Lost & Found", color: "bg-orange-100 text-orange-700" },
    ];

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const remainingSlots = 3 - images.length;
        const selectedFiles = Array.from(files).slice(0, remainingSlots);

        const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));

        setImages((prev) => [...prev, ...imageUrls]);

        e.target.value = ""; // reset input so same image can be selected again
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className="h-screen bg-blue-600 flex flex-col font-sans overflow-hidden">

            {/* Top Header */}
            <div className="flex-none p-6 pt-8 pb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex items-center justify-between text-white relative z-10">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">New</span>
                        <span className="text-xl font-bold text-orange-400">Post</span>
                    </div>

                    <div className="w-10" />
                </div>
            </div>

            {/* Main White Container */}
            <div className="flex-1 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden">

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 pb-44">

                    {/* Category Selector */}
                    <div className="flex gap-3 mb-6 overflow-x-auto pb-2 -mx-2 px-2">
                        {POST_TYPES.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedType(type.id)}
                                className={`
                                    px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap border transition-all
                                    ${selectedType === type.id
                                        ? `${type.color} border-transparent shadow-sm`
                                        : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                                    }
                                `}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>

                    {/* Text Area */}
                    <textarea
                        placeholder="What's happening in your neighborhood?"
                        className="w-full resize-none text-lg text-gray-800 placeholder:text-gray-400 focus:outline-none leading-relaxed mb-6"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={8}
                    />

                    {/* Image Preview */}
                    {images.length > 0 && (
                        <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2">
                            {images.map((img, i) => (
                                <div
                                    key={i}
                                    className="relative w-28 h-28 flex-shrink-0 rounded-2xl overflow-hidden border"
                                >
                                    <Image src={img} alt="Preview" fill className="object-cover" />
                                    <button
                                        onClick={() => removeImage(i)}
                                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ✅ Fixed Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 pt-4 pb-6 z-50">
                <div className="flex gap-5 mb-4">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-blue-50 transition-colors"
                    >
                        <ImageIcon className="w-5 h-5 text-gray-600" />
                    </button>

                    <button className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-green-50">
                        <Camera className="w-5 h-5 text-gray-600" />
                    </button>

                    <button className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-red-50">
                        <MapPin className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg">
                    Post to Feed
                </button>
            </div>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageSelect}
            />
        </div>
    );
}
