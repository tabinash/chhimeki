"use client";

import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    {
        name: "Photography Club",
        members: "2.4k members",
        image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=200&h=200&fit=crop",
        memberAvatars: [
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
        ],
    },
];

export default function FriendsGroupsPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredGroups = friendsGroups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center gap-3 mb-3">
                    <button
                        onClick={() => router.back()}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">Your Friends' Groups</h1>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" strokeWidth={2} />
                    <input
                        type="text"
                        placeholder="Search friends' groups..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Groups List */}
            <div className="px-4 pt-4">
                <div className="space-y-3">
                    {filteredGroups.map((group, index) => (
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

                {filteredGroups.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No groups found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
