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
    Wrench,
} from "lucide-react";
import { Briefcase, ShoppingBag } from "lucide-react";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/api/useLogout";
import { AvatarWithFallback } from "@/components/shared-component/AvatarWithFallback";

export default function MenuPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const router = useRouter();
    const { user } = useUser();
    const { mutate: logout } = useLogout();
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Profile Header */}
            <div className="bg-white px-4 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                    <AvatarWithFallback
                        src={user?.profilePicture}
                        name={user?.name}
                        size={64}
                    />
                    <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-gray-900 text-lg truncate">{user?.name || "Loading..."}</h2>
                        <p className="text-sm text-gray-500">
                            {user ? `Ward ${user.wada}, ${user.palika}` : "Loading..."}
                        </p>
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
                        href={`/profile/${user?.id}`}
                        className="flex-1 text-center py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-700 transition-colors"
                    >
                        View Profile
                    </Link>
                </div>
            </div>

            {/* Menu Items - List Style */}
            <div className="mt-2">
                {/* Community & Business */}
                <div className="bg-white border-b border-gray-100 mt-2">

                    <MenuLink href="/services" icon={Wrench} label="Local Services" iconBg="bg-amber-100" iconColor="text-amber-600" />
                    <div className="border-t border-gray-100" />

                    <MenuLink href="/storefront" icon={Store} label="Pasal" iconBg="bg-purple-100" iconColor="text-purple-600" />
                    <div className="border-t border-gray-100" />

                    <MenuLink href="/storefront/" icon={Store} label="My Pasal" iconBg="bg-pink-100" iconColor="text-pink-600" />
                    <div className="border-t border-gray-100" />

                    <MenuLink href="/jobs" icon={Briefcase} label="Jobs" iconBg="bg-indigo-100" iconColor="text-indigo-600" />
                    <div className="border-t border-gray-100" />

                    <MenuLink href="/invite" icon={UserPlus} label="Invite Friends" iconBg="bg-green-100" iconColor="text-green-600" />
                </div>

                {/* Settings & Preferences */}
                <div className="bg-white border-b border-gray-100 mt-2">
                    <MenuLink href="/settings" icon={Settings} label="Settings & Privacy" iconBg="bg-gray-200" iconColor="text-gray-600" />
                    <div className="border-t border-gray-100" />

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? "bg-indigo-100" : "bg-yellow-100"}`}>
                                {isDarkMode ? (
                                    <Moon className="w-5 h-5 text-indigo-600" strokeWidth={2} />
                                ) : (
                                    <Sun className="w-5 h-5 text-yellow-600" strokeWidth={2} />
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
                    <MenuLink href="/help" icon={HelpCircle} label="Help & Support" iconBg="bg-teal-100" iconColor="text-teal-600" />
                    <div className="border-t border-gray-100" />
                    <MenuLink href="/privacy" icon={Shield} label="Privacy Policy" iconBg="bg-cyan-100" iconColor="text-cyan-600" />
                    <div className="border-t border-gray-100" />
                    <MenuLink href="/terms" icon={FileText} label="Terms of Service" iconBg="bg-sky-100" iconColor="text-sky-600" />
                </div>

                {/* Logout */}
                <div className="px-4 mt-6">
                    <button
                        className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 active:bg-red-100 transition-colors"
                        onClick={() => logout()}
                    >
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

function MenuLink({
    href,
    icon: Icon,
    label,
    iconBg = "bg-gray-100",
    iconColor = "text-gray-600"
}: {
    href: string;
    icon: any;
    label: string;
    iconBg?: string;
    iconColor?: string;
}) {
    return (
        <Link
            href={href}
            className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={2} />
                </div>
                <span className="font-medium text-gray-700">{label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
        </Link>
    );
}
