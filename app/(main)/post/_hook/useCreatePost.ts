"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRepository } from "@/repository/postRepository";
import {
    CreatePostJsonRequest,
    CreatePostWithMediaRequest,
    PostResponse,
} from "@/types/api/post";
import { ApiError } from "@/repository/http";

// ============================================
// Create Post Hook
// ============================================
// Handles both text-only and media posts
// Uses createPostJson for text-only, createPostWithMedia for media posts

interface CreatePostParams {
    content?: string;
    postType: "GENERAL" | "ALERT" | "GROUP";
    visibilityLevel?: "WADA" | "PALIKA" | "DISTRICT";
    groupId?: number;
    images?: File[];
    video?: File;
}

export function useCreatePost() {
    const queryClient = useQueryClient();

    return useMutation<PostResponse, ApiError, CreatePostParams>({
        mutationFn: async (params: CreatePostParams) => {
            const hasMedia =
                (params.images && params.images.length > 0) || params.video;

            if (hasMedia) {
                // Use multipart form data for media posts
                const request: CreatePostWithMediaRequest = {
                    content: params.content,
                    postType: params.postType,
                    visibilityLevel: params.visibilityLevel,
                    groupId: params.groupId,
                    images: params.images,
                    video: params.video,
                };
                const response = await postRepository.createPostWithMedia(request);
                return response.data;
            } else {
                // Use JSON for text-only posts
                const request: CreatePostJsonRequest = {
                    content: params.content,
                    postType: params.postType,
                    visibilityLevel: params.visibilityLevel,
                    groupId: params.groupId,
                };
                const response = await postRepository.createPostJson(request);
                return response.data;
            }
        },
        onSuccess: () => {
            // Invalidate feed queries to refetch with new post
            queryClient.invalidateQueries({ queryKey: ["feed"] });
            queryClient.invalidateQueries({ queryKey: ["myPosts"] });
        },
    });
}
