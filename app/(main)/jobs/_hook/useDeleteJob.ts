import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { jobRepository } from "@/repository/jobRepository";
import { DeleteJobResponse } from "@/types/api/job";
import { ApiError } from "@/repository/http";

/**
 * Hook to delete a job listing
 * @returns Mutation result with delete function
 */
export function useDeleteJob(): UseMutationResult<DeleteJobResponse, ApiError, number> {
    const queryClient = useQueryClient();

    return useMutation<DeleteJobResponse, ApiError, number>({
        mutationFn: (jobId: number) => jobRepository.deleteJob(jobId),
        onSuccess: (_, jobId) => {
            // Remove the specific job from cache
            queryClient.removeQueries({ queryKey: ["job", jobId] });
            // Invalidate browse jobs cache
            queryClient.invalidateQueries({ queryKey: ["browseJobs"] });
            // Invalidate user's jobs cache
            queryClient.invalidateQueries({ queryKey: ["myJobs"] });
        },
    });
}
