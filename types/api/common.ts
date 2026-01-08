// ============================================
// Common API Types
// ============================================

/**
 * Standard API Error Response
 * Used across all API endpoints for consistent error handling
 */
export interface ApiError {
    status: string;
    message: string;
    timestamp: string;
    errors?: Record<string, string[]>; // Field-level validation errors
}

/**
 * Generic API Response Wrapper
 * Used for successful responses
 */
export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    timestamp: string;
}

/**
 * Pagination Info
 */
export interface PaginationInfo {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

/**
 * Paginated API Response
 */
export interface PagedResponse<T> {
    status: string;
    message: string;
    data: T[];
    pagination: PaginationInfo;
    timestamp: string;
}
