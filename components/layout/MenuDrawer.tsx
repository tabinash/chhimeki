"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    X,
    Settings,
    Bookmark,
    Bell,
    HelpCircle,
    LogOut,
    ChevronRight,
    Users,
    Store,
    UserPlus,
    Shield,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { AvatarWithFallback } from "@/components/shared-component/AvatarWithFallback";

interface MenuDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
    const router = useRouter();
    const { user } = useUser();

    // Menu sections
    const quickActions = [
        {
            icon: Bookmark,
            label: "Saved Items",
            href: "/saved",
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
        {
            icon: Bell,
            label: "Notifications",
            href: "/notifications",
            color: "text-red-500",
            bg: "bg-red-50",
        },
    ];

    const communityItems = [
        {
            icon: Users,
            label: "Groups",
            href: "/groups",
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            icon: Store,
            label: "Business Page",
            href: "/businesses",
            color: "text-green-600",
            bg: "bg-green-50",
        },
        {
            icon: UserPlus,
            label: "Invite Friends",
            href: "/invite",
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
    ];

    const settingsItems = [
        {
            icon: Settings,
            label: "Settings & Privacy",
            href: "/settings",
            color: "text-gray-600",
            bg: "bg-gray-100",
        },
        {
            icon: HelpCircle,
            label: "Help & Support",
            href: "/help",
            color: "text-blue-900",
            bg: "bg-blue-50",
        },
        {
            icon: Shield,
            label: "Privacy Policy",
            href: "/privacy",
            color: "text-gray-600",
            bg: "bg-gray-100",
        },
    ];

    const handleLogout = () => {
        // TODO: Add actual logout logic
        onClose();
        router.push("/login");
    };

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 transition-opacity z-60"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-[280px] bg-white z-70 shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } shadow-[0_-8px_20px_rgba(0,0,0,0.35)]`}
            >
                {/* Menu Header */}
                <div className="p-4 pb-3 bg-[#e4e1dd]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-gray-900">Menu</span>
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 text-gray-600 hover:bg-white/50 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* User Info */}
                    <Link
                        href={`/profile/${user?.id}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-3 -mx-1 rounded-xl bg-white/70 hover:bg-white transition-colors"
                    >
                        <AvatarWithFallback
                            src={user?.profilePicture}
                            name={user?.name}
                            size={52}
                            className="ring-2 ring-white"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 text-[15px] truncate">
                                {user?.name || "Loading..."}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                                {user?.palika}, Ward {user?.wada}
                            </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                </div>

                {/* Scrollable Menu Content */}
                <div className="flex-1 overflow-y-auto pb-20">
                    {/* Quick Actions */}
                    <div className="p-2 pt-3">
                        <p className="px-3 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Quick Actions
                        </p>
                        {quickActions.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={onClose}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-gray-800 text-[15px]">
                                    {item.label}
                                </span>
                                <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                            </Link>
                        ))}
                    </div>

                    {/* Community & Business */}
                    <div className="p-2 pt-1">
                        <p className="px-3 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Community
                        </p>
                        {communityItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={onClose}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-gray-800 text-[15px]">
                                    {item.label}
                                </span>
                                <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                            </Link>
                        ))}
                    </div>

                    {/* Settings & Support */}
                    <div className="p-2 pt-1">
                        <p className="px-3 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Settings
                        </p>
                        {settingsItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={onClose}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-gray-800 text-[15px]">
                                    {item.label}
                                </span>
                                <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Logout Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors text-red-600"
                    >
                        <div className="p-2 rounded-xl bg-red-100">
                            <LogOut className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-[15px]">Log Out</span>
                    </button>
                </div>
            </div>
        </>
    );
}
