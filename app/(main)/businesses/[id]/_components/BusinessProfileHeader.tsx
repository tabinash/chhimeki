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
        <div className="relative h-64 md:h-80 bg-gray-900 group">
            <Image
                src={business.coverImage}
                alt={business.name}
                fill
                className="object-cover opacity-90"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="absolute top-4 left-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all border border-white/10 z-20"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Header Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10 w-full">
                <div className="flex items-end gap-4">
                    {/* Avatar - Slightly overlapping */}
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden bg-white flex-shrink-0 relative">
                        <Image src={business.avatar} alt={business.name} fill className="object-cover" />
                    </div>

                    {/* Text Info */}
                    <div className="flex-1 min-w-0 pb-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border backdrop-blur-md ${business.isOpen
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                                }`}>
                                {business.isOpen ? "OPEN" : "CLOSED"}
                            </span>
                            <span className="text-xs font-medium text-gray-300 truncate">{business.category}</span>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight truncate">
                            {business.name}
                        </h1>

                        <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-300 font-medium">
                            <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                <span className="text-white font-bold">{business.rating}</span>
                                <span className="text-gray-400">({business.reviewCount})</span>
                            </div>
                            <div className="flex items-center gap-1 min-w-0">
                                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                <span className="truncate">{business.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
