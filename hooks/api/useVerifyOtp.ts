import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { authRepository } from "@/repository/authRepository";
import { VerifyOtpRequest, VerifyOtpResponse } from "@/types/api/auth";
import { ApiError } from "@/repository/http";

/**
 * Hook for OTP verification (Step 2: Complete registration + auto-login)
 * Stores tokens and user data on success
 * @returns Mutation object with verifyOtp function and state
 */
export function useVerifyOtp(): UseMutationResult<VerifyOtpResponse, ApiError, VerifyOtpRequest> {
    return useMutation<VerifyOtpResponse, ApiError, VerifyOtpRequest>({
        mutationKey: ["verifyOtp"],
        mutationFn: (data: VerifyOtpRequest) => authRepository.verifyOtp(data),
        onSuccess: (data) => {
            // Auto-login on success (save tokens)
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(data.data.user));
                localStorage.setItem("accessToken", data.data.tokens.accessToken);
                localStorage.setItem("refreshToken", data.data.tokens.refreshToken);
            }
        },
        onError: (error: ApiError) => {
            console.error("OTP verification failed:", error.message);
        },
    });
}
