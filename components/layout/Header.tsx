"use client";
import { Search, SlidersHorizontal, Mail, Bell, ChevronDown, User, Settings, LogOut, HelpCircle, Shield, Store } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}&header=false`);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-white/95 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-md mx-auto">
                {/* Top Row: Avatar - Title - Bell */}
                <div className="flex items-center justify-between px-4 pt-3 pb-4">
                    {/* Left: User Avatar */}
                    <Link href="/profile" className="relative group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                                    alt="User"
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </Link>

                    {/* Center: Title & Subtitle */}
                    <div className="text-center">
                        <h1 className="text-xl font-bold text-blue-600 tracking-tight">Chhimeki</h1>
                        <p className="text-[10px] font-medium text-gray-500 flex items-center justify-center gap-1">
                            Ward 4 • Baneshwor
                        </p>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                        {/* Messages */}
                        <Link href="/messages" className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                            <Mail className="w-6 h-6" strokeWidth={2} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
                        </Link>

                        {/* Notifications */}
                        <Link href="/notifications" className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                            <Bell className="w-6 h-6" strokeWidth={2} />
                            <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                        </Link>
                    </div>
                </div>

                {/* Bottom Row: Search Bar */}
                <div className="px-4 pb-3">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Looking for something?"
                            className="w-full h-12 pl-12 pr-12 bg-gray-100 rounded-full text-sm font-medium text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-gray-900 transition-colors">
                            <SlidersHorizontal className="h-5 w-5" strokeWidth={2} />
                        </button>
                    </form>
                </div>
            </div>
        </header>
    );
}
