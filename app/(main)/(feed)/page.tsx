"use client";
import {
    Image as ImageIcon,
    Video,
    Calendar,
    MoreHorizontal,
    Heart,
    MessageCircle,
    Share2,
    MapPin,
    Filter,
    AlertTriangle,
    Megaphone,
    Search,
    Info,
    PawPrint,
    Bell
} from "lucide-react";
import Image from "next/image";

// Mock Data for Stories
const stories = [
    { id: 1, user: "You", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", isUser: true },
    { id: 2, user: "Ward 4 Office", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=200&h=300&fit=crop", hasStory: true, isOfficial: true },
    { id: 3, user: "Community Center", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=300&fit=crop", hasStory: true },
    { id: 4, user: "Ramesh K.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop", hasStory: true },
];

type PostType = 'general' | 'alert' | 'notice' | 'lost-found';

const posts = [
    {
        id: 1,
        type: 'alert' as PostType,
        author: {
            name: "Ward 4 Committee",
            avatar: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=100&h=100&fit=crop",
            location: "Baneshwor",
            isOfficial: true
        },
        time: "10m ago",
        title: "⚠️ Water Supply Disruption",
        content: "Due to emergency maintenance in the main pipeline near Shankhamul, water supply will be disrupted for the next 4 hours. Water tanker services have been alerted.",
        images: [],
        stats: { likes: 145, comments: 42, shares: 89 },
        isLiked: false,
        priority: "High"
    },
    {
        id: 2,
        type: 'lost-found' as PostType,
        author: {
            name: "Sita Sharma",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            location: "Koteshwor"
        },
        time: "1h ago",
        title: "LOST DOG: Max",
        content: "Our Golden Retriever 'Max' went missing this morning around 8 AM near the Mahadev Temple. He is wearing a red collar. Please help us find him! 🐕",
        images: ["https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=500&fit=crop"],
        stats: { likes: 212, comments: 35, shares: 120 },
        isLiked: true,
        priority: "Urgent"
    },
    {
        id: 3,
        type: 'general' as PostType,
        author: {
            name: "New Everest MoMo",
            avatar: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop",
            location: "Mid-Baneshwor",
            isBusiness: true
        },
        time: "3h ago",
        content: "Namaste Neighbors! 🙏 We are officially open! Come try our special Jhol MoMo. 20% discount for all Chhimeki members this week!",
        images: ["https://images.unsplash.com/photo-1626015499273-2c0aaca135fc?w=800&h=500&fit=crop"],
        stats: { likes: 56, comments: 12, shares: 5 },
        isLiked: false
    },
    {
        id: 4,
        type: 'notice' as PostType,
        author: {
            name: "Community Club",
            avatar: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop",
            location: "Local Hall",
            isOfficial: true
        },
        time: "5h ago",
        title: "Saturday Clean-up Campaign",
        content: "Join us this Saturday for our monthly neighborhood clean-up. Gathering at the main chowk at 7:00 AM. Gloves and bags provided.",
        images: [],
        stats: { likes: 89, comments: 24, shares: 15 },
        isLiked: true
    }
];

export default function FeedPage() {
    return (
        <div className="w-full max-w-[700px] mx-auto py-8 px-4 space-y-6">

            {/* Vital Alerts Showcase (Stories Style) */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3 px-1">Community Alerts</h2>
                <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
                    {/* Add Alert Story */}
                    <div className="flex-shrink-0 relative w-32 h-52 rounded-xl bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 group">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <AlertTriangle className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 text-center px-2">Report Alert</span>
                    </div>

                    {/* Alert Stories */}
                    {[
                        {
                            id: 1,
                            title: "Water Cut",
                            source: "Ward 4",
                            time: "10m",
                            type: "warning",
                            image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=600&fit=crop",
                            icon: <AlertTriangle className="w-6 h-6 text-white mb-1" />
                        },
                        {
                            id: 2,
                            title: "Road Block",
                            source: "Traffic Police",
                            time: "1h",
                            type: "danger",
                            image: "https://images.unsplash.com/photo-1545459720-aac3e5ca967e?w=400&h=600&fit=crop",
                            icon: <MapPin className="w-6 h-6 text-white mb-1" />
                        },
                        {
                            id: 3,
                            title: "Vaccine Camp",
                            source: "Health Post",
                            time: "2h",
                            type: "info",
                            image: "https://images.unsplash.com/photo-1632635939763-8a35368a4875?w=400&h=600&fit=crop",
                            icon: <Info className="w-6 h-6 text-white mb-1" />
                        },
                        {
                            id: 4,
                            title: "Lost Key",
                            source: "Suman G.",
                            time: "4h",
                            type: "help",
                            image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
                            icon: <PawPrint className="w-6 h-6 text-white mb-1" />
                        },
                    ].map((alert) => (
                        <div key={alert.id} className="flex-shrink-0 relative w-32 h-52 rounded-xl bg-gray-900 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform shadow-sm group">
                            {/* Background Image */}
                            <Image
                                src={alert.image}
                                alt={alert.title}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

                            {/* Content */}
                            <div className="absolute inset-0 p-3 flex flex-col justify-between">
                                {/* Header */}
                                <div className="flex items-center gap-1.5 self-start">
                                    <div className="w-6 h-6 rounded-full border border-white/30 overflow-hidden bg-white/10 backdrop-blur-md flex items-center justify-center">
                                        {alert.icon}
                                    </div>
                                    <span className="text-[10px] font-bold text-white drop-shadow-md truncate max-w-[70px]">{alert.source}</span>
                                </div>

                                {/* Center content */}
                                <div className="flex flex-col items-center justify-center text-center">
                                    <span className="text-sm font-black text-white leading-tight drop-shadow-xl uppercase tracking-wide">{alert.title}</span>
                                </div>

                                {/* Footer */}
                                <div className="text-center">
                                    <span className="text-[10px] font-medium text-white/90 bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm">
                                        {alert.time} ago
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Post Widget - Enhanced */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 relative">
                        <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="You" fill className="object-cover" />
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-full px-4 flex items-center">
                        <input
                            type="text"
                            placeholder="Share an update, alert, or notice..."
                            className="bg-transparent w-full text-sm outline-none text-gray-700 placeholder:text-gray-500"
                        />
                    </div>
                </div>

                {/* Specific Post Types */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                    <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ImageIcon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-medium text-gray-600">General</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <AlertTriangle className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-medium text-gray-600">Alert</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <PawPrint className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-medium text-gray-600">Lost & Found</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Megaphone className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-medium text-gray-600">Notice</span>
                    </button>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>Add Location</span>
                    </button>
                    <button className="bg-black text-white px-6 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                        Post
                    </button>
                </div>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 pb-2">
                <button className="px-4 py-1.5 bg-black text-white text-xs font-bold rounded-full shadow-sm">All</button>
                <button className="px-4 py-1.5 bg-white text-gray-600 border border-gray-200 text-xs font-bold rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">Alerts</button>
                <button className="px-4 py-1.5 bg-white text-gray-600 border border-gray-200 text-xs font-bold rounded-full hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors">Lost & Found</button>
                <button className="px-4 py-1.5 bg-white text-gray-600 border border-gray-200 text-xs font-bold rounded-full hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors">Notices</button>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
                {posts.map(post => {
                    // Determine styles based on post type
                    const isAlert = post.type === 'alert';
                    const isLostFound = post.type === 'lost-found';
                    const isNotice = post.type === 'notice';

                    return (
                        <article key={post.id} className="rounded-2xl p-4 shadow-sm border border-gray-100 bg-white transition-shadow hover:shadow-md">
                            {/* Pre-message Header for Special Posts */}
                            {isAlert && (
                                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-50">
                                    <AlertTriangle className="w-4 h-4 text-red-600 fill-red-100" />
                                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Critical Alert</span>
                                </div>
                            )}
                            {isLostFound && (
                                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-50">
                                    <PawPrint className="w-4 h-4 text-orange-600 fill-orange-100" />
                                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Lost & Found</span>
                                </div>
                            )}
                            {isNotice && (
                                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-50">
                                    <Megaphone className="w-4 h-4 text-green-600 fill-green-100" />
                                    <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Official Notice</span>
                                </div>
                            )}

                            {/* Header */}
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden relative border border-gray-100">
                                        <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <h3 className="font-bold text-gray-900 text-sm">{post.author.name}</h3>
                                            {post.author.isOfficial && <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Official</span>}
                                            {post.author.isBusiness && <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Biz</span>}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <span>{post.time}</span>
                                            <span>•</span>
                                            <div className="flex items-center gap-0.5">
                                                <MapPin className="w-3 h-3" />
                                                <span>{post.author.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Title (if any) */}
                            {post.title && (
                                <h4 className="text-base font-bold mb-2 text-gray-900">
                                    {post.title}
                                </h4>
                            )}

                            {/* Content */}
                            <p className="text-gray-800 text-sm leading-relaxed mb-3 whitespace-pre-line">
                                {post.content}
                            </p>

                            {/* Media */}
                            {post.images.length > 0 && (
                                <div className="rounded-xl overflow-hidden mb-4 relative aspect-video border border-gray-100">
                                    <Image src={post.images[0]} alt="Post image" fill className="object-cover" />
                                </div>
                            )}

                            {/* Stats & Actions */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                <div className="flex gap-6">
                                    <button className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${post.isLiked ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'}`}>
                                        <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                                        <span>{post.stats.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">
                                        <MessageCircle className="w-5 h-5" />
                                        <span>{post.stats.comments}</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">
                                        <Share2 className="w-5 h-5" />
                                        <span>{post.stats.shares}</span>
                                    </button>
                                </div>
                                <div className="text-xs text-gray-400 font-medium">
                                    Seen by {post.stats.shares * 12} neighbors
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
