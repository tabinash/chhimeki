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
        <div className="flex-shrink-0 w-52 bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-[1.02] shadow-sm">
            <div className="relative h-40 w-full bg-gray-100">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-3.5">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-gray-900 text-base">{item.price}</span>
                    <span className="text-xs text-gray-500">{item.time}</span>
                </div>
                <h4 className="font-semibold text-gray-800 text-sm truncate mb-2">{item.title}</h4>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span className="truncate">{item.location}</span>
                </div>
            </div>
        </div>
    );
}
