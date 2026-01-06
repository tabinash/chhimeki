import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { authRepository } from "@/repository/authRepository";
import { ApiError } from "@/repository/http";

/**
 * Hook for user logout
 * @returns Mutation object with logout function and state
 */
export function useLogout(): UseMutationResult<void, ApiError, void> {
    return useMutation<void, ApiError, void>({
        mutationKey: ["logout"],
        mutationFn: () => authRepository.logout(),
        onSuccess: () => {
            // Clear all auth data
            if (typeof window !== "undefined") {
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
            }
        },
        onError: (error: ApiError) => {
            console.error("Logout failed:", error.message);
            // Even if logout fails on backend, clear local state
            if (typeof window !== "undefined") {
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
            }
        },
    });
}
