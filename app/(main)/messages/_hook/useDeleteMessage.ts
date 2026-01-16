import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messageRepository } from "@/repository/messageRepository";
import { DeleteMessageResponse } from "@/types/api/message";

export function useDeleteMessage() {
    const queryClient = useQueryClient();

    return useMutation<DeleteMessageResponse, Error, number>({
        mutationFn: (messageId: number) => messageRepository.deleteMessage(messageId),
        onSuccess: () => {
            // Invalidate all conversations to refresh
            queryClient.invalidateQueries({
                queryKey: ["messages", "conversations"],
            });

            // Invalidate specific conversation queries
            queryClient.invalidateQueries({
                queryKey: ["messages", "conversation"],
            });
        },
    });
}
