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
// Group Post Only Hook
// ============================================

interface CreateGroupPostParams {
    content?: string;           // Max 2000 characters
    groupId: number;            // REQUIRED for group post
    images?: File[];            // Max 5 images
    video?: File;               // Max 1 video (<= 3 min)
}

export function useCreateGroupPost() {
    const queryClient = useQueryClient();

    return useMutation<PostResponse, ApiError, CreateGroupPostParams>({
        mutationFn: async (params) => {
            const hasMedia =
                (params.images && params.images.length > 0) || params.video;

            if (hasMedia) {
                const request: CreatePostWithMediaRequest = {
                    content: params.content,
                    postType: "GROUP",
                    groupId: params.groupId,
                    images: params.images,
                    video: params.video,
                };

                const response =
                    await postRepository.createPostWithMedia(request);
                return response.data;
            }

            const request: CreatePostJsonRequest = {
                content: params.content,
                postType: "GROUP",
                groupId: params.groupId,
            };

            const response =
                await postRepository.createPostJson(request);
            return response.data;
        },

        onSuccess: (_data, variables) => {
            // Refetch group feed only (cleaner than global feed)
            queryClient.invalidateQueries({
                queryKey: ["groupFeed", variables.groupId],
            });
        },
    });
}
