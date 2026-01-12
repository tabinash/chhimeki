"use client";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";

interface JobsSearchBarProps {
    viewMode: 'all' | 'my jobs';
}

export function JobsSearchBar({ viewMode }: JobsSearchBarProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-3">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder={viewMode === 'my jobs'
                            ? "Search your job posts..."
                            : "Search for job titles, skills, or keywords..."
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                </div>

                {/* Location Filter - Only for All Jobs */}
                {viewMode === 'all' && (
                    <div className="relative md:w-56">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                            <option>All Locations</option>
                            <option>Within 5 km</option>
                            <option>Within 10 km</option>
                            <option>My Ward Only</option>
                        </select>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                    {viewMode === 'all' && (
                        <button className="flex items-center justify-center gap-2 px-4 py-3.5 border border-gray-200 bg-gray-50 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                            <SlidersHorizontal className="h-4 w-4" />
                            <span className="hidden sm:inline">Filters</span>
                        </button>
                    )}
                    <button className="flex-1 md:flex-none px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-md shadow-blue-200">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}
