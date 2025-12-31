"use client";
import { Search, Plus, Building2, MapPin, CheckCircle2 } from "lucide-react";

const suggestedUsers = [
    {
        name: "Sarah Johnson",
        username: "@sarah.design",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
        followers: "2.5k followers",
        verified: false,
    },
    {
        name: "Michael Chen",
        username: "@mike.dev",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
        followers: "1.8k followers",
        verified: true,
    },
    {
        name: "Emma Wilson",
        username: "@emma.creative",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
        followers: "3.2k followers",
        verified: false,
    },
];

const suggestedInstitutions = [
    {
        name: "City General Hospital",
        type: "Healthcare",
        avatar: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&h=300&fit=crop",
        followers: "12.5k followers",
        verified: true,
        icon: "🏥",
    },
    {
        name: "Metropolitan University",
        type: "Education",
        avatar: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=300&fit=crop",
        followers: "25.3k followers",
        verified: true,
        icon: "🎓",
    },
    {
        name: "Ward Office 5",
        type: "Government Office",
        avatar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=300&fit=crop",
        followers: "5.2k followers",
        verified: true,
        icon: "🏛️",
    },
];

const peopleYouMayKnow = [
    {
        name: "Sarah Johnson",
        username: "@sarah.design",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        followers: "2.5k followers",
        mutualFriends: [
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
        ],
    },
    {
        name: "Michael Chen",
        username: "@mike.dev",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        followers: "1.8k followers",
        mutualFriends: [
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
        ],
    },
    {
        name: "Emma Wilson",
        username: "@emma.creative",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
        followers: "3.2k followers",
        mutualFriends: [
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=100&h=100&fit=crop",
        ],
    },
    {
        name: "James Rodriguez",
        username: "@james.photo",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
        followers: "4.1k followers",
        mutualFriends: [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        ],
    },
];

const nearbyInstitutions = [
    {
        name: "City General Hospital",
        type: "Healthcare",
        location: "2.5 km away",
        avatar: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&h=200&fit=crop",
        followers: "12.5k followers",
        verified: true,
        mutualConnections: [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        ],
    },
    {
        name: "Metropolitan University",
        type: "Education",
        location: "4.1 km away",
        avatar: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop",
        followers: "25.3k followers",
        verified: true,
        mutualConnections: [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
        ],
    },
    {
        name: "Ward Office 5",
        type: "Government Office",
        location: "1.8 km away",
        avatar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop",
        followers: "5.2k followers",
        verified: true,
        mutualConnections: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=100&h=100&fit=crop",
        ],
    },
    {
        name: "Central Municipality",
        type: "Government Office",
        location: "3.2 km away",
        avatar: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=200&h=200&fit=crop",
        followers: "8.9k followers",
        verified: true,
        mutualConnections: [
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
        ],
    },
];

export default function ExplorePage() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
                    <div className="flex items-center gap-3">
                        <button className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors">
                            <Search className="w-4 h-4 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Suggested People Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base font-semibold text-gray-900">Suggested</h2>
                        <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                            See All
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {suggestedUsers.map((user, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {user.verified && (
                                        <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                            <CheckCircle2 className="w-4 h-4 text-white" fill="currentColor" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">
                                        {user.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-3">{user.followers}</p>
                                    <button className="w-full py-2.5 bg-gray-50 text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm border border-gray-100">
                                        Follow
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Suggested Institutions Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base font-semibold text-gray-900">Suggested Institutions</h2>
                        <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                            See All
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {suggestedInstitutions.map((institution, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
                                    <img
                                        src={institution.avatar}
                                        alt={institution.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3 text-3xl drop-shadow-lg">{institution.icon}</div>
                                    {institution.verified && (
                                        <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                            <CheckCircle2 className="w-4 h-4 text-white" fill="currentColor" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">
                                        {institution.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-3">{institution.followers}</p>
                                    <button className="w-full py-2.5 bg-gray-50 text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm border border-gray-100">
                                        Follow
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* People You May Know Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base font-semibold text-gray-900">People You May Know</h2>
                        <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                            See All
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {peopleYouMayKnow.map((person, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl p-5 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50">
                                    <img
                                        src={person.avatar}
                                        alt={person.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
                                        {person.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-1.5">{person.followers}</p>
                                    <div className="flex items-center">
                                        {person.mutualFriends.map((avatar, idx) => (
                                            <div
                                                key={idx}
                                                className="w-6 h-6 rounded-full overflow-hidden border-2 border-white -ml-2 first:ml-0 shadow-sm"
                                            >
                                                <img
                                                    src={avatar}
                                                    alt="Mutual friend"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="px-5 py-2.5 bg-gray-50 text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm flex-shrink-0 border border-gray-100">
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nearby Institutions Section */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base font-semibold text-gray-900">Nearby Institutions</h2>
                        <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                            See All
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {nearbyInstitutions.map((institution, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl p-5 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50 relative">
                                    <img
                                        src={institution.avatar}
                                        alt={institution.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {institution.verified && (
                                        <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                            <CheckCircle2 className="w-3 h-3 text-white" fill="currentColor" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
                                        {institution.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-1.5">{institution.type}</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            {institution.mutualConnections.map((avatar, idx) => (
                                                <div
                                                    key={idx}
                                                    className="w-5 h-5 rounded-full overflow-hidden border-2 border-white -ml-1.5 first:ml-0 shadow-sm"
                                                >
                                                    <img
                                                        src={avatar}
                                                        alt="Connection"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-400">• {institution.location}</span>
                                    </div>
                                </div>
                                <button className="px-5 py-2.5 bg-gray-50 text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm flex-shrink-0 border border-gray-100">
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}