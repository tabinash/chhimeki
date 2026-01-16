import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRepository } from "@/repository/userRepository";
import { UpdateProfileRequest, UpdateProfileResponse } from "@/types/api/user";
import { ApiError } from "@/repository/http";

/**
 * Unified hook to update user profile
 * Supports updating:
 * - Profile info only (name, dateOfBirth)
 * - Profile picture only
 * - Cover picture only
 * - Any combination of the above
 * 
 * Invalidates user profile cache on success
 */
export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation<UpdateProfileResponse, ApiError, UpdateProfileRequest>({
        mutationFn: (data: UpdateProfileRequest) => userRepository.updateProfile(data),
        onSuccess: (response) => {
            // Invalidate user profile cache to refresh data
            if (response.data?.id) {
                queryClient.invalidateQueries({ queryKey: ["userProfile", response.data.id] });
            }
            // Also invalidate current user cache
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
    });
}
