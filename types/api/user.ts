// ============================================
// User API Types
// ============================================

// Common API Response Wrapper
export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    timestamp: string;
}

// ============================================
// User Domain Types
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
    createdAt: string;
    isMine: boolean; // Flag to indicate if this is the current user's profile
}

export interface UserSummaryResponse {
    id: number;
    name: string;
    userType: "GENERAL" | "GOVERNMENT_OFFICE" | "BUSINESS";
    profilePicture: string | null;
    district: string;
    palika: string;
    wada: string;
    isVerified: boolean;
}

// ============================================
// Get Current User Profile API
// GET /api/users/profile
// ============================================

export type GetCurrentUserProfileResponse = ApiResponse<UserProfileResponse>;

// ============================================
// Update Profile API
// PUT /api/users/profile
// ============================================

export interface UpdateProfileRequest {
    name: string;
    dateOfBirth: string; // Format: yyyy-MM-dd
}

export type UpdateProfileResponse = ApiResponse<UserProfileResponse>;

// ============================================
// Update Profile Picture API
// PUT /api/users/profile-picture
// ============================================

export type UpdateProfilePictureResponse = ApiResponse<UserProfileResponse>;

// ============================================
// Update Cover Picture API
// PUT /api/users/cover-picture
// ============================================

export type UpdateCoverPictureResponse = ApiResponse<UserProfileResponse>;

// ============================================
// Get User By ID API
// GET /api/users/{userId}
// ============================================

export type GetUserByIdResponse = ApiResponse<UserProfileResponse>;

// ============================================
// Get Nearby General Users API
// GET /api/users/nearby
// ============================================

export type GetNearbyGeneralUsersResponse = ApiResponse<UserSummaryResponse[]>;

// ============================================
// Get Nearby Institutions API
// GET /api/users/institutions
// ============================================

export type GetNearbyInstitutionsResponse = ApiResponse<UserSummaryResponse[]>;