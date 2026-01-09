import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messageRepository } from "@/repository/messageRepository";
import { SendMessageRequest, SendMessageResponse } from "@/types/api/message";

export function useSendMessage() {
    const queryClient = useQueryClient();

    return useMutation<SendMessageResponse, Error, SendMessageRequest>({
        mutationFn: (data: SendMessageRequest) => messageRepository.sendMessage(data),
        onSuccess: (response, variables) => {
            // Invalidate conversation to show new message
            queryClient.invalidateQueries({
                queryKey: ["messages", "conversation", variables.receiverId],
            });

            // Invalidate all conversations list to update last message
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
