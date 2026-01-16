"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, ShoppingBag, Briefcase, Plus, UserRound, X, PenSquare, CalendarPlus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [showCreateMenu, setShowCreateMenu] = useState(false);

    const leftNavItems = [
        { icon: Home, href: "/home?header=true", label: "Home" },
        { icon: UserRound, href: "/groups", label: "Groups" },
    ];

    const rightNavItems = [
        { icon: ShoppingBag, href: "/marketplace", label: "Market" },
        { icon: MoreHorizontal, href: "/menu", label: "More" },
    ];

    // Close menu when route changes
    useEffect(() => {
        setShowCreateMenu(false);
    }, [pathname]);

    // Close menu when clicking outside
    useEffect(() => {
        if (showCreateMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showCreateMenu]);

    const handleCreateOption = (type: "post" | "event") => {
        setShowCreateMenu(false);
        if (type === "post") {
            router.push("/post/create?bottomNav=false");
        } else {
            router.push("/events/create?bottomNav=false");
        }
    };

    const NavItem = ({
        item,
    }: {
        item: { icon: any; href: string; label: string };
    }) => {
        const basePath = item.href.split("?")[0];
        const isActive =
            pathname === basePath || pathname.startsWith(basePath);

        return (
            <Link
                href={item.href}
                className={cn(
                    "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all active:scale-110",
                    isActive ? "text-gray-900" : "text-gray-500"
                )}
            >
                <item.icon
                    className="h-6 w-6"
                    strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span
                    className={cn(
                        "text-[12px] leading-none",
                        isActive ? "font-bold" : "font-medium"
                    )}
                >
                    {item.label}
                </span>
            </Link>
        );
    };

    return (
        <>
            {/* Create Menu Overlay */}
            {showCreateMenu && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={() => setShowCreateMenu(false)}
                />
            )}

            {/* Create Menu Popup */}
            <div
                className={`fixed bottom-34 left-1/2 -translate-x-1/2 z-90 transition-all duration-300 ${showCreateMenu
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                    }`}
            >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex">
                    <button
                        onClick={() => handleCreateOption("post")}
                        className="flex flex-col items-center gap-2 px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                            <PenSquare className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="font-bold text-[14px] text-gray-900">Post</span>
                    </button>
                    <div className="w-px bg-gray-100" />
                    <button
                        onClick={() => handleCreateOption("event")}
                        className="flex flex-col items-center gap-2 px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                            <CalendarPlus className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="font-bold text-[14px] text-gray-900">Event</span>
                    </button>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-50 pt-2">
                {/* SVG Surface with TRUE U-CUT */}
                <div className="absolute inset-0 max-w-md mx-auto pointer-events-none">
                    <svg
                        className="w-full h-[90px]"
                        viewBox="0 18 400 90"
                        preserveAspectRatio="none"
                    >
                        {/* Main Surface */}
                        <path
                            d="
                                M0,26
                                L138,26
                                C155,26 165,26 175,42
                                C185,62 215,62 225,42
                                C235,26 245,26 262,26
                                L400,26
                                L400,90
                                L0,90
                                Z
                            "
                            fill="#e4e1ddff"
                        />

                        {/* Inner shadow inside cut */}

                    </svg>
                </div>

                {/* Nav Content */}
                <div
                    className="
                        relative flex items-center justify-between
                        h-16 max-w-md mx-auto px-2 pt-2
                        rounded-t-2xl

                    "
                >
                    {/* Left */}
                    <div className="flex items-center flex-1 h-full gap-2">
                        {leftNavItems.map((item) => (
                            <NavItem key={item.href} item={item} />
                        ))}
                    </div>

                    {/* Center FAB */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-9">
                        <button
                            onClick={() => setShowCreateMenu(!showCreateMenu)}
                            className={`
                                flex items-center justify-center
                                w-15 h-15
                                rounded-full
                                shadow-2xl shadow-black/50
                                active:scale-110 transition-all duration-300
                                ${showCreateMenu ? "bg-red-500 rotate-45" : "bg-blue-900"}
                            `}
                        >
                            {showCreateMenu ? (
                                <X className="w-7 h-7 text-white" strokeWidth={2.5} />
                            ) : (
                                <Plus className="w-7 h-7 text-white" strokeWidth={2.5} />
                            )}
                        </button>
                    </div>

                    {/* Spacer for FAB */}
                    <div className="w-20" />

                    {/* Right */}
                    <div className="flex items-center flex-1 h-full gap-2">
                        {rightNavItems.map((item) => (
                            <NavItem key={item.href} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

