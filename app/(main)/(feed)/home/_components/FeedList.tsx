"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { posts } from "@/data/mockFeedData";
import { marketplaceItems, MarketplaceItem } from "@/data/mockMarketplaceData";
import { businesses } from "@/data/mockBusinessData";
import { jobs } from "@/data/mockJobsData";
import PostCard from "./PostCard";
import MarketplaceCard from "./MarketplaceCard";
import BusinessCard from "./BusinessCard";
import JobCard from "./JobCard";
import PostDetailModal from "@/components/modals/PostDetailModal";
import ProductDetailModal from "@/components/modals/ProductDetailModal";
import JobDetailModal from "@/components/modals/JobDetailModal";

type TabItem = {
    id: string;
    label: string;
};

export default function FeedList() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeTab = searchParams.get('tab') || 'all';
    const postId = searchParams.get('postId');

    // Modal state management
    const [selectedProduct, setSelectedProduct] = useState<MarketplaceItem | null>(null);
    const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

    // Find the selected post for modal
    const selectedPost = postId ? posts.find(p => p.id.toString() === postId) || null : null;

    const TABS: TabItem[] = [
        { id: "all", label: "Following" },
        { id: "alerts", label: "Near You" },
        { id: "notices", label: "Interests" },
    ];

    const handleTabChange = (tab: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (tab === 'all') {
            params.delete('tab');
        } else {
            params.set('tab', tab);
        }
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    const filteredPosts = activeTab === 'all'
        ? posts
        : posts.filter(post => {
            if (activeTab === 'alerts') return post.type === 'alert';
            if (activeTab === 'lost-found') return post.type === 'lost-found';
            if (activeTab === 'notices') return post.type === 'notice';
            return true;
        });

    return (
        <div>
            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-200 mb-6 bg-white rounded-t-xl px-4">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;

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

            {/* Posts Feed with Injected Content */}
            <div className="space-y-6">
                {filteredPosts.map((post, index) => (
                    <div key={post.id}>
                        <PostCard post={post} />

                        {/* Inject Marketplace after 3rd post */}
                        {index === 2 && activeTab === 'all' && (
                            <div className="mt-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-gray-900 font-bold text-lg">Marketplace Picks</h3>
                                    <button
                                        onClick={() => router.push('/marketplace')}
                                        className="text-blue-600 text-sm font-semibold hover:underline"
                                    >
                                        See All →
                                    </button>
                                </div>
                                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                                    {marketplaceItems.slice(0, 6).map((item) => (
                                        <div key={item.id} onClick={() => setSelectedProduct(item)}>
                                            <MarketplaceCard item={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Inject Jobs after 5th post (2 posts after marketplace) */}
                        {index === 4 && activeTab === 'all' && (
                            <div className="mt-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-gray-900 font-bold text-lg">Neighborhood Jobs</h3>
                                    <button
                                        onClick={() => router.push('/jobs')}
                                        className="text-blue-600 text-sm font-semibold hover:underline"
                                    >
                                        See All →
                                    </button>
                                </div>
                                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                                    {jobs.slice(0, 5).map((job) => (
                                        <div key={job.id} onClick={() => setSelectedJob(job)}>
                                            <JobCard job={job} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Inject Business after 8th post */}
                        {index === 7 && activeTab === 'all' && (
                            <div className="mt-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-gray-900 font-bold text-lg">Local Businesses</h3>
                                    <button
                                        onClick={() => router.push('/businesses')}
                                        className="text-blue-600 text-sm font-semibold hover:underline"
                                    >
                                        See All →
                                    </button>
                                </div>
                                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                                    {businesses.map((business) => (
                                        <BusinessCard key={business.id} business={business} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Post Detail Modal */}
            <PostDetailModal post={selectedPost} />

            {/* Product Detail Modal */}
            <ProductDetailModal
                item={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />

            {/* Job Detail Modal */}
            <JobDetailModal
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
            />
        </div>
    );
}
