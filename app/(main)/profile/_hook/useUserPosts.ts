import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { postRepository } from "@/repository/postRepository";
import { GetUserPostsResponse, GetUserPostsParams } from "@/types/api/post";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch posts created by a specific user
 * @param userId - The ID of the user whose posts to fetch
 * @param params - Optional pagination parameters
 * @returns Query result with paginated user posts
 */
export function useUserPosts(
    userId: number,
    params?: GetUserPostsParams
): UseQueryResult<GetUserPostsResponse, ApiError> {
    return useQuery<GetUserPostsResponse, ApiError>({
        queryKey: ["userPosts", userId, params?.page, params?.size],
        queryFn: () => postRepository.getUserPosts(userId, params),
        enabled: !!userId && userId > 0,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}
