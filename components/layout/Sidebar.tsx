"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    Compass,
    Calendar,
    Users,
    GraduationCap,
    ShoppingCart,
    Settings,
    Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/useResponsive";

export function Sidebar() {
    const pathname = usePathname() || "/";
    const { layout } = useResponsive();
    const showLabels = layout.sidebar.showLabels;

    const navItems = [
        { icon: LayoutGrid, href: "/", label: "Feed" },
        { icon: Users, href: "/groups", label: "Groups" },
        { icon: Compass, href: "/explore", label: "Explore" },
        { icon: Calendar, href: "/events", label: "Events" },
        { icon: GraduationCap, href: "/jobs", label: "Jobs" },
        { icon: ShoppingCart, href: "/marketplace", label: "Marketplace" },
        { icon: Settings, href: "/settings", label: "Settings" },
    ];

    return (
        <aside
            className="flex-shrink-0 flex flex-col py-6 h-full transition-all duration-300"
            style={{ width: `${layout.sidebar.width}px` }}
        >
            {/* Navigation Icons */}
            <nav className={cn("flex-1 flex flex-col gap-2", showLabels ? "px-4" : "px-2")}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-2xl transition-all",
                                showLabels ? "px-4 py-3" : "px-3 py-3 justify-center",
                                isActive && "text-bold bg-[#ffffff]"
                            )}
                            title={!showLabels ? item.label : undefined}
                        >
                            <item.icon
                                className="h-5 w-5 flex-shrink-0"
                                strokeWidth={isActive ? 3 : 2}
                            />
                            {showLabels && (
                                <span className={cn(
                                    "text-base font-medium whitespace-nowrap", // increased from text-sm to text-base
                                    isActive ? "font-bold" : "text-gray-700"
                                )}>
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className={cn("flex flex-col gap-4 mt-2", showLabels ? "px-4" : "px-2")}>
                {/* Notifications */}
                <button className={cn(
                    "flex items-center gap-3 rounded-xl bg-white shadow-sm text-gray-400 hover:text-gray-600 transition-all",
                    showLabels ? "px-4 py-3" : "px-3 py-3 justify-center"
                )}>
                    <Bell className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                    {showLabels && (
                        <span className="text-base font-medium text-gray-700 whitespace-nowrap">
                            Notifications
                        </span>
                    )}
                </button>
            </div>
        </aside>
    );
}
