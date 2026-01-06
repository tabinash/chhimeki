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

export interface User {
    id: number;
    name: string;
    phone: string | null;
    email: string | null;
    userType: string;
    profilePicture: string | null;
    district: string;
    palika: string;
    wada: string;
    dateOfBirth: string | null;
    isVerified: boolean;
    createdAt: string;
}

// ============================================
// Token Types
// ============================================

export interface Tokens {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
}

// ============================================
// Login API
// ============================================

export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface LoginResponseData {
    tokens: Tokens;
    user: User;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

// ============================================
// Refresh Token API
// ============================================

export interface RefreshTokenRequest {
    refreshToken: string;
}

export type RefreshTokenResponseData = Tokens;

export type RefreshTokenResponse = ApiResponse<RefreshTokenResponseData>;
