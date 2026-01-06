import { api } from "./http";
import {
    CreatePostRequest,
    CreatePostResponse,
    GetPostByIdResponse,
    UpdatePostRequest,
    UpdatePostResponse,
    DeletePostResponse,
    GetMyPostsParams,
    GetMyPostsResponse,
    GetUserPostsParams,
    GetUserPostsResponse,
    LikePostResponse,
    UnlikePostResponse,
} from "@/types/api/post";

// ============================================
// Post Repository
// ============================================

export const postRepository = {
    /**
     * Create a new post (General or Alert)
     * @param data - Post creation data with content, type, visibility, and optional media
     * @returns Created post data
     */
    createPost: async (data: CreatePostRequest): Promise<CreatePostResponse> => {
        console.log("Creating post with data:", data);
        const response = await api.post<CreatePostResponse>("/posts", data);
        console.log("Create Post Response:", response);
        return response;
    },

    /**
     * Get a specific post by ID
     * @param postId - The ID of the post to fetch
     * @returns Post data
     */
    getPostById: async (postId: number): Promise<GetPostByIdResponse> => {
        console.log("Fetching post with ID:", postId);
        const response = await api.get<GetPostByIdResponse>(`/posts/${postId}`);
        console.log("Get Post Response:", response);
        return response;
    },

    /**
     * Update an existing post (only content and visibility can be updated)
     * @param postId - The ID of the post to update
     * @param data - Updated post data
     * @returns Updated post data
     */
    updatePost: async (postId: number, data: UpdatePostRequest): Promise<UpdatePostResponse> => {
        console.log("Updating post ID:", postId, "with data:", data);
        const response = await api.put<UpdatePostResponse>(`/posts/${postId}`, data);
        console.log("Update Post Response:", response);
        return response;
    },

    /**
     * Delete a post (only post author can delete)
     * @param postId - The ID of the post to delete
     * @returns Success response
     */
    deletePost: async (postId: number): Promise<DeletePostResponse> => {
        console.log("Deleting post with ID:", postId);
        const response = await api.delete<DeletePostResponse>(`/posts/${postId}`);
        console.log("Delete Post Response:", response);
        return response;
    },

    /**
     * Get all posts created by the current authenticated user
     * @param params - Pagination parameters (page, size)
     * @returns Paginated list of user's own posts
     */
    getMyPosts: async (params?: GetMyPostsParams): Promise<GetMyPostsResponse> => {
        console.log("Fetching my posts with params:", params);
        const response = await api.get<GetMyPostsResponse>("/posts/my-posts", {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
            },
        });
        console.log("My Posts Response:", response);
        return response;
    },

    /**
     * Get all posts created by a specific user
     * @param userId - The ID of the user whose posts to fetch
     * @param params - Pagination parameters (page, size)
     * @returns Paginated list of user's posts
     */
    getUserPosts: async (userId: number, params?: GetUserPostsParams): Promise<GetUserPostsResponse> => {
        console.log("Fetching posts for user ID:", userId, "with params:", params);
        const response = await api.get<GetUserPostsResponse>(`/posts/user/${userId}`, {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
            },
        });
        console.log("User Posts Response:", response);
        return response;
    },

    /**
     * Like a post
     * @param postId - The ID of the post to like
     * @returns Success response
     */
    likePost: async (postId: number): Promise<LikePostResponse> => {
        console.log("Liking post with ID:", postId);
        const response = await api.post<LikePostResponse>(`/posts/${postId}/like`);
        console.log("Like Post Response:", response);
        return response;
    },

    /**
     * Unlike a post (remove like)
     * @param postId - The ID of the post to unlike
     * @returns Success response
     */
    unlikePost: async (postId: number): Promise<UnlikePostResponse> => {
        console.log("Unliking post with ID:", postId);
        const response = await api.delete<UnlikePostResponse>(`/posts/${postId}/like`);
        console.log("Unlike Post Response:", response);
        return response;
    },
};