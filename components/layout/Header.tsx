"use client";
import { Search, SlidersHorizontal, Mail, User, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100/50 shadow-sm transition-all duration-300">
            <div className="flex items-center justify-between h-18 px-6 max-w-[1400px] mx-auto">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0 group">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight hidden sm:block group-hover:text-blue-600 transition-colors">
                            Chhimeki
                        </h1>
                    </div>
                </Link>

                {/* Center Search Bar */}
                <div className="flex-1 max-w-xl mx-8 hidden md:block">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" strokeWidth={2.5} />
                        <input
                            type="text"
                            placeholder="Search neighbors, services, events..."
                            className="w-full h-11 pl-11 pr-12 bg-gray-100/80 border border-transparent rounded-full text-sm font-medium text-gray-700 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white rounded-full transition-all text-gray-400 hover:text-blue-600 hover:shadow-sm">
                            <SlidersHorizontal className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 border-r border-gray-200 pr-4 mr-1">
                        <Link href="/notifications" className="relative p-2.5 hover:bg-gray-100/80 rounded-full transition-all text-gray-500 hover:text-blue-600" title="Notifications">
                            <Bell className="h-5 w-5" strokeWidth={2} />
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 ring-2 ring-white text-[10px] font-bold text-white shadow-sm">
                                3
                            </span>
                        </Link>
                        <Link href="/messages" className="relative p-2.5 hover:bg-gray-100/80 rounded-full transition-all text-gray-500 hover:text-blue-600" title="Messages">
                            <Mail className="h-5 w-5" strokeWidth={2} />
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 ring-2 ring-white text-[10px] font-bold text-white shadow-sm">
                                5
                            </span>
                        </Link>
                    </div>

                    {/* User Profile */}
                    <Link href="/profile" className="flex items-center gap-3 pl-1 group">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 p-[2px] shadow-md group-hover:shadow-lg transition-all">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                {/* Placeholder for user avatar or initial */}
                                <Image
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                                    alt="User"
                                    width={36}
                                    height={36}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="hidden lg:block text-left">
                            <p className="text-sm font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">Abinash</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Neighbor</p>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}
