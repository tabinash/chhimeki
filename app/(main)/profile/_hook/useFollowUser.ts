import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { userRepository } from "@/repository/userRepository";
import { FollowUserResponse } from "@/types/api/user";
import { ApiError } from "@/types/api/common";

export function useFollowUser(): UseMutationResult<
    FollowUserResponse,
    ApiError,
    number
> {
    const queryClient = useQueryClient();

    return useMutation<FollowUserResponse, ApiError, number>({
        mutationFn: (userId: number) => userRepository.followUser(userId),
        onSuccess: () => {
            // Invalidate nearby users and institutions queries to refresh follow status
            queryClient.invalidateQueries({ queryKey: ["nearbyGeneralUsers"] });
            queryClient.invalidateQueries({ queryKey: ["nearbyInstitutions"] });
        },
    });
}
