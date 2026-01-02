"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Settings,
    HelpCircle,
    Shield,
    LogOut,
    FileText,
    Users,
    Store,
    ChevronRight,
    Moon,
    Sun,
    UserPlus,
    Bookmark,
    Bell,
} from "lucide-react";

export default function MenuPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Profile Header */}
            <div className="bg-white px-4 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0">
                        <Image
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                            alt="Profile"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-gray-900 text-lg truncate">Abinash Thapa</h2>
                        <p className="text-sm text-gray-500">Ward 4, Baneshwor</p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">156</p>
                        <p className="text-xs text-gray-500">Posts</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">342</p>
                        <p className="text-xs text-gray-500">Neighbors</p>
                    </div>
                    <Link
                        href="/profile"
                        className="flex-1 text-center py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-700 transition-colors"
                    >
                        View Profile
                    </Link>
                </div>
            </div>

            {/* Menu Items - List Style */}
            <div className="mt-2">
                {/* Saved & Notifications */}
                <div className="bg-white border-y border-gray-100">
                    <MenuLink href="/saved" icon={Bookmark} label="Saved Items" />
                    <div className="border-t border-gray-100" />
                    <MenuLink href="/notifications" icon={Bell} label="Notifications" />
                </div>

                {/* Community & Business */}
                <div className="bg-white border-b border-gray-100 mt-2">
                    <MenuLink href="/groups" icon={Users} label="Groups" />
                    <div className="border-t border-gray-100" />
                    <MenuLink href="/businesses" icon={Store} label="Business Page" />
                    <div className="border-t border-gray-100" />
                    <MenuLink href="/invite" icon={UserPlus} label="Invite Friends" />
                </div>

                {/* Settings & Preferences */}
                <div className="bg-white border-b border-gray-100 mt-2">
                    <MenuLink href="/settings" icon={Settings} label="Settings & Privacy" />
                    <div className="border-t border-gray-100" />

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 text-gray-600">
                                {isDarkMode ? (
                                    <Moon className="w-6 h-6" strokeWidth={2} />
                                ) : (
                                    <Sun className="w-6 h-6" strokeWidth={2} />
                                )}
                            </div>
                            <span className="font-medium text-gray-700">
                                {isDarkMode ? "Dark Mode" : "Light Mode"}
                            </span>
                        </div>
                        <div
                            className={`w-12 h-6 rounded-full transition-colors ${isDarkMode ? "bg-blue-600" : "bg-gray-300"
                                } relative`}
                        >
                            <div
                                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${isDarkMode ? "translate-x-6" : "translate-x-0.5"
                                    }`}
                            />
                        </div>
                    </button>
                </div>

                {/* Help & Legal */}
                <div className="bg-white border-b border-gray-100 mt-2">
                    <MenuLink href="/help" icon={HelpCircle} label="Help & Support" />
                    <div className="border-t border-gray-100" />
                    <MenuLink href="/privacy" icon={Shield} label="Privacy Policy" />
                    <div className="border-t border-gray-100" />
                    <MenuLink href="/terms" icon={FileText} label="Terms of Service" />
                </div>

                {/* Logout */}
                <div className="px-4 mt-6">
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 active:bg-red-100 transition-colors">
                        <LogOut className="w-5 h-5" strokeWidth={2} />
                        Log Out
                    </button>
                </div>

                {/* Version */}
                <p className="text-center text-xs text-gray-400 mt-6 mb-2">
                    Chhimeki v1.0.0
                </p>
            </div>
        </div>
    );
}

function MenuLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
            <div className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-gray-600" strokeWidth={2} />
                <span className="font-medium text-gray-700">{label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
        </Link>
    );
}
