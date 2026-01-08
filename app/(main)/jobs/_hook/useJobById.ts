import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { jobRepository } from "@/repository/jobRepository";
import { GetJobByIdResponse } from "@/types/api/job";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch a single job by its ID
 * @param jobId - ID of the job to fetch
 * @returns Query result with full job details
 */
export function useJobById(
    jobId: number
): UseQueryResult<GetJobByIdResponse, ApiError> {
    return useQuery<GetJobByIdResponse, ApiError>({
        queryKey: ["job", jobId],
        queryFn: () => jobRepository.getJobById(jobId),
        enabled: !!jobId && jobId > 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
