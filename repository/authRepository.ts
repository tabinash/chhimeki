import { api } from "./http";
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    VerifyOtpRequest,
    VerifyOtpResponse,
    ResendOtpRequest,
    ResendOtpResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    LogoutResponse,
} from "@/types/api/auth";

// ============================================
// AUTH REPOSITORY - Available APIs
// ============================================
// 1. register()            POST   /api/auth/register          -- Step 1: Send OTP (JSON)
// 2. verifyOtp()           POST   /api/auth/verify-otp        -- Step 2: Complete registration + auto-login
// 3. resendOtp()           POST   /api/auth/resend-otp        -- Resend OTP
// 4. login()               POST   /api/auth/login             -- Login with identifier + password
// 5. refreshToken()        POST   /api/auth/refresh           -- Refresh access token
// 6. forgotPassword()      POST   /api/auth/forgot-password   -- Step 1: Send password reset OTP
// 7. resetPassword()       POST   /api/auth/reset-password    -- Step 2: Reset password with OTP
// 8. logout()              POST   /api/auth/logout            -- Logout
// ============================================

export const authRepository = {
    /**
     * Register new user (Step 1: Send OTP)
     * Content-Type: application/json
     * @param data - Registration data
     * @returns OTP response (not auto-login yet)
     */
    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        console.log("Registering user:", data.name);
        const response = await api.post<RegisterResponse>("/auth/register", data);
        console.log("Register Response (OTP sent):", response);
        return response;
    },

    /**
     * Verify OTP and complete registration (Step 2: Auto-login)
     * @param data - Identifier and OTP code
     * @returns Auth response with tokens + user
     */
    verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
        console.log("Verifying OTP for:", data.identifier);
        const response = await api.post<VerifyOtpResponse>("/auth/verify-otp", data);
        console.log("Verify OTP Response (Registration complete):", response);
        return response;
    },

    /**
     * Resend OTP
     * @param data - Identifier (phone or email)
     * @returns OTP response
     */
    resendOtp: async (data: ResendOtpRequest): Promise<ResendOtpResponse> => {
        console.log("Resending OTP to:", data.identifier);
        const response = await api.post<ResendOtpResponse>("/auth/resend-otp", data);
        console.log("Resend OTP Response:", response);
        return response;
    },

    /**
     * Login with identifier (phone/email) and password
     * @param credentials - User login credentials
     * @returns Auth response with tokens + user
     */
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        console.log("Login attempt for:", credentials.identifier);
        const response = await api.post<LoginResponse>("/auth/login", credentials);
        console.log("Login Response:", response);
        return response;
    },

    /**
     * Refresh access token using refresh token
     * @param data - Refresh token request
     * @returns New tokens (no user data)
     */
    refreshToken: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
        console.log("Refreshing access token");
        const response = await api.post<RefreshTokenResponse>("/auth/refresh", data);
        console.log("Refresh Token Response:", response);
        return response;
    },

    /**
     * Forgot password - Send OTP (Step 1)
     * @param data - Identifier (phone or email)
     * @returns OTP response
     */
    forgotPassword: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
        console.log("Forgot password for:", data.identifier);
        const response = await api.post<ForgotPasswordResponse>("/auth/forgot-password", data);
        console.log("Forgot Password Response (OTP sent):", response);
        return response;
    },

    /**
     * Reset password with OTP (Step 2)
     * @param data - Identifier, OTP code, and new password
     * @returns Success response
     */
    resetPassword: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
        console.log("Resetting password for:", data.identifier);
        const response = await api.post<ResetPasswordResponse>("/auth/reset-password", data);
        console.log("Reset Password Response:", response);
        return response;
    },

    /**
     * Logout current user
     * @returns Success response
     */
    logout: async (): Promise<LogoutResponse> => {
        console.log("Logging out");
        const response = await api.post<LogoutResponse>("/auth/logout");
        console.log("Logout Response:", response);
        return response;
    },
};