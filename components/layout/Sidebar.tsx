"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    Compass,
    Users,
    GraduationCap,
    ShoppingCart,
    Settings,
    Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/useResponsive";
import { useEffect, useState } from "react";

export function Sidebar() {
    const pathname = usePathname() || "/";
    const { layout } = useResponsive();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <aside className="flex-shrink-0 h-full" />;
    }

    const showLabels = layout.sidebar.showLabels;

    const navItems = [
        { icon: LayoutGrid, href: "/home", label: "Feed" },
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
            <nav className={cn("flex-1 flex flex-col gap-2", showLabels ? "px-4" : "px-2")}>
                {navItems.map(item => {
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
                                className="h-5 w-5"
                                strokeWidth={isActive ? 3 : 2}
                            />
                            {showLabels && (
                                <span className={cn(
                                    "text-base font-medium whitespace-nowrap",
                                    isActive ? "font-bold" : "text-gray-700"
                                )}>
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className={cn("flex flex-col gap-4 mt-auto pb-6", showLabels ? "px-4" : "px-3")}>
                <Link
                    href="/notifications"
                    className={cn(
                        "flex items-center gap-3 rounded-xl transition-all group",
                        showLabels ? "px-4 py-3" : "p-3 justify-center",
                        pathname === "/notifications" && "bg-blue-50 border-blue-100 text-blue-700"
                    )}
                >
                    <div className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
                    </div>
                    {showLabels && <span>Notifications</span>}
                </Link>
            </div>
        </aside>
    );
}
