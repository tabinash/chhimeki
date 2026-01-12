import { useQuery } from "@tanstack/react-query";
import { messageRepository } from "@/repository/messageRepository";
import { GetConversationParams, GetConversationResponse } from "@/types/api/message";

export function useConversation(otherUserId: number | null, params?: GetConversationParams) {
    return useQuery<GetConversationResponse>({
        queryKey: ["messages", "conversation", otherUserId, params],
        queryFn: () => {
            if (!otherUserId) {
                throw new Error("otherUserId is required");
            }
            return messageRepository.getConversation(otherUserId, params);
        },
        enabled: !!otherUserId, // Only fetch when otherUserId exists
        staleTime: 10000, // 10 seconds
        refetchInterval: 15000, // Auto-refetch every 15 seconds for new messages
    });
}
