import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { jobRepository } from "@/repository/jobRepository";
import { GetUserJobsResponse, GetUserJobsParams } from "@/types/api/job";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch current user's job listings
 * @param userId - Current user's ID
 * @param params - Optional status filter and pagination
 * @returns Query result with paginated user jobs
 */
export function useMyJobs(
    userId: number,
    params?: GetUserJobsParams
): UseQueryResult<GetUserJobsResponse, ApiError> {
    return useQuery<GetUserJobsResponse, ApiError>({
        queryKey: ["myJobs", userId, params?.status, params?.page, params?.size],
        queryFn: () => jobRepository.getUserJobs(userId, params),
        enabled: !!userId && userId > 0,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}
