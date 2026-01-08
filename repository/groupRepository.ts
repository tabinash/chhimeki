import { api } from "./http";
import {
    CreateGroupRequest,
    CreateGroupResponse,
    UpdateGroupRequest,
    UpdateGroupResponse,
    GetGroupByIdResponse,
    DeleteGroupResponse,
    JoinGroupResponse,
    LeaveGroupResponse,
    RemoveMemberResponse,
    GetGroupMembersParams,
    GetGroupMembersResponse,
    GetAllGroupsParams,
    GetAllGroupsResponse,
    GetMyGroupsParams,
    GetMyGroupsResponse,
    GetGroupFeedParams,
    GetGroupFeedResponse,
} from "@/types/api/group";

// ============================================
// GROUP REPOSITORY - Available APIs
// ============================================
// 1. createGroup()         POST   /api/groups (multipart)                         -- Create with optional images
// 2. updateGroup()         PUT    /api/groups/{groupId} (multipart)              -- Update details/images, admin only
// 3. deleteGroup()         DELETE /api/groups/{groupId}                          -- Soft delete, admin only
// 4. getGroupById()        GET    /api/groups/{groupId}                          -- Full details with membership status
// 5. joinGroup()           POST   /api/groups/{groupId}/join                     -- Direct join, no approval
// 6. leaveGroup()          POST   /api/groups/{groupId}/leave                    -- Members only (admin cannot leave)
// 7. removeMember()        DELETE /api/groups/{groupId}/members/{userId}         -- Admin removes member
// 8. getGroupMembers()     GET    /api/groups/{groupId}/members                  -- Paginated, members only
// 9. getAllGroups()        GET    /api/groups                                    -- All groups in user's Palika
// 10. getMyGroups()        GET    /api/groups/my                                 -- Only joined groups
// 11. getGroupFeed()       GET    /api/groups/{groupId}/feed                     -- Group posts from Redis, members only
// ============================================

export const groupRepository = {
    /**
     * Create new group
     * Content-Type: multipart/form-data
     */
    createGroup: async (data: CreateGroupRequest): Promise<CreateGroupResponse> => {
        console.log("Creating group:", data.name);

        const formData = new FormData();

        // Add text fields
        formData.append("name", data.name);
        if (data.description) formData.append("description", data.description);

        // Add optional images
        if (data.profileImage) formData.append("profileImage", data.profileImage);
        if (data.coverImage) formData.append("coverImage", data.coverImage);

        const response = await api.post<CreateGroupResponse>("/groups", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Create Group Response:", response);
        return response;
    },

    /**
     * Update group details
     * Content-Type: multipart/form-data
     */
    updateGroup: async (
        groupId: number,
        data: UpdateGroupRequest
    ): Promise<UpdateGroupResponse> => {
        console.log("Updating group ID:", groupId, "with data:", data);

        const formData = new FormData();

        // Add optional text fields
        if (data.name) formData.append("name", data.name);
        if (data.description) formData.append("description", data.description);

        // Add optional images
        if (data.profileImage) formData.append("profileImage", data.profileImage);
        if (data.coverImage) formData.append("coverImage", data.coverImage);

        const response = await api.put<UpdateGroupResponse>(`/groups/${groupId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Update Group Response:", response);
        return response;
    },

    /**
     * Delete group (soft delete, admin only)
     */
    deleteGroup: async (groupId: number): Promise<DeleteGroupResponse> => {
        console.log("Deleting group with ID:", groupId);
        const response = await api.delete<DeleteGroupResponse>(`/groups/${groupId}`);
        console.log("Delete Group Response:", response);
        return response;
    },

    /**
     * Get group details by ID
     */
    getGroupById: async (groupId: number): Promise<GetGroupByIdResponse> => {
        console.log("Fetching group with ID:", groupId);
        const response = await api.get<GetGroupByIdResponse>(`/groups/${groupId}`);
        console.log("Get Group Response:", response);
        return response;
    },

    /**
     * Join group (direct join, no approval)
     */
    joinGroup: async (groupId: number): Promise<JoinGroupResponse> => {
        console.log("Joining group with ID:", groupId);
        const response = await api.post<JoinGroupResponse>(`/groups/${groupId}/join`);
        console.log("Join Group Response:", response);
        return response;
    },

    /**
     * Leave group (members only, admin cannot leave)
     */
    leaveGroup: async (groupId: number): Promise<LeaveGroupResponse> => {
        console.log("Leaving group with ID:", groupId);
        const response = await api.post<LeaveGroupResponse>(`/groups/${groupId}/leave`);
        console.log("Leave Group Response:", response);
        return response;
    },

    /**
     * Remove member from group (admin only)
     */
    removeMember: async (groupId: number, userId: number): Promise<RemoveMemberResponse> => {
        console.log("Removing user ID:", userId, "from group ID:", groupId);
        const response = await api.delete<RemoveMemberResponse>(
            `/groups/${groupId}/members/${userId}`
        );
        console.log("Remove Member Response:", response);
        return response;
    },

    /**
     * Get group members (paginated, members only)
     */
    getGroupMembers: async (
        groupId: number,
        params?: GetGroupMembersParams
    ): Promise<GetGroupMembersResponse> => {
        console.log("Fetching members for group ID:", groupId, "with params:", params);
        const response = await api.get<GetGroupMembersResponse>(`/groups/${groupId}/members`, {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
            },
        });
        console.log("Group Members Response:", response);
        return response;
    },

    /**
     * Get all groups in user's Palika
     */
    getAllGroups: async (params?: GetAllGroupsParams): Promise<GetAllGroupsResponse> => {
        console.log("Fetching all groups with params:", params);
        const response = await api.get<GetAllGroupsResponse>("/groups", {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
            },
        });
        console.log("All Groups Response:", response);
        return response;
    },

    /**
     * Get user's joined groups
     */
    getMyGroups: async (params?: GetMyGroupsParams): Promise<GetMyGroupsResponse> => {
        console.log("Fetching my groups with params:", params);
        const response = await api.get<GetMyGroupsResponse>("/groups/my", {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
            },
        });
        console.log("My Groups Response:", response);
        return response;
    },

    /**
     * Get group feed (posts from Redis bucket, members only)
     */
    getGroupFeed: async (
        groupId: number,
        params?: GetGroupFeedParams
    ): Promise<GetGroupFeedResponse> => {
        console.log("Fetching feed for group ID:", groupId, "with params:", params);
        const response = await api.get<GetGroupFeedResponse>(`/groups/${groupId}/feed`, {
            params: {
                page: params?.page ?? 0,
                size: params?.size && params.size <= 50 ? params.size : 20,
            },
        });
        console.log("Group Feed Response:", response);
        return response;
    },
};