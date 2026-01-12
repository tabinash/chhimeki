import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { feedRepository } from "@/repository/feedRepository";
import { GetGeneralFeedParams, GetGeneralFeedResponse } from "@/types/api/feed";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch the general feed for authenticated user
 * Includes: GENERAL, NEWS, NOTICE, GROUP posts
 * From: User's wada + palika + district + followed institutions + groups
 * 
 * @param params - Optional pagination parameters (page, size)
 * @returns Query result with paginated feed items
 */
export function useGeneralFeed(
    params?: GetGeneralFeedParams
): UseQueryResult<GetGeneralFeedResponse, ApiError> {
    return useQuery<GetGeneralFeedResponse, ApiError>({
        queryKey: ["feed", "general", params?.page, params?.size],
        queryFn: () => feedRepository.getGeneralFeed(params),
        staleTime: 1000 * 60 * 1, // 1 minute
    });
}
