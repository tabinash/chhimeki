import { api } from "./http";
import {
    CreatePostJsonRequest,
    CreatePostJsonResponse,
    CreatePostWithMediaRequest,
    CreatePostWithMediaResponse,
    GetPostByIdResponse,
    DeletePostResponse,
    GetMyPostsParams,
    GetMyPostsResponse,
    GetUserPostsParams,
    GetUserPostsResponse,
} from "@/types/api/post";

// ============================================
// POST REPOSITORY - Available APIs
// ============================================
// 1. createPostJson()      POST   /api/posts                       -- JSON, Auth required
// 2. createPostWithMedia() POST   /api/posts                       -- Multipart, Auth required
// 3. getPostById()         GET    /api/posts/{postId}              -- Public
// 4. deletePost()          DELETE /api/posts/{postId}              -- Soft delete, owner only
// 5. getMyPosts()          GET    /api/posts/my-posts                -- All posts by user, public
// 6. getUserPosts()        GET    /api/posts/user/{userId}         -- All posts by user, public

export const postRepository = {
    /**
     * Create a text-only post (no media)
     * Content-Type: application/json
     * @param data - Post creation data (content, type, visibility, groupId)
     * @returns Created post data
     */
    createPostJson: async (data: CreatePostJsonRequest): Promise<CreatePostJsonResponse> => {
        console.log("Creating text-only post:", data);
        const response = await api.post<CreatePostJsonResponse>("/posts", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Create Post (JSON) Response:", response);
        return response;
    },

    /**
     * Create a post with media files (images and/or video)
     * Content-Type: multipart/form-data
     * @param data - Post creation data with optional images (max 5) and video (max 1)
     * @param onProgress - Optional callback for upload progress (0-100)
     * @returns Created post data
     */
    createPostWithMedia: async (
        data: CreatePostWithMediaRequest,
        onProgress?: (progress: number) => void
    ): Promise<CreatePostWithMediaResponse> => {
        console.log("Creating post with media:", {
            postType: data.postType,
            hasImages: data.images && data.images.length > 0,
            hasVideo: !!data.video,
        });

        const formData = new FormData();

        // Add text fields
        if (data.content) formData.append("content", data.content);
        formData.append("postType", data.postType);
        if (data.visibilityLevel) formData.append("visibilityLevel", data.visibilityLevel);
        if (data.groupId) formData.append("groupId", data.groupId.toString());

        // Add images (max 5)
        if (data.images && data.images.length > 0) {
            data.images.forEach((image) => {
                formData.append("images", image);
            });
        }

        // Add video (max 1)
        if (data.video) {
            formData.append("video", data.video);
        }

        const response = await api.postWithProgress<CreatePostWithMediaResponse>(
            "/posts",
            formData,
            onProgress,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log("Create Post (Multipart) Response:", response);
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
     * Delete a post (soft delete - only post author can delete)
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
};