"use client";
import Image from "next/image";
import {
    Phone,
    MessageCircle,
    MoreHorizontal,
    Briefcase,
    Users,
    ThumbsUp,
    Award,
    MapPin,
    Home
} from "lucide-react";
import { UserProfile } from "@/data/mockProfileData";

interface ProfileRightSidebarProps {
    width: number;
    compact: boolean;
    user: UserProfile;
}

export function ProfileRightSidebar({ width, compact, user }: ProfileRightSidebarProps) {
    if (compact) {
        return (
            <aside
                className="flex-shrink-0 flex flex-col p-4 transition-all duration-300"
                style={{ width: `${width}px` }}
            >
                <div className="bg-white rounded-3xl shadow-sm p-4 h-full">
                    {/* Compact View - Just Avatar & Name */}
                    <div className="text-center">
                        <div className="relative w-16 h-16 mx-auto mb-2">
                            <Image
                                src={user.avatar}
                                alt={user.name}
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                        <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
                        <p className="text-xs text-gray-500 truncate">@{user.username}</p>
                    </div>
                </div>
            </aside>
        );
    }

    return (
        <aside
            className="flex-shrink-0 flex flex-col p-4 transition-all duration-300"
            style={{ width: `${width}px` }}
        >
            <div className="bg-white rounded-3xl shadow-sm p-4 flex flex-col h-full overflow-y-auto">

                {/* Intro Section */}
                <div className="mb-6">
                    <h2 className="font-bold text-xl text-gray-900 mb-4">Intro</h2>

                    {user.bio && (
                        <p className="text-sm text-gray-700 text-center mb-6 leading-relaxed">
                            {user.bio}
                        </p>
                    )}

                    <div className="space-y-4">
                        {/* Works at */}
                        <div className="flex items-center gap-3">
                            <Briefcase className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                                Works at <span className="font-bold text-gray-900">Freelance</span>
                            </span>
                        </div>

                        {/* Lives in */}
                        <div className="flex items-center gap-3">
                            <Home className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                                Lives in <span className="font-bold text-gray-900">{user.tole}, {user.city}</span>
                            </span>
                        </div>

                        {/* From */}
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                                From <span className="font-bold text-gray-900">{user.city}, Nepal</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Section - Clean grid style like Groups */}
                <div className="mb-6">
                    <h2 className="font-semibold text-gray-900 mb-3 text-xl">
                        Community Impact
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors">
                            <span className="text-xl font-bold text-gray-900">{user.stats.posts}</span>
                            <span className="text-xs text-gray-500 mt-1">Posts</span>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors">
                            <span className="text-xl font-bold text-gray-900">{user.stats.neighbors}</span>
                            <span className="text-xs text-gray-500 mt-1">Neighbors</span>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors">
                            <span className="text-xl font-bold text-gray-900">{user.stats.helpfulVotes}</span>
                            <span className="text-xs text-gray-500 mt-1">Helpful</span>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors">
                            <span className="text-xl font-bold text-gray-900">{user.stats.eventsHosted}</span>
                            <span className="text-xs text-gray-500 mt-1">Events</span>
                        </div>
                    </div>
                </div>

                {/* Skills Section - Matches tag style */}
                <div className="mb-6">
                    <h2 className="font-semibold text-gray-900 mb-3 text-xl">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill) => (
                            <div
                                key={skill.name}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-medium transition-colors"
                            >
                                <span>{skill.icon}</span>
                                <span>{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Badges Section */}
                <div className="mb-6">
                    <h2 className="font-semibold text-gray-900 mb-3 text-xl">Badges</h2>
                    <div className="space-y-2">
                        {user.badges.map((badge) => (
                            <div
                                key={badge.name}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium ${badge.color}`}
                            >
                                <span>{badge.icon}</span>
                                <span>{badge.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mutual Neighbors Section - Matches Contact list style */}
                {!user.isOwnProfile && user.mutualNeighbors.length > 0 && (
                    <div className="mb-6 flex-1">
                        <h2 className="font-semibold text-gray-900 mb-3 text-xl">
                            Mutual Friends
                        </h2>
                        <div className="space-y-2">
                            {user.mutualNeighbors.map((neighbor, i) => (
                                <div key={i} className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                        <Image
                                            src={neighbor.avatar}
                                            alt={neighbor.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 truncate">
                                        {neighbor.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Contact Actions (Sticky at bottom if needed, or inline) */}
                {!user.isOwnProfile && (
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold mb-2 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <MessageCircle className="w-4 h-4" />
                            Message
                        </button>
                        <div className="flex gap-2">
                            {user.isVerified && (
                                <button className="flex-1 py-3 bg-gray-50 text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Call
                                </button>
                            )}
                            <button className="px-4 py-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
