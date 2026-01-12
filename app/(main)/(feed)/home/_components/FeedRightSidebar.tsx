"use client";
import { Bell, MapPin, Phone, ShieldAlert, FileText, CloudSun, Store, TrendingUp, Sparkles, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeedRightSidebarProps {
    width: number;
    compact: boolean;
}

export function FeedRightSidebar({ width, compact }: FeedRightSidebarProps) {
    const hasBusinessPage = false;

    return (
        <aside
            className="flex flex-col p-4 gap-4 transition-all duration-300"
            style={{ width: `${width}px` }}
        >
            {/* Business Page CTA */}
            {!hasBusinessPage ? (
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group">
                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <Store className="w-5 h-5" strokeWidth={2.5} />
                            </div>
                            <Sparkles className="w-5 h-5 text-yellow-300" />
                        </div>
                        <h3 className="text-lg font-bold mb-1">Start Your Business</h3>
                        <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                            Create a professional storefront and reach your neighbors
                        </p>
                        <Link
                            href="/business/create"
                            className="flex items-center justify-center gap-2 w-full bg-white text-black py-2.5 px-4 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all"
                        >
                            <Plus className="w-4 h-4" strokeWidth={2.5} />
                            Create Business Page
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-4 text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <Store className="w-6 h-6" strokeWidth={2.5} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-sm">My Local Store</h3>
                                <p className="text-xs text-purple-100">Active</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500">This Week</p>
                                <p className="text-lg font-bold text-gray-900">156</p>
                                <p className="text-xs text-gray-500">Profile Views</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-green-500" />
                        </div>
                        <Link
                            href="/business/dashboard"
                            className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-xl font-medium text-sm transition-all"
                        >
                            View Dashboard
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}

            {/* Trending Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                        Trending Nearby
                    </h2>
                </div>
                <div className="space-y-1">
                    {["Water Shortage Alert", "Saturday Clean Drive", "New MoMo Shop"].map((topic, i) => (
                        <Link key={i} href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                            <div>
                                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">{topic}</p>
                                <p className="text-xs text-gray-500">{10 + i * 5} discussions</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Weather Section */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-2xl font-bold">24°C</h3>
                            <p className="text-blue-100 text-xs font-medium">Baneshwor</p>
                        </div>
                        <CloudSun className="w-8 h-8 text-yellow-300" />
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="bg-white/20 px-2 py-0.5 rounded-md font-semibold">AQI 45</span>
                        <span className="text-blue-100">Good</span>
                    </div>
                </div>
            </div>

            {/* Bottom Content Group */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col gap-6">
                {/* Emergency Contacts */}
                <div>
                    <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                        Emergency
                    </h2>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { label: "Police", num: "100" },
                            { label: "Ambulance", num: "102" },
                            { label: "Fire", num: "101" }
                        ].map((item) => (
                            <button key={item.label} className="flex flex-col items-center justify-center bg-red-50 hover:bg-red-100 p-2 rounded-xl border border-red-100 transition-colors">
                                <span className="text-[10px] font-bold text-red-800">{item.label}</span>
                                <span className="text-[10px] text-red-600 font-bold">{item.num}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Ward Notices */}
                <div>
                    <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Bell className="w-4 h-4 text-orange-500" />
                        Ward 4 Notices
                    </h2>
                    <div className="space-y-2">
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <h4 className="text-xs font-bold text-gray-900">Tax Collection Schedule</h4>
                            <p className="text-[10px] text-gray-500 mt-1">Starts next week at the ward office.</p>
                        </div>
                    </div>
                </div>

                {/* Local Helpers */}
                {!compact && (
                    <div>
                        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-600" />
                            Top Helpers
                        </h2>
                        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="Helper" fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xs font-semibold">Sita Didi</h4>
                                <p className="text-[10px] text-gray-500">4.9 ★</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}