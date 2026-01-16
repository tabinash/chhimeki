
import { api } from "./http";
import {
    CreateGroupRequest,
    CreateGroupResponse,
    UpdateGroupRequest,
    UpdateGroupResponse,
    DeleteGroupResponse,
    GetGroupByIdResponse,
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
// POST   /api/groups                            - Create new group (multipart/form-data)
// PUT    /api/groups/{groupId}                  - Update group (multipart/form-data, admin only)
// DELETE /api/groups/{groupId}                  - Delete group (soft delete, admin only)
// GET    /api/groups/{groupId}                  - Get group details
// POST   /api/groups/{groupId}/join             - Join group
// POST   /api/groups/{groupId}/leave            - Leave group
// DELETE /api/groups/{groupId}/members/{userId} - Remove member (admin only)
// GET    /api/groups/{groupId}/members          - Get group members (paginated)
// GET    /api/groups                            - Get all groups in user's Palika (paginated)
// GET    /api/groups/my                         - Get user's joined groups (paginated)
// GET    /api/groups/{groupId}/feed             - Get group feed (paginated)
// ============================================


export const groupRepository = {

    createGroup: async (request: CreateGroupRequest): Promise<CreateGroupResponse> => {
        const formData = new FormData();
        formData.append("name", request.name);
        if (request.description) formData.append("description", request.description);
        if (request.profileImage) formData.append("profileImage", request.profileImage);
        if (request.coverImage) formData.append("coverImage", request.coverImage);

        return api.post<CreateGroupResponse>("/groups", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    updateGroup: async (groupId: number, request: UpdateGroupRequest): Promise<UpdateGroupResponse> => {
        const formData = new FormData();
        if (request.name) formData.append("name", request.name);
        if (request.description) formData.append("description", request.description);
        if (request.profileImage) formData.append("profileImage", request.profileImage);
        if (request.coverImage) formData.append("coverImage", request.coverImage);

        return api.put<UpdateGroupResponse>(`/groups/${groupId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    deleteGroup: async (groupId: number): Promise<DeleteGroupResponse> => {
        return api.delete<DeleteGroupResponse>(`/groups/${groupId}`);
    },

    getGroupById: async (groupId: number): Promise<GetGroupByIdResponse> => {
        return api.get<GetGroupByIdResponse>(`/groups/${groupId}`);
    },

    joinGroup: async (groupId: number): Promise<JoinGroupResponse> => {
        return api.post<JoinGroupResponse>(`/groups/${groupId}/join`);
    },

    leaveGroup: async (groupId: number): Promise<LeaveGroupResponse> => {
        return api.post<LeaveGroupResponse>(`/groups/${groupId}/leave`);
    },

    removeMember: async (groupId: number, userId: number): Promise<RemoveMemberResponse> => {
        return api.delete<RemoveMemberResponse>(`/groups/${groupId}/members/${userId}`);
    },

    getGroupMembers: async (groupId: number, params?: GetGroupMembersParams): Promise<GetGroupMembersResponse> => {
        return api.get<GetGroupMembersResponse>(`/groups/${groupId}/members`, {
            params: { page: params?.page ?? 0, size: params?.size ?? 20 },
        });
    },

    getAllGroups: async (params?: GetAllGroupsParams): Promise<GetAllGroupsResponse> => {
        return api.get<GetAllGroupsResponse>("/groups", {
            params: { page: params?.page ?? 0, size: params?.size ?? 20 },
        });
    },

    getMyGroups: async (params?: GetMyGroupsParams): Promise<GetMyGroupsResponse> => {
        return api.get<GetMyGroupsResponse>("/groups/my", {
            params: { page: params?.page ?? 0, size: params?.size ?? 20 },
        });
    },

    getGroupFeed: async (groupId: number, params?: GetGroupFeedParams): Promise<GetGroupFeedResponse> => {
        return api.get<GetGroupFeedResponse>(`/groups/${groupId}/feed`, {
            params: { page: params?.page ?? 0, size: params?.size ?? 20 },
        });
    },
};