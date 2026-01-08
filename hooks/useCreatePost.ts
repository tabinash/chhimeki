import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { postRepository } from "@/repository/postRepository";
import {
    CreatePostJsonRequest,
    CreatePostWithMediaRequest,
    CreatePostJsonResponse,
    CreatePostWithMediaResponse
} from "@/types/api/post";
import { ApiError } from "@/types/api/common";

// Combined request type that supports both
type CreatePostRequest = CreatePostWithMediaRequest;

// Union response type
type CreatePostResponse = CreatePostJsonResponse | CreatePostWithMediaResponse;

export function useCreatePost(): UseMutationResult<
    CreatePostResponse,
    ApiError,
    CreatePostRequest
> {
    const queryClient = useQueryClient();

    return useMutation<CreatePostResponse, ApiError, CreatePostRequest>({
        mutationFn: async (data: CreatePostRequest) => {
            // Check if there's any media (images or video)
            const hasMedia = (data.images && data.images.length > 0) || data.video;

            if (hasMedia) {
                // Use multipart endpoint for posts with media
                console.log("Creating post with media");
                return postRepository.createPostWithMedia(data);
            } else {
                // Use JSON endpoint for text-only posts (more efficient)
                console.log("Creating text-only post");
                const jsonData: CreatePostJsonRequest = {
                    content: data.content,
                    postType: data.postType,
                    visibilityLevel: data.visibilityLevel,
                    groupId: data.groupId,
                };
                return postRepository.createPostJson(jsonData);
            }
        },
        onSuccess: (response, variables) => {
            // Invalidate group feed if it's a group post
            if (variables.groupId) {
                queryClient.invalidateQueries({ queryKey: ["groupFeed", variables.groupId] });
            }
            // Also invalidate user's posts
            queryClient.invalidateQueries({ queryKey: ["myPosts"] });
        },
    });
}
