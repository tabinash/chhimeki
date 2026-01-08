import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { jobRepository } from "@/repository/jobRepository";
import { GetUserJobsResponse, GetUserJobsParams } from "@/types/api/job";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch job postings created by a specific user
 * @param userId - The ID of the user whose jobs to fetch
 * @param params - Optional pagination parameters
 * @returns Query result with paginated user jobs
 */
export function useUserJobs(
    userId: number,
    params?: GetUserJobsParams
): UseQueryResult<GetUserJobsResponse, ApiError> {
    return useQuery<GetUserJobsResponse, ApiError>({
        queryKey: ["userJobs", userId, params?.page, params?.size],
        queryFn: () => jobRepository.getUserJobs(userId, params),
        enabled: !!userId && userId > 0,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}
