import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { authRepository } from "@/repository/authRepository";
import { RefreshTokenRequest, RefreshTokenResponse } from "@/types/api/auth";
import { ApiError } from "@/repository/http";

/**
 * Hook for refreshing access token
 * @returns Mutation object with refresh function and state
 */
export function useRefreshToken(): UseMutationResult<RefreshTokenResponse, ApiError, RefreshTokenRequest> {
    return useMutation<RefreshTokenResponse, ApiError, RefreshTokenRequest>({
        mutationKey: ["refreshToken"],
        mutationFn: (request: RefreshTokenRequest) => authRepository.refreshToken(request),
        onSuccess: (data) => {
            // Update tokens in localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem("accessToken", data.data.accessToken);
                localStorage.setItem("refreshToken", data.data.refreshToken);
            }
        },
        onError: (error: ApiError) => {
            console.error("Token refresh failed:", error.message);
            // Clear auth state on refresh failure
            if (typeof window !== "undefined") {
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
            }
        },
    });
}
