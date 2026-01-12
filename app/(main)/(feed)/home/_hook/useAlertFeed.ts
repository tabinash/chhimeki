import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { feedRepository } from "@/repository/feedRepository";
import { GetAlertFeedParams, GetAlertFeedResponse } from "@/types/api/feed";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch the alert feed for authenticated user
 * Includes: ALERT, LOST_FOUND posts
 * From: User's wada + palika + district
 * 
 * @param params - Optional pagination parameters (page, size)
 * @returns Query result with paginated alert feed items
 */
export function useAlertFeed(
    params?: GetAlertFeedParams
): UseQueryResult<GetAlertFeedResponse, ApiError> {
    return useQuery<GetAlertFeedResponse, ApiError>({
        queryKey: ["feed", "alerts", params?.page, params?.size],
        queryFn: () => feedRepository.getAlertFeed(params),
        staleTime: 1000 * 60 * 1, // 1 minute
    });
}
