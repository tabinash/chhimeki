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
// Create Post API
// POST /api/posts
// ============================================

export interface CreatePostRequest {
    content: string;
    postType: "GENERAL" | "ALERT";
    visibility: "WADA" | "PALIKA" | "DISTRICT";
    mediaIds?: number[]; // Optional array of media IDs uploaded via MediaController
}

export type CreatePostResponse = ApiResponse<PostResponse>;

// ============================================
// Get Post By ID API
// GET /api/posts/{postId}
// ============================================

export type GetPostByIdResponse = ApiResponse<PostResponse>;

// ============================================
// Update Post API
// PUT /api/posts/{postId}
// ============================================

export interface UpdatePostRequest {
    content: string;
    visibility: "WADA" | "PALIKA" | "DISTRICT";
}

export type UpdatePostResponse = ApiResponse<PostResponse>;

// ============================================
// Delete Post API
// DELETE /api/posts/{postId}
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

// ============================================
// Like Post API
// POST /api/posts/{postId}/like
// ============================================

export type LikePostResponse = ApiResponse<void>;

// ============================================
// Unlike Post API
// DELETE /api/posts/{postId}/like
// ============================================

export type UnlikePostResponse = ApiResponse<void>;