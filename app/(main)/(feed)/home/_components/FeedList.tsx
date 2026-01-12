"use client";

import { useSearchParams, useRouter } from "next/navigation";
import PostCard from "./PostCard";
import PostDetailModal from "@/components/modals/PostDetailModal";
import { useGeneralFeed, useAlertFeed } from "../_hook";
import { Loader2 } from "lucide-react";
import { FeedItemResponse } from "@/types/api/feed";

type TabItem = {
    id: string;
    label: string;
};

export default function FeedList() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeTab = searchParams.get('tab') || 'foryou';

    // Fetch feed data
    const { data: generalFeedData, isLoading: isLoadingGeneral } = useGeneralFeed({ page: 1, size: 20 });
    const { data: alertFeedData, isLoading: isLoadingAlerts } = useAlertFeed({ page: 0, size: 20 });


    // Extract posts from API response
    // Response structure: { status, message, data: { data: [...posts], pagination: {...} }, timestamp }
    const extractPosts = (response: typeof generalFeedData): FeedItemResponse[] => {
        if (!response) return [];
        // Check if it's the nested structure
        if (response.data && 'data' in response.data && Array.isArray(response.data.data)) {
            return response.data.data;
        }
        // Fallback if data is directly an array
        if (Array.isArray(response.data)) {
            return response.data as unknown as FeedItemResponse[];
        }
        return [];
    };

    const generalPosts = extractPosts(generalFeedData);
    const alertPosts = extractPosts(alertFeedData);


    const TABS: TabItem[] = [
        { id: "foryou", label: "For You" },
        { id: "alerts", label: "Alerts" },
    ];

    const handleTabChange = (tab: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (tab === 'foryou') {
            params.delete('tab');
        } else {
            params.set('tab', tab);
        }
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    // Get posts based on active tab
    const posts = activeTab === 'alerts' ? alertPosts : generalPosts;
    const isLoading = activeTab === 'alerts' ? isLoadingAlerts : isLoadingGeneral;

    return (
        <div>
            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 mb-2 bg-white rounded-t-xl px-4">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id || (activeTab === 'foryou' && tab.id === 'foryou');

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`
                                relative pb-3 text-sm font-semibold transition-colors pt-3
                                ${isActive
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-600 hover:text-gray-900"}
                            `}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            )}

            {/* Empty State */}
            {!isLoading && posts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl">
                    <p className="text-gray-500 text-lg font-medium">No posts yet</p>
                    <p className="text-gray-400 text-sm mt-1">
                        {activeTab === 'alerts'
                            ? "No alerts in your area right now"
                            : "Be the first to share something!"}
                    </p>
                </div>
            )}

            {/* Posts Feed */}
            {!isLoading && posts.length > 0 && (
                <div className="space-y-3">
                    {posts.map((post) => (
                        <PostCard key={post.postId} post={post} />
                    ))}
                </div>
            )}

            {/* Post Detail Modal */}
            <PostDetailModal post={null} />
        </div>
    );
}
