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
     * Posts are filtered by user's wada, palika, and district
     * @param params - Pagination parameters (page, size)
     * @returns Paginated list of general posts
     */
    getGeneralFeed: async (params?: GetGeneralFeedParams): Promise<GetGeneralFeedResponse> => {
        console.log("Fetching general feed with params:", params);
        const response = await api.get<GetGeneralFeedResponse>("/feed/general", {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
            },
        });
        console.log("General Feed Response:", response);
        return response;
    },

    /**
     * Get alert feed posts based on user's location
     * Alert posts from government offices and important announcements
     * @param params - Pagination parameters (page, size)
     * @returns Paginated list of alert posts
     */
    getAlertFeed: async (params?: GetAlertFeedParams): Promise<GetAlertFeedResponse> => {
        console.log("Fetching alert feed with params:", params);
        const response = await api.get<GetAlertFeedResponse>("/feed/alerts", {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
            },
        });
        console.log("Alert Feed Response:", response);
        return response;
    },
};