// ============================================
// Post API Types
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
// Post Domain Types
// ============================================

export interface PostResponse {
    // Post details
    id: number;
    content: string | null;
    postType: "GENERAL" | "ALERT" | "GROUP";
    visibilityLevel: "WADA" | "PALIKA" | "DISTRICT" | null;

    // Geography
    district: string;
    palika: string;
    wada: string;

    // Group information (only for GROUP posts)
    groupId: number | null;
    groupName: string | null;
    groupProfileImage: string | null;

    // Media information (flat structure)
    imageUrls: string[]; // Empty array if no images
    videoUrl: string | null;
    videoThumbnail: string | null;
    videoDuration: number | null; // Duration in seconds

    // Author information
    authorId: number;
    authorName: string;
    authorProfilePicture: string | null;
    authorUserType: "GENERAL" | "GOVERNMENT_OFFICE" | "BUSINESS";

    // Engagement metrics
    likeCount: number;
    commentCount: number;
    shareCount: number;
    isLikedByCurrentUser: boolean;

    // Timestamps
    createdAt: string;
    updatedAt: string;
}

// ============================================
// Create Post API (JSON - Text Only)
// POST /api/posts
// Content-Type: application/json
// ============================================

export interface CreatePostJsonRequest {
    content?: string; // Max 2000 characters
    postType: "GENERAL" | "ALERT" | "GROUP";
    visibilityLevel?: "WADA" | "PALIKA" | "DISTRICT"; // Required for non-GROUP posts
    groupId?: number; // Required if postType = GROUP
}

export type CreatePostJsonResponse = ApiResponse<PostResponse>;

// ============================================
// Create Post API (Multipart - With Media)
// POST /api/posts
// Content-Type: multipart/form-data
// ============================================

export interface CreatePostWithMediaRequest {
    content?: string; // Max 2000 characters
    postType: "GENERAL" | "ALERT" | "GROUP";
    visibilityLevel?: "WADA" | "PALIKA" | "DISTRICT"; // Required for non-GROUP posts
    groupId?: number; // Required if postType = GROUP
    images?: File[]; // Max 5 images
    video?: File; // Max 1 video, 3 minutes
}

export type CreatePostWithMediaResponse = ApiResponse<PostResponse>;

// ============================================
// Get Post By ID API
// GET /api/posts/{id}
// ============================================

export type GetPostByIdResponse = ApiResponse<PostResponse>;

// ============================================
// Delete Post API
// DELETE /api/posts/{id}
// ============================================

export type DeletePostResponse = ApiResponse<void>;

// ============================================
// Get My Posts API
// GET /api/posts/my-posts
// ============================================

export interface GetMyPostsParams {
    page?: number;
    size?: number;
}

export type GetMyPostsResponse = PagedResponse<PostResponse>;

// ============================================
// Get User Posts API
// GET /api/posts/user/{userId}
// ============================================

export interface GetUserPostsParams {
    page?: number;
    size?: number;
}

export type GetUserPostsResponse = PagedResponse<PostResponse>;