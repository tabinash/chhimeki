import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { authRepository } from "@/repository/authRepository";
import { LoginRequest, LoginResponse } from "@/types/api/auth";
import { ApiError } from "@/repository/http";

/**
 * Hook for user login
 * @returns Mutation object with login function and state
 */
export function useLogin(): UseMutationResult<LoginResponse, ApiError, LoginRequest> {
    return useMutation<LoginResponse, ApiError, LoginRequest>({
        mutationKey: ["login"],
        mutationFn: (credentials: LoginRequest) => authRepository.login(credentials),
        onSuccess: (data) => {
            // Store user data in localStorage for quick access
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(data.data.user));
                localStorage.setItem("accessToken", data.data.tokens.accessToken);
                localStorage.setItem("refreshToken", data.data.tokens.refreshToken);
            }
        },
        onError: (error: ApiError) => {
            console.error("Login failed:", error.message);
        },
    });
}
