// ============================================
// Feed API Types
// ============================================

// ============================================
// Common API Response Wrappers
// ============================================

/**
 * Standard API Response Wrapper
 * All endpoints return this structure
 */
export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    timestamp: string;
}

/**
 * Pagination Metadata
 */
export interface PaginationMetadata {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    isFirst: boolean;
    isLast: boolean;
}

/**
 * Paginated Response Wrapper
 */
export interface PagedResponse<T> {
    status: string;
    message: string;
    data: T[];
    pagination: PaginationMetadata;
    timestamp: string;
}

// ============================================
// Feed Item Response (Flat Structure)
// ============================================

/**
 * FeedItemResponse - Flat feed item structure for mobile performance
 * Used in: GET /api/feed/general, GET /api/feed/alerts, GET /api/groups/{groupId}/feed
 */
export interface FeedItemResponse {
    // Post information
    postId: number;
    content: string;
    postType: "GENERAL" | "ALERT" | "NEWS" | "NOTICE" | "LOST_FOUND" | "GROUP";
    visibilityLevel: "WADA" | "PALIKA" | "DISTRICT" | null; // null for GROUP posts
    createdAt: string;

    // Geography (null for GROUP posts)
    district: string | null;
    palika: string | null;
    wada: string | null;

    // Author information (flat - no nested author object)
    authorId: number;
    authorName: string;
    authorProfilePicture: string | null;
    authorType: "GENERAL" | "GOVERNMENT" | "NON_GOVERNMENT";

    // Group information (only for GROUP posts - null otherwise)
    groupId: number | null;
    groupName: string | null;
    groupProfileImage: string | null;

    // Media information (flat - no nested media objects)
    imageUrls: string[];       // Empty array if no images
    videoUrl: string | null;   // null if no video
    videoThumbnail: string | null;
    videoDuration: number | null; // in seconds

    // Engagement metrics
    commentCount: number;
    likeCount: number;
    shareCount: number;
}

// ============================================
// Get General Feed API
// GET /api/feed/general
// ============================================

export interface GetGeneralFeedParams {
    page?: number;
    size?: number;
}

// Controller returns: ApiResponse<PagedResponse<FeedItemResponse>>
export type GetGeneralFeedResponse = PagedResponse<FeedItemResponse>;

// ============================================
// Get Alert Feed API
// GET /api/feed/alerts
// ============================================

export interface GetAlertFeedParams {
    page?: number;
    size?: number;
}

export type GetAlertFeedResponse = PagedResponse<FeedItemResponse>;