"use client";
import { Search, Plus } from "lucide-react";

export function GroupsHeader() {
    return (
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Discover Groups</h1>
            <div className="flex items-center gap-3">
                <button className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors">
                    <Search className="w-4 h-4 text-gray-700" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium">
                    <Plus className="w-4 h-4" />
                    Create group
                </button>
            </div>
        </div>
    );
}
