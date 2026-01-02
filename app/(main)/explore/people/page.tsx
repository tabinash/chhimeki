"use client";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { peopleYouMayKnow, suggestedUsers } from "@/data/explore";

export default function ExplorePeoplePage() {
    // Combine lists for demo purposes, or just show one
    const allPeople = [...suggestedUsers, ...peopleYouMayKnow];

    return (
        <div className="pb-20 bg-white min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                <Link href="/explore" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </Link>
                <h1 className="text-lg font-bold text-gray-900">Suggested People</h1>
            </div>

            {/* List */}
            <div className="divide-y divide-gray-100">
                {allPeople.map((person: any, index) => (
                    <div
                        key={index}
                        className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                    >
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 relative flex-shrink-0 border border-gray-100">
                            <img
                                src={person.avatar}
                                alt={person.name}
                                className="w-full h-full object-cover"
                            />
                            {person.verified && (
                                <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                                    <CheckCircle2 className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-sm mb-0.5 truncate">
                                {person.name}
                            </h3>
                            <p className="text-xs text-gray-500 truncate">{person.username}</p>

                            {/* Mutual friends preview if available */}
                            {person.mutualFriends && (
                                <div className="flex items-center mt-1.5">
                                    {person.mutualFriends.slice(0, 3).map((avatar: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className="w-4 h-4 rounded-full overflow-hidden border border-white -ml-1.5 first:ml-0"
                                        >
                                            <img
                                                src={avatar}
                                                alt="Mutual"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                    <span className="text-[10px] text-gray-400 ml-1.5">
                                        {person.mutualFriends.length} mutual
                                    </span>
                                </div>
                            )}
                        </div>

                        <button className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-100 whitespace-nowrap">
                            Follow
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
