"use client";
import { SlidersHorizontal, MapPin, Tag, ShoppingBag } from "lucide-react";

export function MarketplaceLeftSidebar() {
    return (
        <aside className="w-50 min-w-[280px] flex-shrink-0 flex flex-col p-4">
            <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col gap-6">

                {/* Filters Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Reset</button>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Tag className="h-4 w-4" /> Categories
                    </h3>
                    <div className="space-y-2">
                        {['Furniture', 'Electronics', 'Vehicles', 'Clothing', 'Home & Garden'].map((cat, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm text-gray-700">{cat}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h3>
                    <div className="flex items-center gap-2">
                        <input type="number" placeholder="Min" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                        <span className="text-gray-400">-</span>
                        <input type="number" placeholder="Max" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                    </div>
                </div>

                {/* Location */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> Location
                    </h3>
                    <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>Within 10 km</span>
                    </div>
                </div>

                <button className="w-full py-3 bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Create Listing
                </button>
            </div>
        </aside>
    );
}
