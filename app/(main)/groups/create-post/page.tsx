"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ArrowLeft,
    Image as ImageIcon,
    Video,
    X,
    Loader2,
    AlertTriangle,
    Users,
} from "lucide-react";
import Image from "next/image";
import { useCreateGroupPost } from "../_hook/useCreateGroupPost";
import { useUser } from "@/hooks/useUser";
import { AvatarWithFallback } from "@/components/shared-component/AvatarWithFallback";

export default function CreatePostPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const groupIdParam = searchParams.get("groupId");
    const groupId = groupIdParam ? parseInt(groupIdParam, 10) : null;
    const { user } = useUser();

    // Form State
    const [content, setContent] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [video, setVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const videoInputRef = useRef<HTMLInputElement | null>(null);

    // API Hook
    const { mutate: createGroupPost, isPending } = useCreateGroupPost();



    // Image Handling
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        if (video) {
            setVideo(null);
            setVideoPreview(null);
        }

        const remainingSlots = 5 - images.length;
        const selectedFiles = Array.from(files).slice(0, remainingSlots);

        setImages((prev) => [...prev, ...selectedFiles]);
        setImagePreviews((prev) => [
            ...prev,
            ...selectedFiles.map((file) => URL.createObjectURL(file)),
        ]);

        e.target.value = "";
    };

    const removeImage = (index: number) => {
        URL.revokeObjectURL(imagePreviews[index]);
        setImages(images.filter((_, i) => i !== index));
        setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    };

    // Video Handling
    const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (images.length > 0) {
            imagePreviews.forEach((url) => URL.revokeObjectURL(url));
            setImages([]);
            setImagePreviews([]);
        }

        setVideo(file);
        setVideoPreview(URL.createObjectURL(file));
        e.target.value = "";
    };

    const removeVideo = () => {
        if (videoPreview) URL.revokeObjectURL(videoPreview);
        setVideo(null);
        setVideoPreview(null);
    };

    // Submit Handler
    const handleSubmit = () => {
        setError(null);

        if (!groupId) {
            setError("Invalid group. Please go back and try again.");
            return;
        }

        if (!content.trim() && images.length === 0 && !video) {
            setError("Please add some content, images, or a video");
            return;
        }

        createGroupPost(
            {
                content: content.trim() || undefined,
                groupId: groupId,
                images: images.length > 0 ? images : undefined,
                video: video || undefined,
            },
            {
                onSuccess: () => {
                    router.back();
                },
                onError: (err) => {
                    setError(err.message || "Failed to create post");
                },
            }
        );
    };

    return (
        <div className="min-h-screen  bg-white flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#e4e1dd] border-b border-gray-200">
                <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>

                    <span className="text-[17px] font-bold text-gray-900">Create Post</span>

                    <button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-full font-bold text-[15px] disabled:opacity-50 transition-all active:scale-95 flex items-center gap-1.5"
                    >
                        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isPending ? "Posting..." : "Post"}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 pb-24">
                <div className="max-w-md mx-auto">
                    {/* Error Message */}
                    {error && (
                        <div className="mx-4 mt-3 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[15px] font-medium flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Author Row */}
                    <div className="flex items-center gap-3 p-4">
                        <AvatarWithFallback
                            src={user?.profilePicture}
                            name={user?.name}
                            size={48}
                            className="ring-2 ring-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 text-[17px] truncate">
                                {user?.name || "Loading..."}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5 text-[15px] text-gray-500 font-medium">
                                <Users className="w-4 h-4" />
                                <span>Posting to group</span>
                            </div>
                        </div>
                    </div>

                    {/* Text Area */}
                    <div className="px-4 py-2">
                        <textarea
                            placeholder="What's happening in your neighborhood?"
                            className="w-full resize-none text-[15px] font-[500] text-gray-800 placeholder:text-gray-400 focus:outline-none leading-relaxed min-h-[200px]"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            maxLength={2000}
                            autoFocus
                        />
                    </div>


                    {/* Image Grid */}
                    {imagePreviews.length > 0 && (
                        <div className="px-4 py-3">
                            <div className={`grid gap-2 ${imagePreviews.length === 1
                                ? "grid-cols-1"
                                : imagePreviews.length === 2
                                    ? "grid-cols-2"
                                    : "grid-cols-3"
                                }`}>
                                {imagePreviews.map((url, i) => (
                                    <div
                                        key={i}
                                        className={`relative rounded-xl overflow-hidden bg-gray-100 ${imagePreviews.length === 1 ? "aspect-video" : "aspect-square"
                                            }`}
                                    >
                                        <Image src={url} alt="Preview" fill className="object-cover" />
                                        <button
                                            onClick={() => removeImage(i)}
                                            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                                {images.length < 5 && (
                                    <button
                                        onClick={() => imageInputRef.current?.click()}
                                        className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors gap-1"
                                    >
                                        <ImageIcon className="w-6 h-6" />
                                        <span className="text-xs">Add more</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Video Preview */}
                    {videoPreview && (
                        <div className="px-4 py-3">
                            <div className="relative rounded-xl overflow-hidden bg-gray-900">
                                <video
                                    src={videoPreview}
                                    className="w-full aspect-video object-contain"
                                    controls
                                />
                                <button
                                    onClick={removeVideo}
                                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                <div className="flex items-center gap-2 px-4 py-3 max-w-md mx-auto">
                    <button
                        onClick={() => imageInputRef.current?.click()}
                        disabled={!!video}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${video
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-gray-100 active:scale-95"
                            }`}
                    >
                        <ImageIcon className="w-5 h-5 text-green-600" />
                        <span className="text-[15px] font-semibold text-gray-700">Photo</span>
                        {images.length > 0 && (
                            <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                                {images.length}
                            </span>
                        )}
                    </button>

                    <div className="w-px h-6 bg-gray-200" />

                    <button
                        onClick={() => videoInputRef.current?.click()}
                        disabled={images.length > 0}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${images.length > 0
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-gray-100 active:scale-95"
                            }`}
                    >
                        <Video className="w-5 h-5 text-red-500" />
                        <span className="text-[15px] font-semibold text-gray-700">Video</span>
                        {video && (
                            <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-medium">
                                1
                            </span>
                        )}
                    </button>

                    <div className="flex-1" />

                    <span className="text-[15px] text-gray-500 font-medium">
                        {video ? "Video attached" : images.length > 0 ? `${images.length}/5 photos` : "Add media"}
                    </span>
                </div>
            </div>

            {/* Hidden File Inputs */}
            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageSelect}
            />
            <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoSelect}
            />
        </div>
    );
}
