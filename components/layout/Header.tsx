"use client";
import { Search, SlidersHorizontal, Mail, User, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
    return (
        <header className="w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between h-16 px-6 max-w-[1920px] mx-auto">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">C</span>
                        </div>
                        <h1 className="text-lg font-bold text-gray-900 tracking-tight hidden sm:block">
                            CONNECTIFY
                        </h1>
                    </div>
                </Link>

                {/* Center Search Bar */}
                <div className="flex-1 max-w-2xl mx-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" strokeWidth={2} />
                        <input
                            type="text"
                            placeholder="Search for services, groups, people..."
                            className="w-full h-11 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <SlidersHorizontal className="h-4 w-4 text-gray-500" strokeWidth={2} />
                        </button>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                        <Bell className="h-5 w-5 text-gray-700" strokeWidth={2} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <Link href="/messages" className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors block">
                        <Mail className="h-5 w-5 text-gray-700" strokeWidth={2} />
                    </Link>

                    {/* User Profile */}
                    <div className="ml-2 pl-2 border-l border-gray-200">
                        <button className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-xl transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                                <span className="text-white text-xs font-semibold">AB</span>
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="text-sm font-medium text-gray-900 leading-none">Abinash</p>
                                <p className="text-xs text-gray-500">View profile</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
