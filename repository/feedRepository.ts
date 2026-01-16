import { api } from "./http";
import {
    GetGeneralFeedParams,
    GetGeneralFeedResponse,
    GetAlertFeedParams,
    GetAlertFeedResponse,
} from "@/types/api/feed";

// ============================================
// Feed Repository
// ============================================

export const feedRepository = {
    /**
     * Get general feed posts based on user's location
     * Includes: GENERAL, NEWS, NOTICE, GROUP posts
     * From: User's wada + palika + district + followed institutions + groups
     * @param params - Pagination parameters (page, size)
     * @returns ApiResponse containing paginated list of feed items
     */
    getGeneralFeed: async (params?: GetGeneralFeedParams): Promise<GetGeneralFeedResponse> => {
        const response = await api.get<GetGeneralFeedResponse>("/feed/general", {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
            },
        });
        return response;
    },

    /**
     * Get alert feed posts based on user's location
     * Includes: ALERT, LOST_FOUND posts
     * From: User's wada + palika + district
     * @param params - Pagination parameters (page, size)
     * @returns ApiResponse containing paginated list of alert items
     */
    getAlertFeed: async (params?: GetAlertFeedParams): Promise<GetAlertFeedResponse> => {
        const response = await api.get<GetAlertFeedResponse>("/feed/alerts", {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
            },
        });
        return response;
    },
};