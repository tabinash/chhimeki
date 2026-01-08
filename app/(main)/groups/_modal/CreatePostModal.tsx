"use client";

import { useState } from "react";
import { X, Image as ImageIcon, Send, Video as VideoIcon } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useCreatePost } from "@/hooks/useCreatePost";
import Image from "next/image";

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    groupId: number;
}

export default function CreatePostModal({ isOpen, onClose, groupId }: CreatePostModalProps) {
    const { user } = useUser();
    const createPost = useCreatePost();

    const [content, setContent] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [video, setVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string>("");

    if (!isOpen) return null;

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (video) {
            alert("You can't add both images and video. Please remove the video first.");
            return;
        }

        const files = Array.from(e.target.files || []);
        if (files.length + images.length > 5) {
            alert("You can only upload up to 5 images");
            return;
        }

        setImages(prev => [...prev, ...files]);

        // Generate previews
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (images.length > 0) {
            alert("You can't add both images and video. Please remove the images first.");
            return;
        }

        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (max 100MB for video)
        const maxSize = 100 * 1024 * 1024; // 100MB
        if (file.size > maxSize) {
            alert("Video file is too large. Maximum size is 100MB.");
            return;
        }

        setVideo(file);

        // Generate preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setVideoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeVideo = () => {
        setVideo(null);
        setVideoPreview("");
    };

    const handlePost = () => {
        if (!content.trim() && images.length === 0 && !video) {
            alert("Please write something or add an image/video");
            return;
        }

        createPost.mutate(
            {
                content: content.trim() || undefined,
                postType: "GROUP",
                groupId: groupId,
                images: images.length > 0 ? images : undefined,
                video: video || undefined,
            },
            {
                onSuccess: () => {
                    // Reset form
                    setContent("");
                    setImages([]);
                    setImagePreviews([]);
                    setVideo(null);
                    setVideoPreview("");
                    onClose();
                },
                onError: (error) => {
                    alert(`Failed to create post: ${error.message}`);
                },
            }
        );
    };

    const hasMedia = images.length > 0 || video !== null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Create Post</h2>
                    <button
                        onClick={onClose}
                        disabled={createPost.isPending}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                            {user?.profilePicture ? (
                                <Image
                                    src={user.profilePicture}
                                    alt={user.name}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                            )}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">Posting to group</p>
                        </div>
                    </div>

                    {/* Text Input */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none mb-4"
                        rows={6}
                        maxLength={2000}
                        disabled={createPost.isPending}
                        autoFocus
                    />

                    <div className="text-xs text-gray-400 mb-4 text-right">
                        {content.length}/2000
                    </div>

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => removeImage(index)}
                                        disabled={createPost.isPending}
                                        className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Video Preview */}
                    {videoPreview && (
                        <div className="relative rounded-lg overflow-hidden mb-4">
                            <video
                                src={videoPreview}
                                controls
                                className="w-full max-h-96 bg-black"
                            />
                            <button
                                onClick={removeVideo}
                                disabled={createPost.isPending}
                                className="absolute top-2 right-2 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Add Media Buttons */}
                    <div className="border-t border-gray-100 pt-4 flex gap-2">
                        {/* Add Photos */}
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageSelect}
                            className="hidden"
                            id="modal-image-upload"
                            disabled={images.length >= 5 || video !== null || createPost.isPending}
                        />
                        <label
                            htmlFor="modal-image-upload"
                            className={`flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors ${images.length >= 5 || video !== null || createPost.isPending ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <ImageIcon className="w-5 h-5" />
                            <span className="font-medium">Photos</span>
                            {images.length > 0 && (
                                <span className="text-xs text-gray-500">({images.length}/5)</span>
                            )}
                        </label>

                        {/* Add Video */}
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoSelect}
                            className="hidden"
                            id="modal-video-upload"
                            disabled={images.length > 0 || video !== null || createPost.isPending}
                        />
                        <label
                            htmlFor="modal-video-upload"
                            className={`flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors ${images.length > 0 || video !== null || createPost.isPending ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <VideoIcon className="w-5 h-5" />
                            <span className="font-medium">Video</span>
                        </label>
                    </div>

                    {hasMedia && (
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            You can add either photos or a video, not both
                        </p>
                    )}
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        disabled={createPost.isPending}
                        className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePost}
                        disabled={createPost.isPending || (!content.trim() && images.length === 0 && !video)}
                        className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {createPost.isPending ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Posting...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Post
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
