"use client"; // Client component due to useSearchParams interactions

import { AlertTriangle, PawPrint, Megaphone, MapPin, MoreHorizontal, Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { posts } from "@/data/mockFeedData";

export default function FeedList() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeFilter = searchParams.get('filter') || 'all';

    const handleFilterChange = (filter: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (filter === 'all') {
            params.delete('filter');
        } else {
            params.set('filter', filter);
        }
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    const filteredPosts = activeFilter === 'all'
        ? posts
        : posts.filter(post => {
            if (activeFilter === 'alerts') return post.type === 'alert';
            if (activeFilter === 'lost-found') return post.type === 'lost-found';
            if (activeFilter === 'notices') return post.type === 'notice';
            return true;
        });

    return (
        <div>
            {/* Filter Pills */}
            <div className="flex gap-2 pb-4 overflow-x-auto hide-scrollbar">
                <button
                    onClick={() => handleFilterChange('all')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-full shadow-sm whitespace-nowrap transition-colors ${activeFilter === 'all' ? 'bg-black text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                >
                    All
                </button>
                <button
                    onClick={() => handleFilterChange('alerts')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-full shadow-sm whitespace-nowrap transition-colors ${activeFilter === 'alerts' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'}`}
                >
                    Alerts
                </button>
                <button
                    onClick={() => handleFilterChange('lost-found')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-full shadow-sm whitespace-nowrap transition-colors ${activeFilter === 'lost-found' ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-gray-600 border border-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200'}`}
                >
                    Lost & Found
                </button>
                <button
                    onClick={() => handleFilterChange('notices')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-full shadow-sm whitespace-nowrap transition-colors ${activeFilter === 'notices' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border border-gray-200 hover:bg-green-50 hover:text-green-600 hover:border-green-200'}`}
                >
                    Notices
                </button>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
                {filteredPosts.map(post => {
                    // Determine styles based on post type
                    const isAlert = post.type === 'alert';
                    const isLostFound = post.type === 'lost-found';
                    const isNotice = post.type === 'notice';

                    return (
                        <article key={post.id} className="rounded-2xl p-4 shadow-sm border border-gray-100 bg-white transition-shadow hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500">
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
