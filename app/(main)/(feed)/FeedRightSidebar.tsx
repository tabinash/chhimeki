"use client";
import { Bell, MapPin, Phone, ShieldAlert, FileText, CloudSun } from "lucide-react";
import Image from "next/image";

interface FeedRightSidebarProps {
    width: number;
    compact: boolean;
}

export function FeedRightSidebar({ width, compact }: FeedRightSidebarProps) {
    return (
        <aside
            className="flex-shrink-0 flex flex-col p-4 gap-6 transition-all duration-300"
            style={{ width: `${width}px` }}
        >

            {/* Weather Widget - Kept as it's useful locals */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform">
                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-bold">24°C</h3>
                        <p className="text-blue-100 text-sm font-medium">Baneshwor, Ktm</p>
                    </div>
                    <CloudSun className="w-10 h-10 text-yellow-300" />
                </div>
                <div className="relative z-10 mt-4 flex items-center gap-2 text-sm font-medium text-blue-50">
                    <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs">AQI 45</span>
                    <span>Good Air Quality</span>
                </div>
                {/* Abstract shapes */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-colors" />
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-5 flex flex-col gap-6">

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
