import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRepository } from "@/repository/postRepository";
import { DeletePostResponse } from "@/types/api/post";
import { ApiError } from "@/repository/http";

/**
 * Hook to delete a post
 * Invalidates user posts cache on success
 * 
 * @returns Mutation for deleting a post
 */
export function useDeletePost() {
    const queryClient = useQueryClient();

    return useMutation<DeletePostResponse, ApiError, number>({
        mutationFn: (postId: number) => postRepository.deletePost(postId),
        onSuccess: (_response, postId) => {
            // Remove the specific post from cache
            queryClient.removeQueries({ queryKey: ["post", postId] });

            // Invalidate user posts list
            queryClient.invalidateQueries({ queryKey: ["userPosts"] });

            // Invalidate feeds to refresh post lists
            queryClient.invalidateQueries({ queryKey: ["generalFeed"] });
            queryClient.invalidateQueries({ queryKey: ["alertFeed"] });
            queryClient.invalidateQueries({ queryKey: ["groupFeed"] });
        },
    });
}
