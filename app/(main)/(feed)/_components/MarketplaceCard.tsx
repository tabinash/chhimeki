"use client";

import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { MarketplaceItem } from "@/data/mockMarketplaceData";

interface MarketplaceCardProps {
    item: MarketplaceItem;
}

export default function MarketplaceCard({ item }: MarketplaceCardProps) {
    return (
        <div className="flex-shrink-0 w-40 bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
            <div className="relative h-32 w-full bg-gray-100">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-900 text-sm">{item.price}</span>
                    <span className="text-[10px] text-gray-500">{item.time}</span>
                </div>
                <h4 className="font-medium text-gray-800 text-xs truncate mb-1.5">{item.title}</h4>
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="truncate">{item.location}</span>
                </div>
            </div>
        </div>
    );
}
