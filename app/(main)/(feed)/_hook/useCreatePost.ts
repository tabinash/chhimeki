import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { postRepository } from "@/repository/postRepository";
import { CreatePostJsonRequest, CreatePostJsonResponse } from "@/types/api/post";
import { ApiError } from "@/repository/http";

/**
 * Hook to create a text-only post (no media)
 * Uses createPostJson API
 * Invalidates feed queries on success
 */
export function useCreatePost(): UseMutationResult<
    CreatePostJsonResponse,
    ApiError,
    CreatePostJsonRequest
> {
    const queryClient = useQueryClient();

    return useMutation<CreatePostJsonResponse, ApiError, CreatePostJsonRequest>({
        mutationFn: (data) => postRepository.createPostJson(data),
        onSuccess: (response) => {
            console.log("post create response", response)
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
            console.error("Failed to create post:", error);
        },
    });
}
