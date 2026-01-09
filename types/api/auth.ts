// ============================================
// Auth API Types
// ============================================

// Common API Response Wrapper
export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    timestamp: string;
}

export interface ApiErrorResponse {
    status: string;
    message: string;
    timestamp: string;
}

// ============================================
// User Types
// ============================================

export interface UserProfileResponse {
    id: number;
    name: string;
    phone: string | null;
    email: string | null;
    userType: "GENERAL" | "GOVERNMENT_OFFICE" | "BUSINESS";
    profilePicture: string | null;
    coverPicture: string | null;
    district: string;
    palika: string;
    wada: string;
    dateOfBirth: string | null;
    isVerified: boolean;
    isActive: boolean;
    createdAt: string;
}

// ============================================
// Token Types
// ============================================

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string; // Always "Bearer"
    expiresIn: number; // Seconds (86400 = 24 hours)
}

// ============================================
// Login API
// POST /api/auth/login
// ============================================

export interface LoginRequest {
    identifier: string; // Phone or email
    password: string;
}

export interface AuthDataResponse {
    tokens: TokenResponse;
    user: UserProfileResponse;
}

export type LoginResponse = ApiResponse<AuthDataResponse>;

// ============================================
// Register API (Step 1: Send OTP)
// POST /api/auth/register
// ============================================

export interface RegisterRequest {
    name: string; // 2-100 chars
    phone?: string; // Required for GENERAL, optional for others
    email?: string; // Required for GOVERNMENT/NON_GOVERNMENT, optional for GENERAL
    password: string; // Min 8 chars
    userType: "GENERAL" | "GOVERNMENT" | "NON_GOVERNMENT";
    district: string;
    palika: string;
    wada: string; // Format: "PalikaName_Number" (e.g., "Ratnanagar_1")
    dateOfBirth?: string; // yyyy-MM-dd
    referralCode?: string;
}

export interface OtpResponse {
    message: string;
    identifier: string; // Masked (e.g., "98*****678")
    expiresIn: number; // Seconds (300 = 5 minutes)
}

export type RegisterResponse = ApiResponse<OtpResponse>;

// ============================================
// Verify OTP API (Step 2: Complete Registration + Auto-Login)
// POST /api/auth/verify-otp
// ============================================

export interface VerifyOtpRequest {
    identifier: string; // Phone or email used in registration
    code: string; // 6-digit OTP code
}

export type VerifyOtpResponse = ApiResponse<AuthDataResponse>; // Returns tokens + user (auto-login)

// ============================================
// Resend OTP API
// POST /api/auth/resend-otp
// ============================================

export interface ResendOtpRequest {
    identifier: string; // Phone or email
}

export type ResendOtpResponse = ApiResponse<OtpResponse>;

// ============================================
// Refresh Token API
// POST /api/auth/refresh
// ============================================

export interface RefreshTokenRequest {
    refreshToken: string;
}

export type RefreshTokenResponse = ApiResponse<TokenResponse>; // Returns only tokens (no user data)

// ============================================
// Forgot Password API (Step 1: Send OTP)
// POST /api/auth/forgot-password
// ============================================

export interface ForgotPasswordRequest {
    identifier: string; // Phone or email
}

export type ForgotPasswordResponse = ApiResponse<OtpResponse>;

// ============================================
// Reset Password API (Step 2: Verify OTP + Set New Password)
// POST /api/auth/reset-password
// ============================================

export interface ResetPasswordRequest {
    identifier: string; // Phone or email
    code: string; // 6-digit OTP code
    newPassword: string; // Min 8 chars
}

export type ResetPasswordResponse = ApiResponse<void>;

// ============================================
// Logout API
// POST /api/auth/logout
// ============================================

export type LogoutResponse = ApiResponse<void>;