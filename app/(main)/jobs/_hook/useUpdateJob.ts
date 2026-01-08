import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { jobRepository } from "@/repository/jobRepository";
import { UpdateJobRequest, UpdateJobResponse } from "@/types/api/job";
import { ApiError } from "@/repository/http";

/**
 * Hook to update an existing job listing
 * @returns Mutation result with update function
 */
export function useUpdateJob(): UseMutationResult<
    UpdateJobResponse,
    ApiError,
    { jobId: number; data: UpdateJobRequest }
> {
    const queryClient = useQueryClient();

    return useMutation<UpdateJobResponse, ApiError, { jobId: number; data: UpdateJobRequest }>({
        mutationFn: ({ jobId, data }) => jobRepository.updateJob(jobId, data),
        onSuccess: (response, variables) => {
            // Invalidate the specific job cache
            queryClient.invalidateQueries({ queryKey: ["job", variables.jobId] });
            // Invalidate browse jobs cache
            queryClient.invalidateQueries({ queryKey: ["browseJobs"] });
            // Invalidate user's jobs cache
            queryClient.invalidateQueries({ queryKey: ["myJobs"] });
        },
    });
}
