"use client";
import { Hash, MapPin, TrendingUp } from "lucide-react";

export function ExploreRightSidebar() {
    return (
        <aside className="w-80 min-w-[280px] flex-shrink-0 flex flex-col p-4">
            <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col gap-6">
                {/* Trending Hashtags */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Hash className="h-5 w-5 text-gray-700" />
                        <h2 className="text-lg font-semibold text-gray-900">Trending Now</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { tag: 'SupportLocal', posts: '12.5k posts' },
                            { tag: 'CommunityCleanUp', posts: '8.2k posts' },
                            { tag: 'NightMarket', posts: '5.1k posts' },
                            { tag: 'WeekendVibes', posts: '3.4k posts' }
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center cursor-pointer group">
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">#{item.tag}</p>
                                    <p className="text-xs text-gray-500">{item.posts}</p>
                                </div>
                                <TrendingUp className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Locations */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <MapPin className="h-5 w-5 text-gray-700" />
                        <h2 className="text-lg font-semibold text-gray-900">Popular Places</h2>
                    </div>
                    <div className="space-y-3">
                        {[
                            { name: 'Central Park', category: 'Park' },
                            { name: 'Downtown Library', category: 'Education' },
                            { name: 'City Mall', category: 'Shopping' }
                        ].map((place, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                    <MapPin className="h-5 w-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{place.name}</p>
                                    <p className="text-xs text-gray-500">{place.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
