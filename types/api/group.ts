// ============================================
// Group API Types
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
// Enums
// ============================================

export type GroupRole = "ADMIN" | "MEMBER";

// ============================================
// Feed Item Response (for Group Feed)
// ============================================

export interface FeedItemResponse {
    // Post information
    postId: number;
    content: string;
    postType: "GENERAL" | "ALERT" | "NEWS" | "NOTICE" | "LOST_FOUND" | "GROUP";
    visibilityLevel: "WADA" | "PALIKA" | "DISTRICT" | null;
    createdAt: string;

    // Geography
    district: string | null;
    palika: string | null;
    wada: string | null;

    // Author information (flat)
    authorId: number;
    authorName: string;
    authorProfilePicture: string | null;
    authorType: "GENERAL" | "GOVERNMENT" | "NON_GOVERNMENT";

    // Group information
    groupId: number | null;
    groupName: string | null;
    groupProfileImage: string | null;

    // Media information (flat)
    imageUrls: string[];
    videoUrl: string | null;
    videoThumbnail: string | null;
    videoDuration: number | null;

    // Engagement metrics
    commentCount: number;
    likeCount: number;
    shareCount: number;
}

// ============================================
// Admin Info (Nested in GroupResponse)
// ============================================

export interface AdminInfo {
    id: number;
    name: string;
    profilePicture: string | null;
}

// ============================================
// Response DTOs
// ============================================

/**
 * Full group details
 * Used in: GET /api/groups/{groupId}, POST /api/groups, PUT /api/groups/{groupId}
 */
export interface GroupResponse {
    id: number;
    name: string;
    description: string | null;
    profileImage: string | null;
    coverImage: string | null;
    admin: AdminInfo;
    memberCount: number;
    isAdmin: boolean;
    isMember: boolean;
    createdAt: string;
    updatedAt: string;
}

/**
 * Group list item (minimal info for lists)
 * Used in: GET /api/groups, GET /api/groups/my
 */
export interface GroupListResponse {
    id: number;
    name: string;
    profileImage: string | null;
    memberCount: number;
    isMember: boolean;
    isAdmin: boolean;
    // Admin info (flat)
    adminId: number;
    adminName: string;
    adminProfilePicture: string | null;
    createdAt: string;
}

/**
 * Group member info
 * Used in: GET /api/groups/{groupId}/members
 */
export interface GroupMemberResponse {
    userId: number;
    name: string;
    profilePicture: string | null;
    role: GroupRole;
    joinedAt: string;
}

// ============================================
// Request DTOs
// ============================================

/**
 * Create group request (multipart/form-data)
 * POST /api/groups
 */
export interface CreateGroupRequest {
    name: string;
    description?: string;
    profileImage?: File;
    coverImage?: File;
}

/**
 * Update group request (multipart/form-data)
 * PUT /api/groups/{groupId}
 */
export interface UpdateGroupRequest {
    name?: string;
    description?: string;
    profileImage?: File;
    coverImage?: File;
}

// ============================================
// API Endpoint Types
// ============================================

// POST /api/groups
export type CreateGroupResponse = ApiResponse<GroupResponse>;

// PUT /api/groups/{groupId}
export type UpdateGroupResponse = ApiResponse<GroupResponse>;

// DELETE /api/groups/{groupId}
export type DeleteGroupResponse = ApiResponse<null>;

// GET /api/groups/{groupId}
export type GetGroupByIdResponse = ApiResponse<GroupResponse>;

// POST /api/groups/{groupId}/join
export type JoinGroupResponse = ApiResponse<null>;

// POST /api/groups/{groupId}/leave
export type LeaveGroupResponse = ApiResponse<null>;

// DELETE /api/groups/{groupId}/members/{userId}
export type RemoveMemberResponse = ApiResponse<null>;

// GET /api/groups/{groupId}/members
export interface GetGroupMembersParams {
    page?: number;
    size?: number;
}
export type GetGroupMembersResponse = PagedResponse<GroupMemberResponse>;

// GET /api/groups
export interface GetAllGroupsParams {
    page?: number;
    size?: number;
}
export type GetAllGroupsResponse = PagedResponse<GroupListResponse>;

// GET /api/groups/my
export interface GetMyGroupsParams {
    page?: number;
    size?: number;
}
export type GetMyGroupsResponse = PagedResponse<GroupListResponse>;

// GET /api/groups/{groupId}/feed
export interface GetGroupFeedParams {
    page?: number;
    size?: number;
}
export type GetGroupFeedResponse = PagedResponse<FeedItemResponse>;