import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { feedRepository } from "@/repository/feedRepository";
import { GetAlertFeedResponse } from "@/types/api/feed";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch the alert feed with infinite scroll support
 * Includes: ALERT, LOST_FOUND posts
 * From: User's wada + palika + district
 *
 * @param size - Number of items per page (default: 20)
 * @returns Infinite query result with paginated alert feed items
 */
export function useAlertFeed(
    size: number = 20
): UseInfiniteQueryResult<{ pages: GetAlertFeedResponse[]; pageParams: number[] }, ApiError> {
    return useInfiniteQuery<GetAlertFeedResponse, ApiError, { pages: GetAlertFeedResponse[]; pageParams: number[] }, string[], number>({
        queryKey: ["feed", "alerts"],
        queryFn: ({ pageParam }) => feedRepository.getAlertFeed({ page: pageParam, size }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.pagination?.hasNext) {
                return lastPage.pagination.page + 1;
            }
            return undefined;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
    });
}
