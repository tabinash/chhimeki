"use client";
import { Search, SlidersHorizontal, Mail, Bell, ChevronDown, User, Settings, LogOut, HelpCircle, Shield, Store } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/api/useLogout";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=random&color=fff&name=";

export function Header() {
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { user } = useUser();
    const { mutate: logout } = useLogout();

    const avatarUrl = user?.profilePicture || `${DEFAULT_AVATAR}${user?.name || "User"}`;

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

    // Handle search
    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/search');
        }
    };

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
                        <button
                            onClick={handleSearch}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 hover:text-blue-600 transition-colors z-10"
                        >
                            <Search className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                        <input
                            type="text"
                            placeholder="Search neighbors, services, events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            className="w-full h-11 pl-11 pr-12 bg-gray-100/80 border border-transparent rounded-full text-sm font-medium text-gray-700 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white rounded-full transition-all text-gray-400 hover:text-blue-600 hover:shadow-sm"
                        >
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
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {/* Using img tag to handle external fallback URLs easier or if Next Image complications arise, but sticking to next/image if domain allowed.
                                         Fallback to img for safety if domains not configured. */}
                                    <Image
                                        src={avatarUrl}
                                        alt={user?.name || "User"}
                                        width={36}
                                        height={36}
                                        className="object-cover w-full h-full"
                                        unoptimized // Simple fix for external avatar URLs not in config
                                    />
                                </div>
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="text-sm font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
                                    {user?.name || "Loading..."}
                                </p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                                    {user?.userType || "Neighbor"}
                                </p>
                            </div>
                            <ChevronDown
                                className={`w-4 h-4 text-gray-500 transition-transform hidden lg:block ${showDropdown ? "rotate-180" : ""
                                    }`}
                                strokeWidth={2}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                {/* User Info Section */}
                                <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 p-[2px] flex-shrink-0">
                                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                                <Image
                                                    src={avatarUrl}
                                                    alt={user?.name || "User"}
                                                    width={48}
                                                    height={48}
                                                    className="object-cover w-full h-full"
                                                    unoptimized
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user?.email || user?.phone}</p>
                                        </div>
                                    </div>

                                    {user && (
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-blue-100 shadow-sm w-fit">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-xs font-semibold text-gray-700 truncate max-w-[180px]">
                                                {user.palika}, Ward {user.wada}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Menu Items */}
                                <div className="py-2">
                                    <Link
                                        href={`/profile/${user?.id}`}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50/80 transition-colors group mx-2 rounded-xl"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                                            <User className="w-4 h-4 text-gray-600 group-hover:text-blue-600" strokeWidth={2} />
                                        </div>
                                        <span className="font-medium">My Profile</span>
                                    </Link>
                                    <Link
                                        href="/businesses"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50/80 transition-colors group mx-2 rounded-xl"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-purple-100 flex items-center justify-center transition-colors">
                                            <Store className="w-4 h-4 text-gray-600 group-hover:text-blue-600" strokeWidth={2} />
                                        </div>
                                        <span className="font-medium">Business Page</span>
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors group mx-2 rounded-xl"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                                            <Settings className="w-4 h-4 text-gray-600 group-hover:text-gray-800" strokeWidth={2} />
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
                                <div className="border-t border-gray-100 pt-2 pb-1 px-2">
                                    <button
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full group rounded-xl"
                                        onClick={() => {
                                            setShowDropdown(false);
                                            logout();
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
