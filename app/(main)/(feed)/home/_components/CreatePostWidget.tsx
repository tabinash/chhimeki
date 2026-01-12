"use client";
import { useState, useRef } from "react";
import { Image as ImageIcon, MapPin, Smile, Send, Loader2, ChevronDown, X, Plus, Video, Play, AlertTriangle, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { useCreatePost, useCreatePostWithMedia } from "../_hook";

type VisibilityLevel = "WADA" | "PALIKA" | "DISTRICT";
type PostType = "GENERAL" | "ALERT";

export default function CreatePostWidget() {
    const { user } = useUser();
    const { mutate: createPost, isPending: isPendingText } = useCreatePost();
    const { mutate: createPostWithMedia, isPending: isPendingMedia, uploadProgress } = useCreatePostWithMedia();

    const isPending = isPendingText || isPendingMedia;

    const [content, setContent] = useState("");
    const [postType, setPostType] = useState<PostType>("GENERAL");
    const [showPostTypePicker, setShowPostTypePicker] = useState(false);
    const [visibilityLevel, setVisibilityLevel] = useState<VisibilityLevel>("PALIKA");
    const [showVisibilityPicker, setShowVisibilityPicker] = useState(false);

    // Image handling
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const imageInputRef = useRef<HTMLInputElement>(null);

    // Video handling
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    // User avatar
    const userAvatar = user?.profilePicture || `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(user?.name || "User")}`;

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Can't add images if video is selected
        if (selectedVideo) {
            alert("You can't add images when a video is selected. Remove the video first.");
            return;
        }

        const totalImages = selectedImages.length + files.length;
        if (totalImages > 5) {
            alert("Maximum 5 images allowed");
            return;
        }

        setSelectedImages(prev => [...prev, ...files]);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Can't add video if images are selected
        if (selectedImages.length > 0) {
            alert("You can't add a video when images are selected. Remove images first.");
            return;
        }

        // Check video size (max 100MB as reasonable limit)
        if (file.size > 100 * 1024 * 1024) {
            alert("Video must be less than 100MB");
            return;
        }

        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }

        setSelectedVideo(file);
        setVideoPreview(URL.createObjectURL(file));
    };

    const handleRemoveImage = (index: number) => {
        URL.revokeObjectURL(imagePreviews[index]);
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveVideo = () => {
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }
        setSelectedVideo(null);
        setVideoPreview(null);
    };

    const handleReset = () => {
        setContent("");
        setPostType("GENERAL");
        imagePreviews.forEach(url => URL.revokeObjectURL(url));
        setSelectedImages([]);
        setImagePreviews([]);
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }
        setSelectedVideo(null);
        setVideoPreview(null);
    };

    const handleSubmit = () => {
        const hasContent = content.trim().length > 0;
        const hasImages = selectedImages.length > 0;
        const hasVideo = selectedVideo !== null;

        if (!hasContent && !hasImages && !hasVideo) return;

        if (hasImages || hasVideo) {
            // Use media API
            createPostWithMedia(
                {
                    content: content.trim() || undefined,
                    postType,
                    visibilityLevel,
                    images: hasImages ? selectedImages : undefined,
                    video: hasVideo ? selectedVideo : undefined,
                },
                {
                    onSuccess: () => handleReset(),
                }
            );
        } else {
            // Use JSON API for text-only
            createPost(
                {
                    content: content.trim(),
                    postType,
                    visibilityLevel,
                },
                {
                    onSuccess: () => handleReset(),
                }
            );
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey && selectedImages.length === 0 && !selectedVideo) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const postTypeOptions: { value: PostType; label: string; description: string; icon: typeof MessageSquare }[] = [
        { value: "GENERAL", label: "General", description: "Normal post for your neighborhood", icon: MessageSquare },
        { value: "ALERT", label: "Alert", description: "Urgent alert for your area", icon: AlertTriangle },
    ];

    const visibilityOptions: { value: VisibilityLevel; label: string; description: string }[] = [
        { value: "WADA", label: "Ward Only", description: "Visible to your ward" },
        { value: "PALIKA", label: "Municipality", description: "Visible to your municipality" },
        { value: "DISTRICT", label: "District", description: "Visible to entire district" },
    ];

    const currentPostType = postTypeOptions.find(p => p.value === postType);
    const currentVisibility = visibilityOptions.find(v => v.value === visibilityLevel);
    const canSubmit = content.trim().length > 0 || selectedImages.length > 0 || selectedVideo !== null;
    const hasMedia = selectedImages.length > 0 || selectedVideo !== null;

    return (
        <div className="bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 rounded-2xl p-4 shadow-sm border border-blue-100/60">
            <div className="flex gap-3 items-start">
                {/* Current User Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 relative border border-gray-100">
                    <Image src={userAvatar} alt="You" fill className="object-cover" />
                </div>

                {/* Input Area */}
                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="What's happening in your neighborhood?"
                        rows={2}
                        maxLength={2000}
                        className="w-full bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400 font-medium resize-none"
                    />
                </div>
            </div>

            {/* Image Preview Grid */}
            {imagePreviews.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                    {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                            <Image src={preview} alt={`Preview ${index + 1}`} fill className="object-cover" />
                            <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}

                    {/* Add More Button */}
                    {imagePreviews.length < 5 && (
                        <button
                            onClick={() => imageInputRef.current?.click()}
                            className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
                        >
                            <Plus className="w-6 h-6 text-gray-400" />
                        </button>
                    )}
                </div>
            )}

            {/* Video Preview */}
            {videoPreview && (
                <div className="mt-3 relative rounded-xl overflow-hidden bg-gray-900 aspect-video">
                    <video
                        src={videoPreview}
                        className="w-full h-full object-contain"
                        controls
                    />
                    <button
                        onClick={handleRemoveVideo}
                        className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 rounded-lg text-white text-xs font-bold flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        Video
                    </div>
                </div>
            )}

            {/* Upload Progress Bar */}
            {isPendingMedia && (selectedVideo || selectedImages.length > 0) && (
                <div className="mt-3 bg-gray-100 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-700">Uploading...</span>
                        <span className="text-xs font-bold text-blue-600">{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                </div>
            )}

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

            {/* Quick Actions Footer */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100/50">
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Post Type Picker */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowPostTypePicker(!showPostTypePicker);
                                setShowVisibilityPicker(false);
                            }}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors text-xs font-bold ${postType === "ALERT"
                                ? "bg-red-50 hover:bg-red-100 text-red-600"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                        >
                            {postType === "ALERT" ? (
                                <AlertTriangle className="w-3.5 h-3.5" />
                            ) : (
                                <MessageSquare className="w-3.5 h-3.5" />
                            )}
                            <span className="hidden sm:inline">{currentPostType?.label}</span>
                            <ChevronDown className="w-3 h-3" />
                        </button>

                        {showPostTypePicker && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 min-w-[200px] py-1">
                                {postTypeOptions.map((option) => {
                                    const Icon = option.icon;
                                    return (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setPostType(option.value);
                                                setShowPostTypePicker(false);
                                            }}
                                            className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors flex items-start gap-2 ${postType === option.value ? "bg-blue-50" : ""
                                                }`}
                                        >
                                            <Icon className={`w-4 h-4 mt-0.5 ${option.value === "ALERT" ? "text-red-500" : "text-gray-500"}`} />
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{option.label}</p>
                                                <p className="text-xs text-gray-500">{option.description}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Visibility Picker */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowVisibilityPicker(!showVisibilityPicker);
                                setShowPostTypePicker(false);
                            }}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors text-xs font-bold"
                        >
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{currentVisibility?.label}</span>
                            <ChevronDown className="w-3 h-3" />
                        </button>

                        {showVisibilityPicker && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 min-w-[180px] py-1">
                                {visibilityOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setVisibilityLevel(option.value);
                                            setShowVisibilityPicker(false);
                                        }}
                                        className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors ${visibilityLevel === option.value ? "bg-blue-50" : ""
                                            }`}
                                    >
                                        <p className="text-sm font-bold text-gray-900">{option.label}</p>
                                        <p className="text-xs text-gray-500">{option.description}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Photo Button */}
                    <button
                        onClick={() => imageInputRef.current?.click()}
                        disabled={selectedImages.length >= 5 || selectedVideo !== null}
                        className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                        title={selectedVideo ? "Remove video to add images" : undefined}
                    >
                        <ImageIcon className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-gray-600 hidden sm:inline">
                            Photo {selectedImages.length > 0 && `(${selectedImages.length}/5)`}
                        </span>
                    </button>

                    {/* Video Button */}
                    <button
                        onClick={() => videoInputRef.current?.click()}
                        disabled={selectedImages.length > 0 || selectedVideo !== null}
                        className="flex items-center gap-1.5 text-gray-500 hover:text-purple-600 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                        title={selectedImages.length > 0 ? "Remove images to add video" : selectedVideo ? "Already has video" : undefined}
                    >
                        <Video className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-gray-600 hidden sm:inline">
                            Video {selectedVideo && "✓"}
                        </span>
                    </button>

                    {/* Feeling Button */}

                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={!canSubmit || isPending}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="hidden sm:inline">Posting...</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            <span className="hidden sm:inline">Post</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
