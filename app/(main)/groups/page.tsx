"use client";
import { Search, Plus } from "lucide-react";

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

export default function DiscoverGroups() {
    return (
        <div className="min-h-screen  p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Discover Groups</h1>
                    <div className="flex items-center gap-3">
                        <button className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors">
                            <Search className="w-4 h-4 text-gray-700" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium">
                            <Plus className="w-4 h-4" />
                            Create group
                        </button>
                    </div>
                </div>

                {/* Suggested Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base font-semibold text-gray-900">Suggested</h2>
                        <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                            See All
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {suggestedGroups.map((group, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl overflow-hidden"
                            >
                                <div className="aspect-[4/3] overflow-hidden bg-white">
                                    <img
                                        src={group.image}
                                        alt={group.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">
                                        {group.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-3">{group.members}</p>
                                    <button className="w-full py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm border border-gray-200">
                                        Join Group
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Your Friends Group Section */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base font-semibold text-gray-900">Your Friends Group</h2>
                        <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                            See All
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {friendsGroups.map((group, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3"
                            >
                                <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-white">
                                    <img
                                        src={group.image}
                                        alt={group.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
                                        {group.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-1.5">{group.members}</p>
                                    <div className="flex items-center">
                                        {group.memberAvatars.map((avatar, idx) => (
                                            <div
                                                key={idx}
                                                className="w-6 h-6 rounded-full overflow-hidden border-2 border-gray-50 -ml-2 first:ml-0"
                                            >
                                                <img
                                                    src={avatar}
                                                    alt="Member"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm flex-shrink-0 border border-gray-200">
                                    Join Group
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}