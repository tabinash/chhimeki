// ============================================
// Feed API Types
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
// Feed Domain Types
// ============================================

export interface PostAuthor {
    id: number;
    name: string;
    userType: "GENERAL" | "GOVERNMENT_OFFICE" | "BUSINESS";
    profilePicture: string | null;
    isVerified: boolean;
}

export interface MediaItem {
    id: number;
    url: string;
    thumbnailUrl: string | null;
    mediaType: "IMAGE" | "VIDEO";
    processingStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    duration: number | null;
}

export interface PostResponse {
    id: number;
    content: string;
    postType: "GENERAL" | "ALERT" | "GROUP";
    visibility: "WADA" | "PALIKA" | "DISTRICT";
    author: PostAuthor;
    media: MediaItem[];
    likeCount: number;
    commentCount: number;
    isLikedByMe: boolean;
    createdAt: string;
    updatedAt: string;
}

// ============================================
// Get General Feed API
// GET /api/feed/general
// ============================================

export interface GetGeneralFeedParams {
    page?: number;
    size?: number;
}

export type GetGeneralFeedResponse = PagedResponse<PostResponse>;

// ============================================
// Get Alert Feed API
// GET /api/feed/alerts
// ============================================

export interface GetAlertFeedParams {
    page?: number;
    size?: number;
}

export type GetAlertFeedResponse = PagedResponse<PostResponse>;