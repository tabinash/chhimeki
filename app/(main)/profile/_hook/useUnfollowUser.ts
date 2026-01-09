import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { userRepository } from "@/repository/userRepository";
import { UnfollowUserResponse } from "@/types/api/user";
import { ApiError } from "@/types/api/common";

export function useUnfollowUser(): UseMutationResult<
    UnfollowUserResponse,
    ApiError,
    number
> {
    const queryClient = useQueryClient();

    return useMutation<UnfollowUserResponse, ApiError, number>({
        mutationFn: (userId: number) => userRepository.unfollowUser(userId),
        onSuccess: () => {
            // Invalidate nearby users and institutions queries to refresh follow status
            queryClient.invalidateQueries({ queryKey: ["nearbyGeneralUsers"] });
            queryClient.invalidateQueries({ queryKey: ["nearbyInstitutions"] });
        },
    });
}
