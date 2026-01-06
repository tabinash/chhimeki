"use client";

import { useState } from "react";
import { Search, Plus, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = ["All", "Business", "Tech", "Sports", "Arts", "Education"];

const suggestedGroups = [
    {
        name: "Graphic Design Group",
        members: "1.2k members",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    },
    {
        name: "UI Design Group",
        members: "3.5k members",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop",
    },
    {
        name: "Book Lovers Group",
        members: "2.8k members",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
    },
    {
        name: "3D Design Group",
        members: "900 members",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
    },
];

const friendsGroups = [
    {
        name: "Graphic Design Group",
        members: "1.8k members",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop",
        memberAvatars: [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        ],
    },
    {
        name: "UI Design Group",
        members: "2.1k members",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=200&h=200&fit=crop",
        memberAvatars: [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
        ],
    },
    {
        name: "Book Lovers Group",
        members: "1.5k members",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=200&fit=crop",
        memberAvatars: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=100&h=100&fit=crop",
        ],
    },
    {
        name: "3D Design Group",
        members: "900 members",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop",
        memberAvatars: [
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
        ],
    },
];

export default function GroupsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
                    <Link
                        href="/groups/create"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-semibold"
                    >
                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                        Create
                    </Link>
                </div>

                {/* Search */}
                <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" strokeWidth={2} />
                    <input
                        type="text"
                        placeholder="Search groups..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                    />
                </div>

                {/* Category Pills */}
                <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition-colors ${activeCategory === category
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-4 pt-4 space-y-6">
                {/* Suggested Groups */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base font-bold text-gray-900">Suggested for You</h2>
                        <Link href="/groups/suggested" className="text-sm text-blue-600 font-semibold">
                            See All
                        </Link>
                    </div>

                    {/* 2-column grid for mobile */}
                    <div className="grid grid-cols-2 gap-3">
                        {suggestedGroups.map((group, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden border border-gray-200">
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <Image
                                        src={group.image}
                                        alt={group.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5 line-clamp-1">
                                        {group.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-2">{group.members}</p>
                                    <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-xs">
                                        Join Group
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Your Friends' Groups */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base font-bold text-gray-900">Your Friends' Groups</h2>
                        <Link href="/groups/friends" className="text-sm text-blue-600 font-semibold">
                            See All
                        </Link>
                    </div>

                    {/* Single column list for mobile */}
                    <div className="space-y-3">
                        {friendsGroups.map((group, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-200"
                            >
                                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative">
                                    <Image
                                        src={group.image}
                                        alt={group.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm truncate">
                                        {group.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-1.5">{group.members}</p>
                                    <div className="flex items-center">
                                        {group.memberAvatars.map((avatar, idx) => (
                                            <div
                                                key={idx}
                                                className="w-6 h-6 rounded-full overflow-hidden border-2 border-white -ml-2 first:ml-0 relative"
                                            >
                                                <Image
                                                    src={avatar}
                                                    alt="Member"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                        <span className="text-xs text-gray-500 ml-2">+2 friends</span>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-xs flex-shrink-0">
                                    Join
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trending Groups */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base font-bold text-gray-900">Trending Groups</h2>
                    </div>
                    <div className="space-y-2">
                        {["UI/UX Designers", "Local Business", "Photography"].map((group, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                                    <Users className="h-5 w-5 text-white" strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">{group}</p>
                                    <p className="text-xs text-gray-500">{Math.floor(Math.random() * 5000)} members</p>
                                </div>
                                <button className="text-xs font-semibold text-blue-600">View</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}