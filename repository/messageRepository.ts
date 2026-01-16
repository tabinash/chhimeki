import { api } from "./http";
import {
    SendMessageRequest,
    SendMessageResponse,
    GetConversationParams,
    GetConversationResponse,
    GetAllConversationsResponse,
    GetUnreadCountResponse,
    MarkAsReadResponse,
    DeleteMessageResponse,
} from "@/types/api/message";

// ============================================
// MESSAGE REPOSITORY - Available APIs
// ============================================
// 1. sendMessage()             POST   /api/messages/send                   -- Send message to user
// 2. getConversation()         GET    /api/messages/conversation/{id}     -- Get messages with user (paginated, auto-marks read)
// 3. getAllConversations()     GET    /api/messages/conversations          -- Get conversation list/inbox
// 4. getUnreadCount()          GET    /api/messages/unread-count           -- Total unread count (badge)
// 5. markAsRead()              PUT    /api/messages/mark-read/{id}         -- Mark all messages from user as read
// 6. deleteMessage()           DELETE /api/messages/{messageId}            -- Delete own unread message
// ============================================

export const messageRepository = {
    /**
     * Send a message to another user
     * Content-Type: application/json
     */
    sendMessage: async (data: SendMessageRequest): Promise<SendMessageResponse> => {
        console.log("Sending message to user:", data.receiverId);
        const response = await api.post<SendMessageResponse>("/messages/send", data);
        console.log("Send Message Response:", response);
        return response;
    },

    /**
     * Get conversation with another user (paginated)
     * Automatically marks messages as read
     * Messages are in descending order (latest first)
     */
    getConversation: async (
        otherUserId: number,
        params?: GetConversationParams
    ): Promise<GetConversationResponse> => {
        console.log("Fetching conversation with user:", otherUserId, "params:", params);
        const response = await api.get<GetConversationResponse>(
            `/messages/conversation/${otherUserId}`,
            {
                params: {
                    page: params?.page ?? 0,
                    size: params?.size && params.size <= 100 ? params.size : 50,
                },
            }
        );
        console.log("Get Conversation Response:", response);
        return response;
    },

    /**
     * Get all conversations (inbox)
     * Shows conversation list with last message and unread count
     */
    getAllConversations: async (): Promise<GetAllConversationsResponse> => {
        console.log("Fetching all conversations");
        const response = await api.get<GetAllConversationsResponse>("/messages/conversations");
        console.log("All Conversations Response:", response);
        return response;
    },

    /**
     * Get total unread message count
     * Used for notification badge
     */
    getUnreadCount: async (): Promise<GetUnreadCountResponse> => {
        console.log("Fetching unread message count");
        const response = await api.get<GetUnreadCountResponse>("/messages/unread-count");
        console.log("Unread Count Response:", response);
        return response;
    },

    /**
     * Mark all messages from a specific user as read
     * Returns count of messages marked
     */
    markAsRead: async (otherUserId: number): Promise<MarkAsReadResponse> => {
        console.log("Marking conversation as read with user:", otherUserId);
        const response = await api.put<MarkAsReadResponse>(`/messages/mark-read/${otherUserId}`);
        console.log("Mark As Read Response:", response);
        return response;
    },

    /**
     * Delete a message (only sender, only if unread)
     */
    deleteMessage: async (messageId: number): Promise<DeleteMessageResponse> => {
        console.log("Deleting message:", messageId);
        const response = await api.delete<DeleteMessageResponse>(`/messages/${messageId}`);
        console.log("Delete Message Response:", response);
        return response;
    },
};