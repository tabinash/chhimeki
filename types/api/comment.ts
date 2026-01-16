// ============================================
// Comment API Types
// ============================================

// ============================================
// Common API Response Wrappers
// ============================================

export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    timestamp: string;
}

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

export interface PagedResponse<T> {
    status: string;
    message: string;
    data: T[];
    pagination: PaginationMetadata;
    timestamp: string;
}

// ============================================
// Response DTOs
// ============================================

export interface CommentResponse {
    id: number;
    postId: number;
    content: string;
    // Author information
    userId: number;
    userName: string;
    userProfilePicture: string | null;
    createdAt: string;
}

// ============================================
// Request DTOs
// ============================================

export interface CreateCommentRequest {
    content: string;
}

// ============================================
// API Endpoint Types
// ============================================

// POST /api/posts/{postId}/comments
export type CreateCommentResponse = ApiResponse<CommentResponse>;

// GET /api/posts/{postId}/comments
export interface GetCommentsParams {
    page?: number;
    size?: number;
}
export type GetCommentsResponse = ApiResponse<PagedResponse<CommentResponse>>;

// DELETE /api/comments/{commentId}
export type DeleteCommentResponse = ApiResponse<null>;