"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Compass, GraduationCap, ShoppingCart, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { icon: LayoutGrid, href: "/home?header=true", label: "Feed" },
        { icon: Compass, href: "/explore", label: "Explore" },
        { icon: ShoppingCart, href: "/marketplace", label: "Market" },
        { icon: GraduationCap, href: "/jobs", label: "Jobs" },
    ];

    const isMenuActive = pathname === "/menu";

    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 px-2 pb-safe z-50">
            <div className="flex items-center justify-between h-full max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors relative",
                                isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            <div className={cn(
                                "relative p-1.5 rounded-xl transition-all",
                                isActive && "bg-gray-100"
                            )}>
                                <item.icon
                                    className={cn("h-6 w-6")}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </div>
                            <span className={cn(
                                "text-[10px] leading-none",
                                isActive ? "font-bold" : "font-medium"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}

                {/* Menu Item */}
                <Link
                    href="/menu"
                    className={cn(
                        "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors relative",
                        isMenuActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                    )}
                >
                    <div className={cn(
                        "relative p-1.5 rounded-xl transition-all",
                        isMenuActive && "bg-gray-100"
                    )}>
                        <Menu className="h-6 w-6" strokeWidth={isMenuActive ? 2.5 : 2} />
                    </div>
                    <span className={cn(
                        "text-[10px] leading-none",
                        isMenuActive ? "font-bold" : "font-medium"
                    )}>
                        Menu
                    </span>
                </Link>
            </div>
        </div>
    );
}
