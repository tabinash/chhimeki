"use client";

import { ChevronDown, Store, User, Settings, Shield, HelpCircle, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@/hooks/useUser";

interface ProfileDropdownProps {
    logout: () => void;
}

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=random&color=fff&name=";

export default function ProfileDropdown({ logout }: ProfileDropdownProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user } = useUser();

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

    return (
        <div className="relative ml-1" ref={dropdownRef}>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="focus:outline-none group block"
            >
                <div className="relative">
                    {/* Avatar Container */}
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-transparent group-hover:border-gray-300 transition-all">
                        <Image
                            src={avatarUrl}
                            alt={user?.name || "User"}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                            unoptimized
                        />
                    </div>
                    {/* Chevron Badge */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center border border-white shadow-sm z-10 group-hover:bg-gray-200 transition-colors">
                        <ChevronDown
                            className={`w-3 h-3 text-gray-900 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""
                                }`}
                            strokeWidth={3}
                        />
                    </div>
                </div>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
                <div className="absolute right-0 mt-3 w-[280px] bg-white rounded-2xl shadow-xl ring-1 ring-black/5 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info Card */}
                    <div className="px-5 py-4 border-b border-gray-100">
                        <div className="flex flex-col gap-1">
                            <p className="text-base font-bold text-gray-900 truncate leading-tight">
                                {user?.name}
                            </p>
                            <p className="text-sm font-medium text-gray-500 truncate">
                                {user?.email || user?.phone}
                            </p>

                            {user && (
                                <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold w-fit">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                    {user.palika}, Ward {user.wada}
                                </div>
                            )}
                        </div>
                        <Link
                            href={`/profile/${user?.id}`}
                            className="mt-3 block w-full text-center py-2 text-sm font-semibold text-blue-600 bg-blue-50/50 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={() => setShowDropdown(false)}
                        >
                            View Profile
                        </Link>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2 px-2 space-y-0.5">
                        <Link
                            href="/businesses"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100/80 rounded-xl transition-colors group"
                            onClick={() => setShowDropdown(false)}
                        >
                            <div className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-white border border-transparent group-hover:border-gray-200 flex items-center justify-center transition-all">
                                <Store
                                    className="w-5 h-5 text-gray-500 group-hover:text-blue-600"
                                    strokeWidth={1.5}
                                />
                            </div>
                            <span>Business Page</span>
                        </Link>
                        <Link
                            href="/settings"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100/80 rounded-xl transition-colors group"
                            onClick={() => setShowDropdown(false)}
                        >
                            <div className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-white border border-transparent group-hover:border-gray-200 flex items-center justify-center transition-all">
                                <Settings
                                    className="w-5 h-5 text-gray-500 group-hover:text-gray-900"
                                    strokeWidth={1.5}
                                />
                            </div>
                            <span>Settings</span>
                        </Link>
                        <Link
                            href="/privacy"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100/80 rounded-xl transition-colors group"
                            onClick={() => setShowDropdown(false)}
                        >
                            <div className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-white border border-transparent group-hover:border-gray-200 flex items-center justify-center transition-all">
                                <Shield
                                    className="w-5 h-5 text-gray-500 group-hover:text-blue-600"
                                    strokeWidth={1.5}
                                />
                            </div>
                            <span>Privacy & Safety</span>
                        </Link>
                        <Link
                            href="/help"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100/80 rounded-xl transition-colors group"
                            onClick={() => setShowDropdown(false)}
                        >
                            <div className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-white border border-transparent group-hover:border-gray-200 flex items-center justify-center transition-all">
                                <HelpCircle
                                    className="w-5 h-5 text-gray-500 group-hover:text-blue-600"
                                    strokeWidth={1.5}
                                />
                            </div>
                            <span>Help & Support</span>
                        </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 mt-1 pt-2 px-2 pb-2">
                        <button
                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full text-left group"
                            onClick={() => {
                                setShowDropdown(false);
                                logout();
                            }}
                        >
                            <div className="w-9 h-9 rounded-full bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                                <LogOut className="w-5 h-5 text-red-600" strokeWidth={1.5} />
                            </div>
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
