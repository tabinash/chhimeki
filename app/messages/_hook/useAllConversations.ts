import { useQuery } from "@tanstack/react-query";
import { messageRepository } from "@/repository/messageRepository";
import { GetAllConversationsResponse } from "@/types/api/message";

export function useAllConversations() {
    return useQuery<GetAllConversationsResponse>({
        queryKey: ["messages", "conversations"],
        queryFn: () => messageRepository.getAllConversations(),
        staleTime: 10000, // 10 seconds
        refetchInterval: 20000, // Auto-refetch every 20 seconds
    });
}
