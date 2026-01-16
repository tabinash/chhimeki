"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
    MapPin,
    Star,
    MessageCircle,
    Phone,
    Edit3,
    Clock,
} from 'lucide-react';
import { Business } from '@/data/mockBusinessData';

interface BusinessProfileHeaderProps {
    business: Business;
    isOwner: boolean;
}

export default function BusinessProfileHeader({ business, isOwner }: BusinessProfileHeaderProps) {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview';

    const tabs = [
        { id: 'products', label: 'Products' },
        { id: 'overview', label: 'Overview' },
        { id: 'services', label: 'Services' },
        { id: 'reviews', label: 'Reviews' },
    ];

    // Default cover image if none provided
    const coverImage = business.coverImage || 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=400&fit=crop';

    return (
        <div className="bg-white pb-1">
            {/* Cover Photo - Edge to Edge */}
            <div className="relative aspect-5/4 bg-gray-100">
                <Image
                    src={coverImage}
                    alt="Cover"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/10" />

                {/* Open/Closed Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${business.isOpen
                        ? "bg-green-500 text-white"
                        : "bg-gray-700 text-white"
                        }`}>
                        <Clock className="w-3 h-3" />
                        {business.isOpen ? "Open Now" : "Closed"}
                    </span>
                </div>

                {/* Edit Cover button for owner */}
                {isOwner && (
                    <button className="absolute bottom-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors">
                        <Edit3 className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Profile Info */}
            <div className="px-4 relative">
                {/* Avatar & Actions Row */}
                <div className="flex justify-between  items-end -mt-10 mb-4">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-24 h-24 ">
                            <Image
                                src={business.avatar}
                                alt={business.name}
                                fill
                                className="object-cover rounded-full border-4 border-white bg-white "
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mb-1">
                        {isOwner ? (
                            <Link
                                href={`/storefront/${business.id}/edit`}
                                className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full text-sm font-bold border border-gray-200 hover:bg-gray-200 transition-colors"
                            >
                                Edit Profile
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={`/messages/${business.id}?bottomNav=false`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold shadow-sm flex items-center gap-1.5"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Message
                                </Link>
                                <a
                                    href={`tel:${business.phone}`}
                                    className="p-2 bg-gray-100 text-gray-900 rounded-full border border-gray-200"
                                >
                                    <Phone className="w-5 h-5" />
                                </a>
                            </>
                        )}
                    </div>
                </div>

                {/* Name & Info */}
                <div className="mb-6">
                    {/* Name with rating */}
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-[22px] font-bold text-gray-900 leading-tight">{business.name}</h1>
                        <div className="flex items-center gap-0.5 bg-yellow-50 px-2 py-0.5 rounded-full">
                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-bold text-gray-700">{business.rating}</span>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-[15px] text-gray-500 font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>{business.location}</span>
                    </div>

                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mt-3">
                        <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-[13px] font-bold">
                            {business.category}
                        </span>
                        <span className="text-[13px] text-gray-400">
                            {business.reviewCount} reviews
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-6 border-b border-gray-200 -mx-4 px-4 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.id}
                            href={`/storefront/${business.id}?tab=${tab.id}${isOwner ? '&self=true' : ''}`}
                            className={`relative py-3 text-[15px] font-bold whitespace-nowrap transition-colors ${activeTab === tab.id
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
