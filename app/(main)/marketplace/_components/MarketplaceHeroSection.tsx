"use client";
import {
    ShoppingBag,
    Search,
    Tag,
    MapPin
} from "lucide-react";

interface MarketplaceHeroSectionProps {
    viewMode: 'browse' | 'selling';
    onViewModeChange: (mode: 'browse' | 'selling') => void;
    onSellClick?: () => void;
    productCount?: number;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
}

export function MarketplaceHeroSection({
    viewMode,
    onViewModeChange,
    onSellClick,
    productCount,
    searchQuery = "",
    onSearchChange
}: MarketplaceHeroSectionProps) {
    return (
        <div className="mb-6">
            {/* Hero Card - Blue Theme */}
            <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-6 mb-5">
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                {/* Content */}
                <div className="relative z-10">
                    {/* Title Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <ShoppingBag className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Marketplace</h1>
                                <p className="text-blue-100 text-sm">Buy & sell with your neighbors</p>
                            </div>
                        </div>

                        {onSellClick && (
                            <button
                                onClick={onSellClick}
                                className="flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors self-start sm:self-auto"
                            >
                                <Tag className="w-4 h-4" />
                                Sell Item
                            </button>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => onSearchChange?.(e.target.value)}
                                placeholder="Search for items..."
                                className="w-full pl-11 pr-4 py-3 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                            />
                        </div>
                        <div className="relative sm:w-40">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <select
                                className="w-full pl-9 pr-4 py-3 bg-white rounded-xl text-sm focus:outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Near Me</option>
                                <option value="5">5 km</option>
                                <option value="10">10 km</option>
                            </select>
                        </div>
                        <button className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl text-sm hover:bg-gray-800 transition-colors">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs - White Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex gap-2">
                        <button
                            onClick={() => onViewModeChange('browse')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'browse'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Browse
                        </button>
                        <button
                            onClick={() => onViewModeChange('selling')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'selling'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <Tag className="w-4 h-4" />
                            My Listings
                        </button>
                    </div>

                    {productCount !== undefined && viewMode === 'browse' && (
                        <span className="text-xs text-gray-500">
                            <span className="font-bold text-gray-700">{productCount}</span> items found
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
