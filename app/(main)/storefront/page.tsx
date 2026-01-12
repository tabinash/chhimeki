"use client";
import React, { useState } from 'react';
import { Search, MapPin, Store, Plus, Loader2 } from "lucide-react";
import CreateStoreModal from "./_modals/CreateStoreModal";
import { useAllStorefronts, useMyStorefront } from "./_hook";
import Image from "next/image";
import Link from "next/link";

export default function StoreFrontPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateShopOpen, setIsCreateShopOpen] = useState(false);

    // API Hooks
    const { data: storefrontsData, isLoading } = useAllStorefronts({ page: 0, size: 50 });
    const { data: myStorefrontData, isLoading: isLoadingMyStorefront } = useMyStorefront();
    console.log("store front data", storefrontsData)
    // Get storefronts from API response
    const storefronts = storefrontsData?.data ?? [];

    // Check if current user has a storefront
    const hasMyStorefront = !!myStorefrontData?.data;
    const myStorefront = myStorefrontData?.data;

    // Filter stores based on search
    const filteredStorefronts = storefronts.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.palika.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.district.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 min-w-0 bg-white">
            <CreateStoreModal
                isOpen={isCreateShopOpen}
                onClose={() => setIsCreateShopOpen(false)}
            />
            {/* Header Section */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
                <div className="px-4 md:px-6 py-4">
                    {/* Top Row: Title + Search + Actions */}
                    <div className="flex items-center gap-3 mb-3">
                        {/* Title with Icon */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Store className="w-4 h-4 text-blue-600" />
                            </div>
                            <h1 className="text-lg font-bold text-gray-900">Neighborhood Shops</h1>
                        </div>

                        {/* Search Bar - Desktop */}
                        <div className="flex-1 relative max-w-sm mx-3 hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search shops..."
                                className="w-full pl-9 pr-4 py-2 bg-gray-100 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Actions Area */}
                        <div className="flex items-center gap-2 ml-auto">
                            {/* Conditional: My Shop or Create Shop */}
                            {isLoadingMyStorefront ? (
                                <div className="px-3 py-2 bg-gray-100 rounded-xl">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-500" />
                                </div>
                            ) : hasMyStorefront && myStorefront ? (
                                <Link
                                    href={`/storefront/${myStorefront.id}`}
                                    className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-xl transition-colors"
                                >
                                    <Store className="w-3.5 h-3.5" />
                                    My Shop
                                </Link>
                            ) : (
                                <button
                                    onClick={() => setIsCreateShopOpen(true)}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-200 active:scale-95"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Create Shop</span>
                                    <span className="sm:hidden">New</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile Search */}
                    <div className="md:hidden relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search shops..."
                            className="w-full pl-9 pr-4 py-2.5 bg-gray-100 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filter Chips */}
                    <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
                        <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg whitespace-nowrap transition-colors">
                            All Shops
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold rounded-lg whitespace-nowrap flex items-center gap-1 transition-colors">
                            <MapPin className="w-3 h-3" />
                            Near Me
                        </button>
                    </div>
                </div>
            </div>

            {/* List Content */}
            <div className="max-w-4xl mx-auto p-6 md:p-8">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                ) : filteredStorefronts.length > 0 ? (
                    <div className="space-y-3">
                        {filteredStorefronts.map((storefront) => (
                            <Link
                                key={storefront.id}
                                href={`/storefront/${storefront.id}`}
                                className="group block relative bg-white rounded-2xl p-3 hover:bg-gray-50 transition-colors border border-gray-100 hover:border-gray-200 hover:shadow-sm"
                            >
                                <div className="flex gap-4 items-center">
                                    {/* Logo */}
                                    <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                                        <Image
                                            src={storefront.logo || "/placeholder-cover.jpg"}
                                            alt={storefront.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-base text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                            {storefront.name}
                                        </h3>
                                        <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="truncate">{storefront.palika}, {storefront.district}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <Store className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-gray-600 mb-1">No shops found</h3>
                        <p className="text-sm text-gray-500">
                            {searchQuery ? "Try adjusting your search" : "Be the first to create a shop!"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}