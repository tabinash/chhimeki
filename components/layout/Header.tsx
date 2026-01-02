"use client";
import { Search, SlidersHorizontal, Mail, Bell, ChevronDown, User, Settings, LogOut, HelpCircle, Shield, Store } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

                    {/* User Profile Dropdown */}
                    <div className="relative pl-1" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-3 group"
                        >
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 p-[2px] shadow-md group-hover:shadow-lg transition-all">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
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
                            <ChevronDown
                                className={`w-4 h-4 text-gray-500 transition-transform hidden lg:block ${showDropdown ? "rotate-180" : ""
                                    }`}
                                strokeWidth={2}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50 overflow-hidden">
                                {/* User Info Section */}
                                <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-br from-blue-50 to-purple-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 p-[2px]">
                                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                                                    alt="User"
                                                    width={48}
                                                    height={48}
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-gray-900">Abinash Thapa</p>
                                            <p className="text-xs text-gray-600">@abinash</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-2 px-2 py-1 bg-white rounded-lg w-fit border border-blue-200">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        <span className="text-xs font-semibold text-gray-700">Ward 4, Baneshwor</span>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="py-1">
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors group"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                                            <User className="w-4 h-4 text-gray-600 group-hover:text-blue-600" strokeWidth={2} />
                                        </div>
                                        <span className="font-medium">My Profile</span>
                                    </Link>
                                    <Link
                                        href="/businesses"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 transition-colors group"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-purple-100 flex items-center justify-center transition-colors">
                                            <Store className="w-4 h-4 text-gray-600 group-hover:text-blue-600" strokeWidth={2} />
                                        </div>
                                        <span className="font-medium">Business Page</span>
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors group"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                                            <Settings className="w-4 h-4 text-gray-600 group-hover:text-blue-600" strokeWidth={2} />
                                        </div>
                                        <span className="font-medium">Settings</span>
                                    </Link>
                                    <Link
                                        href="/privacy"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors group"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                                            <Shield className="w-4 h-4 text-gray-600 group-hover:text-blue-600" strokeWidth={2} />
                                        </div>
                                        <span className="font-medium">Privacy & Safety</span>
                                    </Link>
                                    <Link
                                        href="/help"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors group"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                                            <HelpCircle className="w-4 h-4 text-gray-600 group-hover:text-blue-600" strokeWidth={2} />
                                        </div>
                                        <span className="font-medium">Help & Support</span>
                                    </Link>
                                </div>

                                {/* Logout */}
                                <div className="border-t border-gray-100 py-1 mt-1">
                                    <button
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full group"
                                        onClick={() => {
                                            setShowDropdown(false);
                                            // Add logout logic here
                                        }}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                                            <LogOut className="w-4 h-4 text-red-600" strokeWidth={2} />
                                        </div>
                                        <span className="font-medium">Log Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
