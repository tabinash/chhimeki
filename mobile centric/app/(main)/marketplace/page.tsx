"use client";

import { Search, MapPin, Tag, ShoppingBag, Filter, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { marketplaceItems } from "@/data/mockMarketplaceData";
import ProductCard from "./_components/ProductCard";

export default function MarketplacePage() {
    const [viewMode, setViewMode] = useState<'browse' | 'selling'>('browse');

    const filteredItems = viewMode === 'selling'
        ? marketplaceItems.filter(item => item.isOwner)
        : marketplaceItems;

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24">

            {/* Mobile Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Marketplace</h1>
                        <p className="text-xs text-gray-500">Buy & sell nearby</p>
                    </div>
                    <Link
                        href="/marketplace/sell"
                        className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded-full text-xs font-bold shadow-lg shadow-gray-200 active:scale-95 transition-transform"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Sell</span>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                        />
                    </div>
                    <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">
                        <Filter className="h-4 w-4" />
                    </button>
                </div>

                {/* Tags / Tabs */}
                <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
                    <button
                        onClick={() => setViewMode('browse')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${viewMode === 'browse'
                            ? 'bg-black text-white'
                            : 'bg-white border border-gray-200 text-gray-600'
                            }`}
                    >
                        Browse All
                    </button>
                    <button
                        onClick={() => setViewMode('selling')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${viewMode === 'selling'
                            ? 'bg-black text-white'
                            : 'bg-white border border-gray-200 text-gray-600'
                            }`}
                    >
                        My Listings
                    </button>
                    {['Furniture', 'Electronics', 'Vehicles'].map(cat => (
                        <button key={cat} className="px-4 py-1.5 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-600 whitespace-nowrap">
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <ShoppingBag className="w-6 h-6 text-gray-400" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900">No items found</h3>
                            <p className="text-gray-500 text-xs mt-1">
                                {viewMode === 'selling' ? "Start selling today!" : "Try adjusting your filters."}
                            </p>
                            {viewMode === 'selling' && (
                                <Link
                                    href="/marketplace/sell"
                                    className="mt-4 px-5 py-2 inline-flex bg-black text-white rounded-xl text-xs font-bold"
                                >
                                    List an Item
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
