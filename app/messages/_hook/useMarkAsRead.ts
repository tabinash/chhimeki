import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messageRepository } from "@/repository/messageRepository";
import { MarkAsReadResponse } from "@/types/api/message";

export function useMarkAsRead() {
    const queryClient = useQueryClient();

    return useMutation<MarkAsReadResponse, Error, number>({
        mutationFn: (otherUserId: number) => messageRepository.markAsRead(otherUserId),
        onSuccess: (response, otherUserId) => {
            // Invalidate conversation to update read status
            queryClient.invalidateQueries({
                queryKey: ["messages", "conversation", otherUserId],
            });

            // Invalidate all conversations to update unread counts
            queryClient.invalidateQueries({
                queryKey: ["messages", "conversations"],
            });

            // Invalidate unread count
            queryClient.invalidateQueries({
                queryKey: ["messages", "unreadCount"],
            });
        },
    });
}
