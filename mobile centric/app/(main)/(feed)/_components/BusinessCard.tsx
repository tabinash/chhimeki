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
        <div className="flex-shrink-0 w-44 bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
            <div className="relative h-28 w-full bg-gray-100">
                <Image
                    src={business.coverImage}
                    alt={business.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-[10px] font-bold text-gray-800">{business.rating}</span>
                </div>
                {business.isOpen ? (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                        OPEN
                    </div>
                ) : (
                    <div className="absolute top-2 left-2 bg-gray-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                        CLOSED
                    </div>
                )}
            </div>
            <div className="p-3">
                <div className="flex items-center gap-1 mb-1">
                    <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
                        {business.category}
                    </span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm truncate mb-1">{business.name}</h4>
                <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-2">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="truncate">{business.location}</span>
                </div>

            </div>
        </div>
    );
}
