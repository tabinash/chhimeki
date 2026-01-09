import { useQuery } from "@tanstack/react-query";
import { messageRepository } from "@/repository/messageRepository";
import { GetUnreadCountResponse } from "@/types/api/message";

/**
 * Global hook to get total unread message count
 * Used for notification badge in Header
 */
export function useUnreadCount() {
    return useQuery<GetUnreadCountResponse>({
        queryKey: ["messages", "unreadCount"],
        queryFn: () => messageRepository.getUnreadCount(),
        refetchInterval: 30000, // Refetch every 30 seconds for live updates
        staleTime: 20000, // Consider data stale after 20 seconds
    });
}
