import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRepository } from "@/repository/userRepository";
import { UpdateProfileRequest, UpdateProfileResponse, UpdateProfilePictureResponse, UpdateCoverPictureResponse } from "@/types/api/user";
import { ApiError } from "@/repository/http";

/**
 * Hook to update user profile (name and date of birth)
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

/**
 * Hook to update user profile picture
 * Invalidates user profile cache on success
 */
export function useUpdateProfilePicture() {
    const queryClient = useQueryClient();

    return useMutation<UpdateProfilePictureResponse, ApiError, File>({
        mutationFn: (file: File) => userRepository.updateProfilePicture(file),
        onSuccess: (response) => {
            if (response.data?.id) {
                queryClient.invalidateQueries({ queryKey: ["userProfile", response.data.id] });
            }
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
    });
}

/**
 * Hook to update user cover picture
 * Invalidates user profile cache on success
 */
export function useUpdateCoverPicture() {
    const queryClient = useQueryClient();

    return useMutation<UpdateCoverPictureResponse, ApiError, File>({
        mutationFn: (file: File) => userRepository.updateCoverPicture(file),
        onSuccess: (response) => {
            if (response.data?.id) {
                queryClient.invalidateQueries({ queryKey: ["userProfile", response.data.id] });
            }
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
    });
}
