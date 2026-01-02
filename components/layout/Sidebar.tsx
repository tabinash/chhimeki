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
                                isActive
                                    ? "bg-white border border-gray-200 shadow-sm"
                                    : "border border-transparent hover:bg-gray-50 hover:border-gray-200"
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
            <div className={cn("flex flex-col gap-4 mt-auto pb-6", showLabels ? "px-4" : "px-3")}>
                {/* Notifications */}
                <Link
                    href="/notifications"
                    className={cn(
                        "flex items-center gap-3 rounded-xl transition-all duration-200 group border border-transparent hover:border-gray-200 hover:bg-gray-50",
                        showLabels ? "px-4 py-3" : "p-3 justify-center",
                        pathname === "/notifications" && "bg-blue-50 border-blue-100 text-blue-700"
                    )}>
                    <div className="relative">
                        <Bell className={cn("h-5 w-5 transition-colors", pathname === "/notifications" ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700")} strokeWidth={2} />
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
                    </div>
                    {showLabels && (
                        <span className={cn("text-sm font-semibold whitespace-nowrap", pathname === "/notifications" ? "text-blue-700" : "text-gray-600 group-hover:text-gray-900")}>
                            Notifications
                        </span>
                    )}
                </Link>
            </div>
        </aside>
    );
}
