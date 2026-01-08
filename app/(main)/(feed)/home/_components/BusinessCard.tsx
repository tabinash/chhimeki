"use client";

import React from "react";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { Business } from "@/data/mockBusinessData";

interface BusinessCardProps {
    business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
    return (
        <div className="flex-shrink-0 w-56 bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-[1.02] shadow-md">
            <div className="relative h-32 w-full bg-gray-100">
                <Image
                    src={business.coverImage}
                    alt={business.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                    <span className="text-xs font-bold text-gray-800">{business.rating}</span>
                </div>
                {business.isOpen ? (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                        OPEN
                    </div>
                ) : (
                    <div className="absolute top-2 left-2 bg-gray-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                        CLOSED
                    </div>
                )}
            </div>
            <div className="p-3.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {business.category}
                    </span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm truncate mb-1.5">{business.name}</h4>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span className="truncate">{business.location}</span>
                </div>
            </div>
        </div>
    );
}
