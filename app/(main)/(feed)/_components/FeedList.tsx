"use client";

import { AlertTriangle, PawPrint, Megaphone, MapPin, MoreHorizontal, Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { posts } from "@/data/mockFeedData";
type TabItem = {
    id: string;
    label: string;
};



export default function FeedList() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeTab = searchParams.get('tab') || 'all';
    const TABS: TabItem[] = [
        { id: "all", label: "Following" },
        { id: "alerts", label: "Near You" },
        { id: "notices", label: "Interests" },
    ];


    const handleTabChange = (tab: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (tab === 'all') {
            params.delete('tab');
        } else {
            params.set('tab', tab);
        }
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    const filteredPosts = activeTab === 'all'
        ? posts
        : posts.filter(post => {
            if (activeTab === 'alerts') return post.type === 'alert';
            if (activeTab === 'lost-found') return post.type === 'lost-found';
            if (activeTab === 'notices') return post.type === 'notice';
            return true;
        });

    return (
        <div>
            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-200 p-4 pb-2 bg-white">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`
          relative pb-3 text-[500] font-semibold transition-colors
          ${isActive
                                    ? "text-blue-500 border-b-2 border-blue-500"
                                    : "text-gray-500 hover:text-gray-700"}
        `}
                        >
                            {tab.label}


                        </button>
                    );
                })}
            </div>


            {/* Posts Feed - Profile Style */}
            <div className="divide-y divide-gray-100 border-t border-gray-100 space-y-1">
                {filteredPosts.map(post => {
                    const isAlert = post.type === 'alert';
                    const isLostFound = post.type === 'lost-found';
                    const isNotice = post.type === 'notice';

                    return (
                        <article key={post.id} className="bg-white p-4">
                            {/* Type Badge */}
                            {isAlert && (
                                <div className="flex items-center gap-1.5 mb-2">
                                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">Critical Alert</span>
                                </div>
                            )}
                            {isLostFound && (
                                <div className="flex items-center gap-1.5 mb-2">
                                    <PawPrint className="w-3.5 h-3.5 text-orange-600" />
                                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wide">Lost & Found</span>
                                </div>
                            )}
                            {isNotice && (
                                <div className="flex items-center gap-1.5 mb-2">
                                    <Megaphone className="w-3.5 h-3.5 text-green-600" />
                                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">Official Notice</span>
                                </div>
                            )}

                            {/* Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                                    <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="font-bold text-gray-900 text-sm truncate">{post.author.name}</h4>
                                        {post.author.isOfficial && <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Official</span>}
                                        {post.author.isBusiness && <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Biz</span>}
                                    </div>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        {post.time} • <MapPin className="w-3 h-3" /> {post.author.location}
                                    </p>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Title */}
                            {post.title && (
                                <h3 className="font-bold text-gray-900 text-base mb-2">{post.title}</h3>
                            )}

                            {/* Content */}
                            <p className="text-gray-800 font-[400] leading-relaxed mb-3 whitespace-pre-line">
                                {post.content}
                            </p>

                            {/* Image */}
                            {post.images.length > 0 && (
                                <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-3">
                                    <Image src={post.images[0]} alt="Post image" fill className="object-cover" />
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-6 pt-1">
                                <button className={`flex items-center gap-2 transition-colors ${post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}>
                                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                                    <span className="text-sm font-medium">{post.stats.likes}</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="text-sm font-medium">{post.stats.comments}</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                                    <Share2 className="w-5 h-5" />
                                    <span className="text-sm font-medium">{post.stats.shares}</span>
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

