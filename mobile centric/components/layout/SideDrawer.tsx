"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Settings, HelpCircle, Shield, LogOut, FileText, Users, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
    const drawerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            // Prevent scrolling on body when drawer is open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 backdrop-blur-sm",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className={cn(
                    "fixed top-0 right-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-bold text-lg text-gray-900">Menu</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto py-2">
                    <div className="px-4 py-2">
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Community</div>
                        <nav className="space-y-1">
                            <Link href="/groups" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                                <Users className="w-5 h-5 text-blue-500" />
                                <span className="font-medium">Groups</span>
                            </Link>
                            <Link href="/saved" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                                <Bookmark className="w-5 h-5 text-orange-500" />
                                <span className="font-medium">Saved Items</span>
                            </Link>
                        </nav>
                    </div>

                    <div className="my-2 border-t border-gray-100" />

                    <div className="px-4 py-2">
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Settings & Support</div>
                        <nav className="space-y-1">
                            <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                                <Settings className="w-5 h-5 text-gray-500" />
                                <span className="font-medium">Settings</span>
                            </Link>
                            <Link href="/privacy" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                                <Shield className="w-5 h-5 text-gray-500" />
                                <span className="font-medium">Privacy & Safety</span>
                            </Link>
                            <Link href="/terms" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                                <FileText className="w-5 h-5 text-gray-500" />
                                <span className="font-medium">Terms of Service</span>
                            </Link>
                            <Link href="/help" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                                <HelpCircle className="w-5 h-5 text-gray-500" />
                                <span className="font-medium">Help & Support</span>
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100">
                    <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Log Out</span>
                    </button>
                    <p className="text-center text-[10px] text-gray-400 mt-4">
                        Version 1.0.0
                    </p>
                </div>
            </div>
        </>
    );
}
