// ============================================
// Storefront API Types
// ============================================

// Common API Response Wrapper
export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    timestamp: string;
}

// Pagination Wrapper
export interface PagedResponse<T> {
    status: string;
    message: string;
    data: T[];
    pagination: {
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
    timestamp: string;
}

// ============================================
// Storefront Domain Types
// ============================================

export type StorefrontStatus = "ACTIVE" | "INACTIVE";

export interface OwnerInfo {
    id: number;
    name: string;
    profilePicture: string | null;
}

export interface StorefrontResponse {
    id: number;
    name: string;
    description: string | null;
    logo: string | null;
    coverImage: string | null;
    contactPhone: string;
    contactEmail: string | null;
    palika: string;
    district: string;
    status: StorefrontStatus;
    owner: OwnerInfo;
    createdAt: string;
    updatedAt: string;
}

export interface StorefrontSummaryResponse {
    id: number;
    name: string;
    logo: string | null;
    palika: string;
    district: string;
}

// ============================================
// Create Storefront API
// POST /api/storefronts
// Content-Type: multipart/form-data OR application/json
// ============================================

export interface CreateStorefrontRequest {
    name: string; // 3-100 chars
    description?: string; // Max 1000 chars
    contactPhone: string;
    contactEmail?: string;
    palika: string;
    district: string;
    logo?: File; // Optional, multipart only
    coverImage?: File; // Optional, multipart only
}

export type CreateStorefrontResponse = ApiResponse<StorefrontResponse>;

// ============================================
// Update Storefront API
// PUT /api/storefronts/update
// Content-Type: multipart/form-data OR application/json
// ============================================

export interface UpdateStorefrontRequest {
    name?: string; // 3-100 chars
    description?: string; // Max 1000 chars
    contactPhone?: string;
    contactEmail?: string;
    palika?: string;
    district?: string;
    logo?: File; // Optional, multipart only
    coverImage?: File; // Optional, multipart only
}

export type UpdateStorefrontResponse = ApiResponse<StorefrontResponse>;

// ============================================
// Get My Storefront API
// GET /api/storefronts/me
// ============================================

export type GetMyStorefrontResponse = ApiResponse<StorefrontResponse | null>; // null if no active storefront

// ============================================
// Delete Storefront API
// DELETE /api/storefronts/close
// ============================================

export type DeleteStorefrontResponse = ApiResponse<void>;

// ============================================
// Get Storefront By ID API
// GET /api/storefronts/{id}
// ============================================

export type GetStorefrontByIdResponse = ApiResponse<StorefrontResponse>;

// ============================================
// Get All Storefronts API
// GET /api/storefronts
// ============================================

export interface GetAllStorefrontsParams {
    page?: number; // Default: 0
    size?: number; // Default: 20
}

export type GetAllStorefrontsResponse = PagedResponse<StorefrontSummaryResponse>;