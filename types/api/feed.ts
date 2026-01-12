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

export interface FeedItemResponse {
    // Post information
    postId: number;
    content: string;
    postType: string; // "GENERAL", "ALERT", "NEWS", "GROUP", etc.
    visibilityLevel: string | null; // "WADA", "PALIKA", "DISTRICT" (null for GROUP posts)
    createdAt: string;

    // Geography (null for GROUP posts)
    district: string | null;
    palika: string | null;
    wada: string | null;

    // Author information (flat)
    authorId: number;
    authorName: string;
    authorProfilePicture: string | null;
    authorType: string; // "GENERAL", "GOVERNMENT", "NON_GOVERNMENT"

    // Group information (only for GROUP posts)
    groupId: number | null;
    groupName: string | null;
    groupProfileImage: string | null;

    // Media information (flat)
    imageUrls: string[]; // Empty array if no images
    videoUrl: string | null;
    videoThumbnail: string | null;
    videoDuration: number | null; // Duration in seconds

    // Engagement metrics (flat)
    commentCount: number;
    likeCount: number;
    shareCount: number;
}

// ============================================
// Get General Feed API
// GET /api/feed/general
// ============================================

export interface GetGeneralFeedParams {
    page?: number; // Default: 0
    size?: number; // Default: 20, max: 50
}

export type GetGeneralFeedResponse = ApiResponse<PagedResponse<FeedItemResponse>>;

// ============================================
// Get Alert Feed API
// GET /api/feed/alerts
// ============================================

export interface GetAlertFeedParams {
    page?: number; // Default: 0
    size?: number; // Default: 20, max: 50
}

export type GetAlertFeedResponse = ApiResponse<PagedResponse<FeedItemResponse>>;