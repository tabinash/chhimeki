"use client";
import React, { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, Plus, Store } from "lucide-react";
import { businesses } from "@/data/mockBusinessData";
import BusinessCard from "./BusinessCard";
import Link from "next/link";

export default function BusinessDirectoryPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBusinesses = businesses.filter(b =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Section - Mobile Optimized */}
            <div className="sticky top-0 z-30 bg-white border-b border-gray-100">
                <div className="px-4 py-3">
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Pasal</h1>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>Ward 4, Bharatpur</span>
                            </p>
                        </div>
                        <Link
                            href="/storefront/new"
                            className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-full active:scale-95 transition-all shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add</span>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search shops, restaurants..."
                            className="w-full pl-10 pr-10 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Category Pills - Horizontal Scroll */}
                <div className="px-4 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
                    <CategoryPill label="All" active />
                    <CategoryPill label="Retail" icon="🏪" />
                    <CategoryPill label="Food" icon="🍜" />
                    <CategoryPill label="Services" icon="🔧" />
                    <CategoryPill label="Health" icon="💊" />
                    <CategoryPill label="Fashion" icon="👗" />
                </div>
            </div>

            {/* Business List */}
            <div className="p-4 space-y-3">
                {filteredBusinesses.length === 0 ? (
                    <div className="text-center py-16">
                        <Store className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="font-bold text-gray-900">No businesses found</h3>
                        <p className="text-gray-500 text-sm mt-1">Try a different search term</p>
                    </div>
                ) : (
                    filteredBusinesses.map((business) => (
                        <BusinessCard key={business.id} business={business} />
                    ))
                )}
            </div>
        </div>
    );
}

// Category Pill Component
function CategoryPill({ label, icon, active }: { label: string; icon?: string; active?: boolean }) {
    return (
        <button
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${active
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 active:bg-gray-200"
                }`}
        >
            {icon && <span>{icon}</span>}
            {label}
        </button>
    );
}
