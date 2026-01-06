"use client";
import { MapPin } from "lucide-react";
import Image from "next/image";

interface MarketplaceItem {
    id: number;
    title: string;
    price: string;
    location: string;
    seller: string;
    image: string;
    time: string;
    isOwner: boolean;
}

interface ProductCardProps {
    item: MarketplaceItem;
    onClick: () => void;
}

export function ProductCard({ item, onClick }: ProductCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer border border-gray-100 flex flex-col"
        >
            <div className="aspect-[4/3] relative bg-gray-100 overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-gray-900 shadow-sm">
                    {item.time}
                </div>
                {item.isOwner && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        Your Listing
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">{item.title}</h3>
                    <span className="font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-lg">{item.price}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                    </div>
                    <span className="font-medium text-gray-400">by {item.seller}</span>
                </div>
            </div>
        </div>
    );
}
