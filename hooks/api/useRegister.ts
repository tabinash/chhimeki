import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { authRepository } from "@/repository/authRepository";
import { RegisterRequest, RegisterResponse } from "@/types/api/auth";
import { ApiError } from "@/repository/http";

/**
 * Hook for user registration
 * @returns Mutation object with register function and state
 */
export function useRegister(): UseMutationResult<RegisterResponse, ApiError, RegisterRequest> {
    return useMutation<RegisterResponse, ApiError, RegisterRequest>({
        mutationKey: ["register"],
        mutationFn: (data: RegisterRequest) => authRepository.register(data),
        onSuccess: (data) => {
            // Auto-login on success (save tokens)
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(data.data.user));
                localStorage.setItem("accessToken", data.data.tokens.accessToken);
                localStorage.setItem("refreshToken", data.data.tokens.refreshToken);
            }
        },
        onError: (error: ApiError) => {
            console.error("Registration failed:", error.message);
        },
    });
}
