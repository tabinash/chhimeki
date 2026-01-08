import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { jobRepository } from "@/repository/jobRepository";
import { CreateJobRequest, CreateJobResponse } from "@/types/api/job";
import { ApiError } from "@/repository/http";

/**
 * Hook to create a new job listing
 * @returns Mutation result with create function
 */
export function useCreateJob(): UseMutationResult<CreateJobResponse, ApiError, CreateJobRequest> {
    const queryClient = useQueryClient();

    return useMutation<CreateJobResponse, ApiError, CreateJobRequest>({
        mutationFn: (data: CreateJobRequest) => jobRepository.createJob(data),
        onSuccess: () => {
            // Invalidate browse jobs cache to show new job
            queryClient.invalidateQueries({ queryKey: ["browseJobs"] });
            // Invalidate user's jobs cache
            queryClient.invalidateQueries({ queryKey: ["myJobs"] });
        },
    });
}
