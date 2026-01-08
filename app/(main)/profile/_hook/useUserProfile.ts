import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { userRepository } from "@/repository/userRepository";
import { GetUserByIdResponse } from "@/types/api/user";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch a user's profile by their ID
 * @param userId - The ID of the user to fetch
 * @returns Query result with user profile data
 */
export function useUserProfile(userId: number): UseQueryResult<GetUserByIdResponse, ApiError> {
    return useQuery<GetUserByIdResponse, ApiError>({
        queryKey: ["userProfile", userId],
        queryFn: () => userRepository.getUserById(userId),
        enabled: !!userId && userId > 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
