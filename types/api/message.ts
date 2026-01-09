// ============================================
// Message API Types
// ============================================

// Common API Response Wrapper
export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    timestamp: string;
}

// Pagination Wrapper
export interface PagedResponse<T> {
    status: string;
    message: string;
    data: T[];
    pagination: {
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
        isFirst: boolean;
        isLast: boolean;
    };
    timestamp: string;
}

// ============================================
// Message Domain Types
// ============================================

export interface UserInfoDTO {
    id: number;
    name: string;
    profilePicture: string | null;
}

export interface SimpleMessageDTO {
    id: number;
    mine: boolean; // true = my message (right), false = their message (left)
    content: string;
    read: boolean;
    createdAt: string; // ISO 8601 format
    readAt: string | null; // ISO 8601 format
}

export interface ConversationDetailsDTO {
    currentUser: UserInfoDTO;
    otherUser: UserInfoDTO;
    messages: SimpleMessageDTO[];
}

export interface ConversationResponseDTO {
    otherUserId: number;
    otherUsername: string;
    profilePicture: string | null;
    lastMessage: string;
    lastMessageTime: string; // ISO 8601 format
    hasUnreadMessages: boolean;
    unreadCount: number;
    lastMessageId: number;
}

// ============================================
// Send Message API
// POST /api/messages/send
// ============================================

export interface SendMessageRequest {
    receiverId: number;
    content: string; // 1-5000 chars
}

export type SendMessageResponse = ApiResponse<SimpleMessageDTO>;

// ============================================
// Get Conversation API
// GET /api/messages/conversation/{otherUserId}
// ============================================

export interface GetConversationParams {
    page?: number; // Default: 0
    size?: number; // Default: 50, max: 100
}

export type GetConversationResponse = ApiResponse<ConversationDetailsDTO[]>;

// ============================================
// Get All Conversations API
// GET /api/messages/conversations
// ============================================

export type GetAllConversationsResponse = ApiResponse<ConversationResponseDTO[]>;

// ============================================
// Get Unread Count API
// GET /api/messages/unread-count
// ============================================

export type GetUnreadCountResponse = ApiResponse<number>;

// ============================================
// Mark Conversation as Read API
// PUT /api/messages/mark-read/{otherUserId}
// ============================================

export type MarkAsReadResponse = ApiResponse<number>; // Returns count of messages marked

// ============================================
// Delete Message API
// DELETE /api/messages/{messageId}
// ============================================

export type DeleteMessageResponse = ApiResponse<void>;