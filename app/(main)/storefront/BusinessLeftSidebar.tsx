"use client";
import { Store, Coffee, Wrench, HeartPulse, Filter } from "lucide-react";

export function BusinessLeftSidebar() {
    return (
        <aside className="w-80 min-w-[280px] flex-shrink-0 flex flex-col p-4">
            <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col gap-6">

                {/* Filters Header */}
                <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                        <Filter className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">Filters</span>
                </div>

                {/* Category Filters */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categories</h3>

                    <label className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Store className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Retail Stores</span>
                        <input type="checkbox" className="ml-auto w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                    </label>

                    <label className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Coffee className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Food & Cafe</span>
                        <input type="checkbox" className="ml-auto w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                    </label>

                    <label className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Wrench className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Services</span>
                        <input type="checkbox" className="ml-auto w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                    </label>

                    <label className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <HeartPulse className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Health</span>
                        <input type="checkbox" className="ml-auto w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                    </label>
                </div>

                {/* Status Filters */}
                <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status & Features</h3>

                    <label className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <span className="text-sm font-medium text-gray-700">Open Now Only</span>
                        <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="toggle" id="open-toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-green-500" />
                            <label htmlFor="open-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer checked:bg-green-500"></label>
                        </div>
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <span className="text-sm font-medium text-gray-700">Home Delivery</span>
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                    </label>
                </div>

            </div>
        </aside>
    );
}
