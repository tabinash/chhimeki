"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPin, Star, Share2, MessageCircle, Heart, ChevronLeft, Edit2, Camera, Settings } from 'lucide-react';
import { Business } from '@/data/mockBusinessData';

interface BusinessProfileHeaderProps {
    business: Business;
    isOwner: boolean;
}

export default function BusinessProfileHeader({ business, isOwner }: BusinessProfileHeaderProps) {
    const router = useRouter();

    return (
        <div className="relative h-72 md:h-96 bg-gray-900 group">
            <Image
                src={business.coverImage}
                alt={business.name}
                fill
                className="object-cover opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="absolute top-6 left-6 p-2.5 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all border border-white/10"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Owner: Edit Cover */}
            {isOwner && (
                <button className="absolute top-6 right-6 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/20 flex items-center gap-2 text-sm font-medium">
                    <Camera className="w-4 h-4" />
                    <span>Edit Cover</span>
                </button>
            )}

            {/* Header Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:items-end gap-8">
                    {/* Avatar */}
                    <div className="w-28 h-28 md:w-40 md:h-40 rounded-3xl border-[6px] border-white shadow-2xl overflow-hidden bg-white flex-shrink-0 -mb-16 md:mb-0 relative z-10 group-hover:scale-[1.02] transition-transform">
                        <Image src={business.avatar} alt={business.name} fill className="object-cover" />
                        {isOwner && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="w-8 h-8 text-white/80" />
                            </div>
                        )}
                    </div>

                    {/* Text Info */}
                    <div className="flex-1 text-white pb-2">
                        <div className="flex items-center gap-3 mb-3">
                            <button className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all ${business.isOpen
                                ? "bg-green-500 text-white border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                                : "bg-red-500 text-white border-red-400"
                                } ${isOwner ? "cursor-pointer hover:scale-105 active:scale-95" : "cursor-default"}
                            `}>
                                {business.isOpen ? "OPEN NOW" : "CLOSED"}
                            </button>
                            <span className="text-sm font-bold text-gray-300 tracking-wide">• {business.category}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 drop-shadow-lg leading-none">
                            {business.name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-gray-200">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>{business.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-white">{business.rating}</span>
                                <span className="text-gray-400 font-medium">({business.reviewCount} reviews)</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pb-2 pt-4 md:pt-0">
                        {isOwner ? (
                            <>
                                <button className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/10">
                                    <Settings className="w-5 h-5" />
                                </button>
                                <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-xl">
                                    <Edit2 className="w-4 h-4" />
                                    <span>Edit Profile</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/10">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/10">
                                    <Heart className="w-5 h-5" />
                                </button>
                                <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-xl shadow-blue-900/20">
                                    <MessageCircle className="w-5 h-5" />
                                    <span>Message</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
