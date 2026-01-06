"use client";
import { Bell, MapPin, Phone, ShieldAlert, FileText, CloudSun, Store, TrendingUp, Users, Calendar, Sparkles, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeedRightSidebarProps {
    width: number;
    compact: boolean;
}

export function FeedRightSidebar({ width, compact }: FeedRightSidebarProps) {
    // Check if user has a business page (mock data - replace with real logic)
    const hasBusinessPage = false;

    return (
        <aside
            className="flex-shrink-0 flex flex-col p-4 gap-4 transition-all duration-300"
            style={{ width: `${width}px` }}
        >

            {/* Business Page CTA / Quick Stats */}
            {!hasBusinessPage ? (
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 to-blue-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group">
                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <Store className="w-5 h-5" strokeWidth={2.5} />
                            </div>
                            <Sparkles className="w-5 h-5 text-yellow-300" />
                        </div>
                        <h3 className="text-lg font-bold mb-1">Start Your Business</h3>
                        <p className="text-sm text-purple-100 mb-4 leading-relaxed">
                            Create a professional storefront and reach your neighbors
                        </p>
                        <Link
                            href="/business/create"
                            className="flex items-center justify-center gap-2 w-full bg-white text-black py-2.5 px-4 rounded-xl font-bold text-sm hover:bg-purple-50 transition-all hover:shadow-xl"
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

            {/* Trending in Your Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                        Trending Nearby
                    </h2>
                    <span className="text-xs text-orange-600 font-semibold">🔥 Hot</span>
                </div>
                <div className="space-y-2">
                    <Link href="/?topic=water-shortage" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                        <div>
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">Water Shortage Alert</p>
                            <p className="text-xs text-gray-500">24 discussions</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link href="/?topic=clean-drive" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                        <div>
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">Saturday Clean Drive</p>
                            <p className="text-xs text-gray-500">18 going</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link href="/?topic=new-momo" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                        <div>
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">New MoMo Shop Opens</p>
                            <p className="text-xs text-gray-500">12 reviews</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                </div>
            </div>

            {/* Quick Weather - Compact */}
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
                <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            </div>



            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col gap-5">

                {/* Emergency Contacts - Critical for Neighborhood App */}
                <div>
                    <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                        Emergency Numbers
                    </h2>
                    <div className="grid grid-cols-3 gap-2">
                        <button className="flex flex-col items-center justify-center bg-red-50 hover:bg-red-100 p-2 rounded-xl transition-colors border border-red-100">
                            <Phone className="w-5 h-5 text-red-600 mb-1" />
                            <span className="text-[10px] font-bold text-red-800">Police</span>
                            <span className="text-[10px] text-red-600">100</span>
                        </button>
                        <button className="flex flex-col items-center justify-center bg-red-50 hover:bg-red-100 p-2 rounded-xl transition-colors border border-red-100">
                            <div className="w-5 h-5 text-red-600 mb-1 font-bold flex items-center justify-center text-xs">+</div>
                            <span className="text-[10px] font-bold text-red-800">Ambulance</span>
                            <span className="text-[10px] text-red-600">102</span>
                        </button>
                        <button className="flex flex-col items-center justify-center bg-red-50 hover:bg-red-100 p-2 rounded-xl transition-colors border border-red-100">
                            <span className="w-5 h-5 text-red-600 mb-1 flex items-center justify-center font-bold">🚒</span>
                            <span className="text-[10px] font-bold text-red-800">Fire</span>
                            <span className="text-[10px] text-red-600">101</span>
                        </button>
                    </div>
                </div>

                {/* Notices & Alerts - Highlighted */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                            <Bell className="w-4 h-4 text-orange-500" />
                            Ward 4 Notices
                        </h2>
                        <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-md font-bold">1 New</span>
                    </div>
                    <div className="space-y-3">
                        <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 leading-tight mb-1">Tax Collection Schedule</h4>
                                    <p className="text-xs text-gray-500 line-clamp-2">The yearly property tax collection camp will be held at...</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                                    <ShieldAlert className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 leading-tight mb-1">Road Closure</h4>
                                    <p className="text-xs text-gray-500 line-clamp-2">Main road blocked due to Melamchi pipe work.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Local Services / Helper Recommendation - Hidden in compact mode */}
                {!compact && (
                    <div>
                        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-600" />
                            Top Local Helpers
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                                    <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="Helper" fill className="object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-gray-900">Sita Didi</h4>
                                    <p className="text-xs text-gray-500">House Cleaning • 4.9 ★</p>
                                </div>
                                <button className="text-xs border border-gray-200 px-3 py-1.5 rounded-full font-medium hover:bg-black hover:text-white transition-colors">
                                    Call
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </aside>
    );
}
