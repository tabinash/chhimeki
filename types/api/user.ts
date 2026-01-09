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
// Update Profile API (Unified)
// PUT /api/users/profile
// Content-Type: multipart/form-data (when updating pictures) or application/json (when updating info)
// ============================================

export type UpdatePurpose = "profile_info" | "profile_picture" | "cover_picture";

export interface UpdateProfileRequest {
    purpose: UpdatePurpose;         // Required: Indicates what is being updated
    name?: string;                  // For profile_info
    dateOfBirth?: string;           // For profile_info (Format: yyyy-MM-dd)
    profilePicture?: File;          // For profile_picture
    coverPicture?: File;            // For cover_picture
}

export type UpdateProfileResponse = ApiResponse<UserProfileResponse>;

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

// ============================================
// Follow User API
// POST /api/users/{userId}/follow
// ============================================

export type FollowUserResponse = ApiResponse<void>;

// ============================================
// Unfollow User API
// DELETE /api/users/{userId}/follow
// ============================================

export type UnfollowUserResponse = ApiResponse<void>;
