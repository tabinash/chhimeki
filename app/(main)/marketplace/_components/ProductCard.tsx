"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { ProductResponse } from "@/types/api/products";

interface ProductCardProps {
    product: ProductResponse;
    isOwner?: boolean;
}

export default function ProductCard({ product, isOwner }: ProductCardProps) {
    // Format price with NPR currency
    const formatPrice = (price: number) => {
        return `Rs. ${price.toLocaleString("en-NP")}`;
    };

    // Format relative time from createdAt
    const getRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return date.toLocaleDateString();
    };

    // Get first image URL or placeholder
    const imageUrl = product.images?.[0]?.url || "/placeholder-product.jpg";

    return (
        <Link
            href={`/marketplace/${product.id}`}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col active:scale-[0.98] transition-transform duration-200"
        >
            <div className="aspect-square relative bg-gray-100">
                <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                />

                {product.status === "SOLD" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold text-[15px]">SOLD</span>
                    </div>
                )}
            </div>
            <div className="p-3 flex flex-col flex-1">
                <div className="flex justify-between items-start gap-1 mb-1">
                    <h3 className="font-semibold text-gray-900 text-[15px] leading-tight line-clamp-2">{product.title}</h3>
                </div>
                <div className="font-bold text-gray-900 text-[13px] mb-2">
                    {formatPrice(product.price)}
                    {product.isNegotiable && (
                        <span className="text-[13px] text-gray-900 font-normal ml-1">(Negotiable)</span>
                    )}
                </div>

                <div className="mt-auto flex items-center justify-between text-[13px] text-gray-500">
                    <div className="flex items-center gap-1 truncate max-w-[80px]">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{product.palika}</span>
                    </div>
                    <span>{getRelativeTime(product.createdAt)}</span>
                </div>
            </div>
        </Link>
    );
}
