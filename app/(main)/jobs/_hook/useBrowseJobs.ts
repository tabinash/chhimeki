import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { jobRepository } from "@/repository/jobRepository";
import { BrowseJobsResponse, JobCategory } from "@/types/api/job";
import { ApiError } from "@/repository/http";

/**
 * Hook to browse jobs by geography and optional category
 * @param geography - Required: Palika or District name
 * @param options - Optional: category filter, pagination
 * @returns Query result with paginated jobs
 */
export function useBrowseJobs(
    geography: string,
    options?: {
        category?: JobCategory;
        page?: number;
        size?: number;
    }
): UseQueryResult<BrowseJobsResponse, ApiError> {
    return useQuery<BrowseJobsResponse, ApiError>({
        queryKey: ["browseJobs", geography, options?.category, options?.page, options?.size],
        queryFn: () => jobRepository.browseJobs({
            geography,
            category: options?.category,
            page: options?.page ?? 0,
            size: options?.size ?? 20,
        }),
        enabled: !!geography && geography.length > 0,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}
