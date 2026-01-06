import { api } from "./http";
import {
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
} from "@/types/api/auth";

// ============================================
// Auth Repository
// ============================================

export const authRepository = {
    /**
     * Login with identifier (phone/email) and password
     * @param credentials - User login credentials
     * @returns Login response with user data and tokens
     */
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        console.log("Login Credentials:", credentials);
        const response = await api.post<LoginResponse>("/auth/login", credentials);
        console.log("Login Response:", response);
        return response;
    },

    /**
     * Refresh access token using refresh token
     * @param refreshToken - The refresh token
     * @returns New access and refresh tokens
     */
    refreshToken: async (refreshToken: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
        const response = await api.post<RefreshTokenResponse>("/auth/refresh", refreshToken);
        console.log("Refresh Token Response:", response);
        return response;
    },

    /**
     * Logout (optional - depends on backend implementation)
     * Clears auth cookies on the server
     */
    logout: async (): Promise<void> => {
        const response = await api.post<void>("/auth/logout");
        console.log("Logout Response:", response);
        return response;
    },
};
