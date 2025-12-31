"use client";
import { TrendingUp, Users } from "lucide-react";

export function GroupsRightSidebar() {
    return (
        <aside className="w-80 min-w-[280px] flex-shrink-0 flex flex-col p-4">
            <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col gap-6">
                {/* Trending Groups */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="h-5 w-5 text-gray-700" />
                        <h2 className="text-lg font-semibold text-gray-900">Trending Groups</h2>
                    </div>
                    <div className="space-y-3">
                        {['UI/UX Designers', 'Local Business', 'Photography'].map((group, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{group}</p>
                                    <p className="text-xs text-gray-500">{Math.floor(Math.random() * 5000)} members</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Group Categories */}
                <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Business', 'Tech', 'Sports', 'Arts', 'Education'].map((cat, i) => (
                            <button key={i} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-700 transition-colors">
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
