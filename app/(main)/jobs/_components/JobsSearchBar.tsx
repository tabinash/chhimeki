"use client";
import { Search, Filter } from "lucide-react";

interface JobsSearchBarProps {
    viewMode: 'seeking' | 'hiring';
}

export function JobsSearchBar({ viewMode }: JobsSearchBarProps) {
    return (
        <div className="flex gap-3 mb-8">
            <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder={viewMode === 'hiring' ? "Search your job posts..." : "What kind of work are you looking for?"}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors shadow-sm"
                />
            </div>
            {viewMode === 'seeking' && (
                <button className="px-5 flex items-center gap-2 border border-gray-200 bg-white rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filters</span>
                </button>
            )}
            <button className="px-6 bg-black text-white font-bold rounded-xl text-sm hover:bg-gray-800 transition-colors">
                Search
            </button>
        </div>
    );
}
