"use client";

import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const suggestedGroups = [
    { name: "Graphic Design Group", members: "1.2k members", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop" },
    { name: "UI Design Group", members: "3.5k members", image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop" },
    { name: "Book Lovers Group", members: "2.8k members", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop" },
    { name: "3D Design Group", members: "900 members", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop" },
    { name: "Photography Club", members: "2.3k members", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop" },
    { name: "Web Development", members: "4.1k members", image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=300&fit=crop" },
    { name: "Marketing Pros", members: "1.7k members", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop" },
    { name: "Fitness Enthusiasts", members: "3.2k members", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop" },
];

export default function SuggestedGroupsPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredGroups = suggestedGroups.filter(group =>
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
                    <h1 className="text-lg font-bold text-gray-900">Suggested Groups</h1>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" strokeWidth={2} />
                    <input
                        type="text"
                        placeholder="Search suggested groups..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Groups Grid */}
            <div className="px-4 pt-4">
                <div className="grid grid-cols-2 gap-3">
                    {filteredGroups.map((group, index) => (
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

                {filteredGroups.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No groups found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
