"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Star, MapPin, Search, CheckCircle2, Store } from "lucide-react";
import Link from "next/link";
import { suggestedUsers, peopleYouMayKnow, suggestedInstitutions, nearbyInstitutions, groups } from "@/data/explore";
import { businesses } from "@/data/mockStoreFrontData";
import { posts } from "@/data/mockFeedData";
import PostCard from "../(feed)/home/_components/PostCard";
import Image from "next/image";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get("q") || "";
    const [activeTab, setActiveTab] = useState<"all" | "people" | "posts" | "shops" | "marketplace" | "groups">("all");

    // Flatten products for marketplace
    const allProducts = businesses.flatMap(b => b.products || []).map(p => ({
        ...p,
        businessName: "shutal",
        businessId: "123"
    }));

    // Combine people data
    const allUsers = [...suggestedUsers, ...peopleYouMayKnow];

    // Filter Logic (Mock search)
    // In a real app, this would be handled by the API based on 'query'
    const filteredPeople = allUsers;
    const filteredPosts = posts;
    const filteredShops = businesses;
    const filteredProducts = allProducts;
    const filteredGroups = groups;


    const renderTabs = () => (
        <div className="flex items-center px-4 border-b border-gray-100 bg-white sticky top-0 z-40 overflow-x-auto hide-scrollbar">
            {["all", "people", "shops", "marketplace", "groups"].map((tab) => {
                const isActive = activeTab === tab;
                return (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`
                            relative py-4 px-4 text-[15px] font-bold capitalize whitespace-nowrap transition-colors
                            ${isActive ? "text-[#0f1419]" : "text-[#536471] hover:bg-gray-50"}
                        `}
                    >
                        {tab}
                        {isActive && (
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 sm:w-14 h-[4px] bg-blue-500 rounded-full" />
                        )}
                    </button>
                );
            })}
        </div>
    );

    const renderPeopleList = (limit?: number) => {
        const data = limit ? filteredPeople.slice(0, limit) : filteredPeople;
        if (data.length === 0) return null;

        return (
            <div className="bg-white">
                {data.map((item: any, i: number) => (
                    <div key={i} className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-none">
                        <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                                <h4 className="font-bold text-[15px] text-[#0f1419] truncate leading-5">{item.name}</h4>
                                {item.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-white" />}
                            </div>
                            <p className="text-[14px] text-[#536471] truncate leading-5">@{item.username}</p>
                            {item.description && <p className="text-[14px] text-[#0f1419] mt-1 line-clamp-1">{item.description}</p>}
                        </div>
                        <button className="px-4 py-1.5 bg-[#0f1419] text-white text-sm font-bold rounded-full hover:bg-black/90 transition-colors">
                            Follow
                        </button>
                    </div>
                ))}
                {limit && (
                    <div
                        onClick={() => setActiveTab("people")}
                        className="px-4 py-3.5 text-blue-500 text-[15px] font-normal hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        Show more people
                    </div>
                )}
            </div>
        );
    };

    const renderShopList = (limit?: number) => {
        const data = limit ? filteredShops.slice(0, limit) : filteredShops;
        if (data.length === 0) return null;

        return (
            <div className="bg-white">
                {data.map((item: any, i: number) => (
                    <Link href={`/storefront/${item.id}`} key={i} className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer flex items-start gap-3 border-b border-gray-50 last:border-none">
                        <img src={item.coverImage} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                                <h4 className="font-bold text-[15px] text-[#0f1419] truncate leading-5">{item.name}</h4>
                                {item.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-white" />}
                            </div>
                            <p className="text-[14px] text-[#536471] mb-1">{item.category}</p>

                            <div className="flex items-center gap-3 text-xs text-[#536471]">
                                <div className="flex items-center gap-1 text-orange-500">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span className="font-medium text-[#536471]">{item.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    <span className="truncate">{item.location}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                {limit && (
                    <div
                        onClick={() => setActiveTab("shops")}
                        className="px-4 py-3.5 text-blue-500 text-[15px] font-normal hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        Show more shops
                    </div>
                )}
            </div>
        )
    }



    const renderMarketplaceGrid = () => {
        return (
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredProducts.map((item: any, i: number) => (
                    <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors cursor-pointer group">
                        <div className="aspect-square relative bg-gray-100">
                            <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-2.5">
                            <h4 className="font-medium text-[15px] text-[#0f1419] line-clamp-1">{item.name}</h4>
                            <p className="text-[13px] font-bold text-[#0f1419] mt-0.5">{item.price}</p>
                            <div className="flex items-center gap-1 mt-1.5 opacity-60">
                                <Store className="w-3 h-3" />
                                <p className="text-[11px] truncate">{item.businessName}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header / Search Input Area used to be here, but now it's in MainHeader. 
                We might want a visual indicator or duplicate input for mobile if MainHeader isn't sticky enough or clear.
                For now, we rely on the MainHeader.
            */}

            {/* Sticky Tabs */}
            {renderTabs()}

            {/* Content Area */}
            <div className="min-h-screen">
                {activeTab === "all" && (
                    <div className="divide-y divide-gray-100">
                        {/* Highlights: People */}
                        <div className="py-2">
                            <div className="px-4 py-2">
                                <h3 className="font-extrabold text-[19px] text-[#0f1419]">People</h3>
                            </div>
                            {renderPeopleList(3)}
                        </div>

                        {/* Highlights: Shops */}
                        <div className="py-2">
                            <div className="px-4 py-2">
                                <h3 className="font-extrabold text-[19px] text-[#0f1419]">Shops</h3>
                            </div>
                            {renderShopList(3)}
                        </div>


                    </div>
                )}

                {activeTab === "people" && renderPeopleList()}


                {activeTab === "shops" && renderShopList()}

                {activeTab === "marketplace" && renderMarketplaceGrid()}

                {activeTab === "groups" && (
                    <div className="py-10 text-center">
                        <p className="text-gray-500">Groups results coming soon.</p>
                    </div>
                )}


            </div>
        </div>
    );
}
