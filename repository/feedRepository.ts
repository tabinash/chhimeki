import { api } from "./http";
import {
    GetGeneralFeedParams,
    GetGeneralFeedResponse,
    GetAlertFeedParams,
    GetAlertFeedResponse,
} from "@/types/api/feed";

// ============================================
// FEED REPOSITORY - Available APIs
// ============================================
// 1. getGeneralFeed()      GET /api/feed/general        -- General posts (GENERAL, NEWS, NOTICE, GROUP) from user's geography
// 2. getAlertFeed()        GET /api/feed/alerts         -- Alert posts (ALERT, LOST_FOUND) from user's geography
// ============================================

export const feedRepository = {
    /**
     * Get general feed for authenticated user
     * Includes: GENERAL, NEWS, NOTICE, GROUP posts
     * From: User's wada + palika + district + followed institutions + groups
     */
    getGeneralFeed: async (params?: GetGeneralFeedParams): Promise<GetGeneralFeedResponse> => {
        console.log("Fetching general feed with params:", params);
        const response = await api.get<GetGeneralFeedResponse>("/feed/general", {
            params: {
                page: params?.page ?? 0,
                size: params?.size && params.size <= 50 ? params.size : 20,
            },
        });
        console.log("General Feed Response:", response);
        return response;
    },

    /**
     * Get alert feed for authenticated user
     * Includes: ALERT, LOST_FOUND posts
     * From: User's wada + palika + district
     */
    getAlertFeed: async (params?: GetAlertFeedParams): Promise<GetAlertFeedResponse> => {
        console.log("Fetching alert feed with params:", params);
        const response = await api.get<GetAlertFeedResponse>("/feed/alerts", {
            params: {
                page: params?.page ?? 0,
                size: params?.size && params.size <= 50 ? params.size : 20,
            },
        });
        console.log("Alert Feed Response:", response);
        return response;
    },
};