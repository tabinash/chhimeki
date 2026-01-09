import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { authRepository } from "@/repository/authRepository";
import { ResendOtpRequest, ResendOtpResponse } from "@/types/api/auth";
import { ApiError } from "@/repository/http";

/**
 * Hook for resending OTP
 * @returns Mutation object with resendOtp function and state
 */
export function useResendOtp(): UseMutationResult<ResendOtpResponse, ApiError, ResendOtpRequest> {
    return useMutation<ResendOtpResponse, ApiError, ResendOtpRequest>({
        mutationKey: ["resendOtp"],
        mutationFn: (data: ResendOtpRequest) => authRepository.resendOtp(data),
        onSuccess: (data) => {
            console.log("OTP resent to:", data.data.identifier);
        },
        onError: (error: ApiError) => {
            console.error("Resend OTP failed:", error.message);
        },
    });
}
