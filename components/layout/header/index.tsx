"use client";
import { Search, Bell, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/api/useLogout";
import Logo from "@/app/_components/Logo";
import ProfileDropdown from "./ProfileDropdown";
import MessageDropdown from "./MessageDropdown";
import NotificationDropdown from "./NotificationDropdown";
import { useUnreadCount } from "@/hooks/api/useUnreadCount";


export function Header() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const { mutate: logout } = useLogout();
    const { data } = useUnreadCount();
    const unreadCount = data?.data ?? 0;

    // unreadcount.data 

    // Handle search
    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/search');
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white ">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
                {/* Logo */}
                <Link href="/home" className="flex-shrink-0 mr-4">
                    <Logo variant="dark" size="md" />
                </Link>

                {/* Center Search Bar */}
                <div className="flex-1 max-w-md mx-auto hidden md:block px-4">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for neighbors, services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            className="block w-full pl-12 pr-4 py-2 border border-gray-400 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-600 sm:text-sm transition-all"
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Notifications & Messages */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <NotificationDropdown /> {/* Replaced Link with NotificationDropdown */}

                        {/* Message Dropdown */}
                        <div className="relative">
                            <MessageDropdown />


                            <span
                                className="absolute -top-1 -right-1
                       min-w-[18px] h-[18px]
                       px-1
                       flex items-center justify-center
                       rounded-full
                       bg-red-500 text-white
                       text-[11px] font-bold
                       leading-none
                       shadow"
                            >
                                {unreadCount > 99 ? "99+" : unreadCount}
                            </span>
                        </div>

                    </div>

                    {/* User Profile Dropdown */}
                    <ProfileDropdown logout={logout} />
                </div>
            </div>
        </header>
    );
}
