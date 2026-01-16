"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import PostCard from "./post card";
import { useGeneralFeed, useAlertFeed } from "../_hook";
import { FeedItemResponse } from "@/types/api/feed";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";

type TabItem = {
    id: string;
    label: string;
};

const TABS: TabItem[] = [
    { id: "all", label: "Following" },
    { id: "alerts", label: "Alerts" },
];

function PostCardSkeleton() {
    return (
        <div className="bg-white border-b border-gray-100 animate-pulse">
            <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
            </div>
            <div className="px-4 pb-3 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>
            <div className="aspect-square bg-gray-200" />
            <div className="px-4 py-3 flex gap-3">
                <div className="h-8 w-16 bg-gray-200 rounded-full" />
                <div className="h-8 w-16 bg-gray-200 rounded-full" />
            </div>
        </div>
    );
}

function EmptyState({ tab }: { tab: string }) {
    return (
        <div className="py-16 px-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
                No posts yet
            </h3>
            <p className="text-sm text-gray-500">
                {tab === "alerts"
                    ? "No alerts in your area right now. Check back later!"
                    : "Be the first to share something with your neighbors!"}
            </p>
        </div>
    );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="py-16 px-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
                Failed to load feed
            </h3>
            <p className="text-sm text-gray-500 mb-4">
                Something went wrong. Please try again.
            </p>
            <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
                <RefreshCw className="w-4 h-4" />
                Retry
            </button>
        </div>
    );
}

function LoadingIndicator() {
    return (
        <div className="py-8 flex flex-col items-center gap-2">
            <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
            <span className="text-sm text-gray-500">Loading more posts...</span>
        </div>
    );
}

function EndOfFeed() {
    return (
        <div className="py-8 text-center">
            <p className="text-sm text-gray-400">You&apos;re all caught up! 🎉</p>
        </div>
    );
}

export default function FeedList() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeTab = searchParams.get("tab") || "all";
    const virtuosoRef = useRef<VirtuosoHandle>(null);

    // Infinite query for general feed
    const {
        data: generalData,
        isLoading: isLoadingGeneral,
        isError: isErrorGeneral,
        isFetchingNextPage: isFetchingNextGeneral,
        hasNextPage: hasNextGeneral,
        fetchNextPage: fetchNextGeneral,
        refetch: refetchGeneral,
    } = useGeneralFeed(20);

    // Infinite query for alert feed
    const {
        data: alertData,
        isLoading: isLoadingAlerts,
        isError: isErrorAlerts,
        isFetchingNextPage: isFetchingNextAlerts,
        hasNextPage: hasNextAlerts,
        fetchNextPage: fetchNextAlerts,
        refetch: refetchAlerts,
    } = useAlertFeed(20);

    const handleTabChange = (tab: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (tab === "all") {
            params.delete("tab");
        } else {
            params.set("tab", tab);
        }
        router.replace(`?${params.toString()}`, { scroll: false });
        // Scroll to top when tab changes
        virtuosoRef.current?.scrollToIndex({ index: 0, behavior: "smooth" });
    };

    // Flatten pages into single array of posts
    const posts: FeedItemResponse[] = useMemo(() => {
        if (activeTab === "alerts") {
            return alertData?.pages.flatMap((page) => page.data) || [];
        }
        return generalData?.pages.flatMap((page) => page.data) || [];
    }, [activeTab, generalData, alertData]);

    // Determine current state based on active tab
    const isLoading = activeTab === "alerts" ? isLoadingAlerts : isLoadingGeneral;
    const isError = activeTab === "alerts" ? isErrorAlerts : isErrorGeneral;
    const isFetchingNext = activeTab === "alerts" ? isFetchingNextAlerts : isFetchingNextGeneral;
    const hasNextPage = activeTab === "alerts" ? hasNextAlerts : hasNextGeneral;
    const fetchNextPage = activeTab === "alerts" ? fetchNextAlerts : fetchNextGeneral;
    const refetch = activeTab === "alerts" ? refetchAlerts : refetchGeneral;

    // Load more when reaching end
    const loadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNext) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNext, fetchNextPage]);

    // Render individual post item
    const renderItem = useCallback(
        (index: number) => {
            const post = posts[index];
            if (!post) return null;
            return <PostCard key={post.postId} post={post} />;
        },
        [posts]
    );

    // Footer component showing loading or end state
    const Footer = useCallback(() => {
        if (isFetchingNext) {
            return <LoadingIndicator />;
        }
        if (!hasNextPage && posts.length > 0) {
            return <EndOfFeed />;
        }
        return null;
    }, [isFetchingNext, hasNextPage, posts.length]);

    return (
        <div className="h-screen flex flex-col">
            {/* Tabs */}
            <div className="sticky top-0 z-10 flex gap-8 border-b border-gray-200 px-4 pb-2 pt-3 bg-white">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`
                                relative pb-3 text-[15px] font-semibold transition-colors
                                ${isActive
                                    ? "text-blue-600"
                                    : "text-gray-500 hover:text-gray-700"}
                            `}
                        >
                            {tab.label}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
                {/* Loading State */}
                {isLoading && posts.length === 0 && (
                    <div className="divide-y divide-gray-100">
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                    </div>
                )}

                {/* Error State */}
                {isError && posts.length === 0 && (
                    <ErrorState onRetry={refetch} />
                )}

                {/* Empty State */}
                {!isLoading && !isError && posts.length === 0 && (
                    <EmptyState tab={activeTab} />
                )}

                {/* Virtualized Post List */}
                {posts.length > 0 && (
                    <Virtuoso
                        ref={virtuosoRef}
                        style={{ height: "100%" }}
                        data={posts}
                        endReached={loadMore}
                        overscan={500}
                        itemContent={(index) => renderItem(index)}
                        components={{
                            Footer,
                        }}
                    />
                )}
            </div>
        </div>
    );
}
