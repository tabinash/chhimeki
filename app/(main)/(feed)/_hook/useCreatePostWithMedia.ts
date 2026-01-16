import { useState } from "react";
import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { postRepository } from "@/repository/postRepository";
import { CreatePostWithMediaRequest, CreatePostWithMediaResponse } from "@/types/api/post";
import { ApiError } from "@/repository/http";

/**
 * Hook to create a post with media (images and/or video)
 * Uses createPostWithMedia API (multipart/form-data)
 * 
 * - Images: Max 5 files
 * - Video: Max 1 file (3 minutes limit)
 * 
 * Includes upload progress tracking (0-100%)
 * Invalidates feed queries on success
 */
export function useCreatePostWithMedia(): UseMutationResult<
    CreatePostWithMediaResponse,
    ApiError,
    CreatePostWithMediaRequest
> & { uploadProgress: number } {
    const queryClient = useQueryClient();
    const [uploadProgress, setUploadProgress] = useState(0);

    const mutation = useMutation<CreatePostWithMediaResponse, ApiError, CreatePostWithMediaRequest>({
        mutationFn: (data) => {
            // Reset progress at start
            setUploadProgress(0);
            return postRepository.createPostWithMedia(data, (progress) => {
                setUploadProgress(progress);
            });
        },
        onSuccess: () => {
            // Reset progress on success
            setUploadProgress(0);
            // Invalidate all feed queries (general + alerts) regardless of pagination
            // Using partial matching - any query starting with these keys will be invalidated
            queryClient.invalidateQueries({
                queryKey: ["feed", "general"],
                exact: false
            });
            queryClient.invalidateQueries({
                queryKey: ["feed", "alerts"],
                exact: false
            });
            // Invalidate user's posts cache
            queryClient.invalidateQueries({ queryKey: ["posts", "my"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            // Reset progress on error
            setUploadProgress(0);
            console.error("Failed to create post with media:", error);
        },
    });

    // Return mutation with uploadProgress attached
    return { ...mutation, uploadProgress };
}
