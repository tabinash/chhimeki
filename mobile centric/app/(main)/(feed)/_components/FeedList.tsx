"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { posts } from "@/data/mockFeedData";
import PostCard from "./PostCard";
import MarketplaceCard from "./MarketplaceCard";
import BusinessCard from "./BusinessCard";
import { marketplaceItems } from "@/data/mockMarketplaceData";
import { businesses } from "@/data/mockBusinessData";
import Image from "next/image";
import { MapPin } from "lucide-react";

type TabItem = {
    id: string;
    label: string;
};

export default function FeedList() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeTab = searchParams.get('tab') || 'all';
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
            <div className="flex gap-8 border-b border-gray-200 p-4 pb-2 bg-white">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`
          relative pb-3 text-[500] font-semibold transition-colors
          ${isActive
                                    ? "text-blue-500 border-b-2 border-blue-500"
                                    : "text-gray-500 hover:text-gray-700"}
        `}
                        >
                            {tab.label}


                        </button>
                    );
                })}
            </div>


            {/* Posts Feed - Profile Style */}
            <div className="divide-y divide-gray-100 border-t border-gray-100 space-y-1">
                {filteredPosts.map((post, index) => (
                    <div key={post.id}>
                        <PostCard post={post} />

                        {/* Inject Marketplace after 3rd post (index 2) */}
                        {index === 2 && activeTab === 'all' && (
                            <div className="py-2 bg-gray-50 overflow-hidden">
                                <div className="px-4 py-3 bg-white">
                                    <div className="flex items-center justify-between mb-3 px-1">
                                        <h3 className="text-gray-900 font-bold text-[18px]">Marketplace Picks</h3>
                                        <button
                                            onClick={() => router.push('/marketplace')}
                                            className="text-blue-600 text-[15px] font-[600] hover:underline"
                                        >
                                            See All
                                        </button>
                                    </div>
                                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-5">
                                        {marketplaceItems.map((item) => (
                                            <div key={item.id} onClick={() => router.push(`/marketplace/${item.id}`)}>
                                                <MarketplaceCard item={item} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Inject Business after 8th post (index 7) */}
                        {index === 7 && activeTab === 'all' && (
                            <div className="py-2 bg-gray-50 overflow-hidden">
                                <div className="px-4 py-3 bg-white">
                                    <div className="flex items-center justify-between mb-3 px-1">
                                        <h3 className="text-gray-900 font-bold text-[18px]">Local Businesses</h3>
                                        <button
                                            onClick={() => router.push('/businesses')}
                                            className="text-blue-600 text-[15px] font-[600] hover:underline"
                                        >
                                            See All
                                        </button>
                                    </div>
                                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-5">
                                        {businesses.map((business) => (
                                            <div key={business.id} onClick={() => router.push(`/businesses/${business.id}`)}>
                                                <BusinessCard business={business} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

