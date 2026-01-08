// ============================================
// Group API Types
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
// Group Domain Types
// ============================================

export type GroupRole = "ADMIN" | "MEMBER";

export interface AdminInfo {
    id: number;
    name: string;
    profilePicture: string | null;
}

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

export interface GroupListResponse {
    id: number;
    name: string;
    profileImage: string | null;
    memberCount: number;
    isMember: boolean;
    isAdmin: boolean;
    adminId: number;
    adminName: string;
    adminProfilePicture: string | null;
    createdAt: string;
}

export interface GroupMemberResponse {
    userId: number;
    name: string;
    profilePicture: string | null;
    role: GroupRole;
    joinedAt: string;
}

// Feed item response (from FeedController)
export interface FeedItemResponse {
    id: number;
    content: string;
    postType: "GENERAL" | "ALERT" | "GROUP";
    visibility: "WADA" | "PALIKA" | "DISTRICT" | null;
    authorId: number;
    authorName: string;
    authorProfilePicture: string | null;
    authorUserType: "GENERAL" | "GOVERNMENT_OFFICE" | "BUSINESS";
    imageUrls: string[];
    videoUrl: string | null;
    videoThumbnail: string | null;
    videoDuration: number | null;
    likeCount: number;
    commentCount: number;
    isLikedByCurrentUser: boolean;
    createdAt: string;
}

// ============================================
// Create Group API
// POST /api/groups
// Content-Type: multipart/form-data
// ============================================

export interface CreateGroupRequest {
    name: string; // Max 100 chars
    description?: string; // Max 500 chars
    profileImage?: File;
    coverImage?: File;
}

export type CreateGroupResponse = ApiResponse<GroupResponse>;

// ============================================
// Update Group API
// PUT /api/groups/{groupId}
// Content-Type: multipart/form-data
// ============================================

export interface UpdateGroupRequest {
    name?: string; // Max 100 chars
    description?: string; // Max 500 chars
    profileImage?: File;
    coverImage?: File;
}

export type UpdateGroupResponse = ApiResponse<GroupResponse>;

// ============================================
// Get Group By ID API
// GET /api/groups/{groupId}
// ============================================

export type GetGroupByIdResponse = ApiResponse<GroupResponse>;

// ============================================
// Delete Group API
// DELETE /api/groups/{groupId}
// ============================================

export type DeleteGroupResponse = ApiResponse<void>;

// ============================================
// Join Group API
// POST /api/groups/{groupId}/join
// ============================================

export type JoinGroupResponse = ApiResponse<void>;

// ============================================
// Leave Group API
// POST /api/groups/{groupId}/leave
// ============================================

export type LeaveGroupResponse = ApiResponse<void>;

// ============================================
// Remove Member API
// DELETE /api/groups/{groupId}/members/{userId}
// ============================================

export type RemoveMemberResponse = ApiResponse<void>;

// ============================================
// Get Group Members API
// GET /api/groups/{groupId}/members
// ============================================

export interface GetGroupMembersParams {
    page?: number; // Default: 0
    size?: number; // Default: 20
}

export type GetGroupMembersResponse = PagedResponse<GroupMemberResponse>;

// ============================================
// Get All Groups API
// GET /api/groups
// ============================================

export interface GetAllGroupsParams {
    page?: number; // Default: 0
    size?: number; // Default: 20
}

export type GetAllGroupsResponse = PagedResponse<GroupListResponse>;

// ============================================
// Get My Groups API
// GET /api/groups/my
// ============================================

export interface GetMyGroupsParams {
    page?: number; // Default: 0
    size?: number; // Default: 20
}

export type GetMyGroupsResponse = PagedResponse<GroupListResponse>;

// ============================================
// Get Group Feed API
// GET /api/groups/{groupId}/feed
// ============================================

export interface GetGroupFeedParams {
    page?: number; // Default: 0
    size?: number; // Default: 20, max: 50
}

export type GetGroupFeedResponse = ApiResponse<PagedResponse<FeedItemResponse>>;