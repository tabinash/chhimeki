import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { authRepository } from "@/repository/authRepository";
import { RegisterRequest, RegisterResponse } from "@/types/api/auth";
import { ApiError } from "@/repository/http";

/**
 * Hook for user registration (Step 1: Send OTP)
 * Does NOT auto-login - only sends OTP
 * @returns Mutation object with register function and state
 */
export function useRegister(): UseMutationResult<RegisterResponse, ApiError, RegisterRequest> {
    return useMutation<RegisterResponse, ApiError, RegisterRequest>({
        mutationKey: ["register"],
        mutationFn: (data: RegisterRequest) => authRepository.register(data),
        onSuccess: (data) => {
            console.log("OTP sent to:", data.data.identifier);
        },
        onError: (error: ApiError) => {
            console.error("Registration failed:", error.message);
        },
    });
}
