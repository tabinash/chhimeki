"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    User,
    Shield,
    Bell,
    Globe,
    Lock,
    Eye,
    ChevronRight,
    Smartphone,
    LogOut,
    Key,
    type LucideIcon,
} from "lucide-react";

interface SettingItem {
    icon: LucideIcon;
    label: string;
    href?: string;
    badge?: string;
    value?: string;
    toggle?: boolean;
    onClick?: () => void;
}

interface SettingSection {
    title: string;
    items: SettingItem[];
}
interface SettingItem {
    icon: LucideIcon;
    label: string;
    href?: string;
    badge?: string;
    value?: string;
    toggle?: boolean;
    onClick?: () => void;
}


export default function SettingsPage() {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState("English");

    const sections: SettingSection[] = [
        {
            title: "Account",
            items: [
                { icon: User, label: "Edit Profile", href: "/profile/edit" },
                { icon: Shield, label: "Verification Status", href: "#", badge: "Verified" },
                { icon: Key, label: "Change Password", href: "#" },
            ],
        },
        {
            title: "Preferences",
            items: [
                { icon: Bell, label: "Notifications", href: "#" },
                { icon: Globe, label: "Language", value: language, onClick: () => setLanguage(language === "English" ? "Nepali" : "English") },
                {
                    icon: Smartphone,
                    label: "Dark Mode",
                    toggle: true,
                    value: isDarkMode,
                    onClick: () => setIsDarkMode(!isDarkMode)
                },
            ],
        },
        {
            title: "Security & Visibility",
            items: [
                { icon: Lock, label: "Two-Factor Auth", href: "#", value: "Off" },
                { icon: Eye, label: "Blocked Users", href: "#" },
                { icon: Shield, label: "Login Activity", href: "#" },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                </div>
            </div>

            <div className="py-2 space-y-6">
                {sections.map((section, idx) => (
                    <div key={idx} className="space-y-2">
                        <h2 className="px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                            {section.title}
                        </h2>
                        <div className="bg-white border-y border-gray-100 divide-y divide-gray-50">
                            {section.items.map((item, iIdx) => (
                                <div
                                    key={iIdx}
                                    onClick={() => {
                                        if (item.onClick) {
                                            item.onClick();
                                        } else if (item.href) {
                                            router.push(item.href);
                                        }
                                    }}
                                    className={`flex items-center justify-between p-4 active:bg-gray-50 transition-colors ${item.href || item.onClick ? 'cursor-pointer' : ''}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                                            <item.icon className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-[15px] font-semibold text-gray-900">{item.label}</p>
                                            {item.value && (
                                                <p className="text-xs text-gray-500">{item.value}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {item.badge && (
                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-md uppercase tracking-tight">
                                                {item.badge}
                                            </span>
                                        )}
                                        {item.toggle !== undefined ? (
                                            <div className={`w-10 h-5 rounded-full transition-colors relative ${item.value ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${item.value ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
                                            </div>
                                        ) : (
                                            <ChevronRight className="w-4 h-4 text-gray-300" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Account Actions */}
                <div className="px-4 pt-4 pb-8 space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 p-3 bg-white border border-red-100 text-red-600 font-bold rounded-xl active:bg-red-50 transition-colors">
                        <LogOut className="w-5 h-5" strokeWidth={2.5} />
                        Log Out
                    </button>
                    <button className="w-full py-2 text-xs text-gray-400 font-medium active:underline">
                        Deactivate Account
                    </button>
                </div>
            </div>
        </div>
    );
}