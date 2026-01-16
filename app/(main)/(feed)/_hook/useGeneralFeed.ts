import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { feedRepository } from "@/repository/feedRepository";
import { GetGeneralFeedResponse } from "@/types/api/feed";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch the general feed with infinite scroll support
 * Includes: GENERAL, NEWS, NOTICE, GROUP posts
 * From: User's wada + palika + district + followed institutions + groups
 *
 * @param size - Number of items per page (default: 20)
 * @returns Infinite query result with paginated feed items
 */
export function useGeneralFeed(
    size: number = 20
): UseInfiniteQueryResult<{ pages: GetGeneralFeedResponse[]; pageParams: number[] }, ApiError> {
    return useInfiniteQuery<GetGeneralFeedResponse, ApiError, { pages: GetGeneralFeedResponse[]; pageParams: number[] }, string[], number>({
        queryKey: ["feed", "general"],
        queryFn: ({ pageParam }) => feedRepository.getGeneralFeed({ page: pageParam, size }),
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
