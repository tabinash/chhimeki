"use client";

import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { postRepository } from "@/repository/postRepository";
import { DeletePostResponse } from "@/types/api/post";
import { ApiError } from "@/repository/http";

interface DeletePostParams {
    postId: number;
}

export function useDeletePost(): UseMutationResult<
    DeletePostResponse,
    ApiError,
    number
> {
    const queryClient = useQueryClient();

    return useMutation<DeletePostResponse, ApiError, number>({
        mutationFn: (postId: number) => postRepository.deletePost(postId),
        onSuccess: () => {


            // Invalidate general feeds
            queryClient.invalidateQueries({ queryKey: ["generalFeed"] });
            queryClient.invalidateQueries({ queryKey: ["alertFeed"] });
            queryClient.invalidateQueries({ queryKey: ["groupFeed"] });
        },
    });
}
