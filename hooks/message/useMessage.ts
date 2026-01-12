import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { messageRepository } from "@/repository/messageRepository";
import { SendMessageRequest, GetConversationParams } from "@/types/api/message";

export const messageKeys = {
    all: ["messages"] as const,
    conversations: () => [...messageKeys.all, "conversations"] as const,
    conversation: (otherUserId: number) => [...messageKeys.all, "conversation", otherUserId] as const,
    unreadCount: () => [...messageKeys.all, "unread-count"] as const,
};

export const useConversations = () => {
    return useQuery({
        queryKey: messageKeys.conversations(),
        queryFn: messageRepository.getAllConversations,
    });
};

export const useConversation = (otherUserId: number | null, params?: GetConversationParams) => {
    return useQuery({
        queryKey: messageKeys.conversation(otherUserId!),
        queryFn: () => messageRepository.getConversation(otherUserId!, params),
        enabled: !!otherUserId,
        staleTime: 0, // Always fetch fresh messages when opening chat
    });
};

export const useSendMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: SendMessageRequest) => messageRepository.sendMessage(data),
        onSuccess: (_data, variables) => {
            // Invalidate conversation to show new message
            queryClient.invalidateQueries({ queryKey: messageKeys.conversation(variables.receiverId) });
            // Invalidate conversations list to update last message
            queryClient.invalidateQueries({ queryKey: messageKeys.conversations() });
        },
    });
};

export const useUnreadCount = () => {
    return useQuery({
        queryKey: messageKeys.unreadCount(),
        queryFn: messageRepository.getUnreadCount,
        // Refetch every minute for badge updates
        refetchInterval: 60000,
    });
};

export const useMarkAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (otherUserId: number) => messageRepository.markAsRead(otherUserId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: messageKeys.conversations() });
            queryClient.invalidateQueries({ queryKey: messageKeys.unreadCount() });
        },
    });
};

export const useDeleteMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (messageId: number) => messageRepository.deleteMessage(messageId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: messageKeys.all });
        },
    });
};
