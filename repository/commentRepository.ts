// ============================================
// COMMENT REPOSITORY - Available APIs
// ============================================
// POST   /api/posts/{postId}/comments - Create comment on a post
// GET    /api/posts/{postId}/comments - Get paginated comments for a post
// DELETE /api/comments/{commentId}    - Delete comment (author or post owner)
// ============================================

import { api } from "./http";
import {
    CreateCommentRequest,
    CreateCommentResponse,
    GetCommentsParams,
    GetCommentsResponse,
    DeleteCommentResponse,
} from "@/types/api/comment";

export const commentRepository = {

    createComment: async (postId: number, request: CreateCommentRequest): Promise<CreateCommentResponse> => {
        return api.post<CreateCommentResponse>(`/posts/${postId}/comments`, request);
    },

    getComments: async (postId: number, params?: GetCommentsParams): Promise<GetCommentsResponse> => {
        return api.get<GetCommentsResponse>(`/posts/${postId}/comments`, {
            params: { page: params?.page ?? 0, size: params?.size ?? 20 },
        });
    },

    deleteComment: async (commentId: number): Promise<DeleteCommentResponse> => {
        return api.delete<DeleteCommentResponse>(`/comments/${commentId}`);
    },
};