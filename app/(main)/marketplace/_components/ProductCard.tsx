"use client";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { ProductResponse } from "@/types/api/products";
import { useUser } from "@/hooks/useUser";
import { useDispatch } from "react-redux";
import { openProductDetailModal } from "@/redux/slices/modalSlice";



interface ProductCardProps {
    product: ProductResponse;
    onClick: () => void;
}


// Helper function to format time ago
function getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
    // Format price
    const { user } = useUser();
    const formattedPrice = `Rs. ${product.price.toLocaleString()}`;

    const dispatch = useDispatch();


    // Get primary image or fallback
    const primaryImage = product.images[0]?.url || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop";

    // Format location
    const location = `${product.palika}, ${product.district}`;

    // Time ago
    const timeAgo = getTimeAgo(product.createdAt);

    // Check if product is owned by current user (will need user context)
    // For now, we'll use the seller info
    const isOwner = product.seller.id === user?.id;

    return (
        <div
            onClick={() => { dispatch(openProductDetailModal({ productId: product.id })) }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer border border-gray-100 flex flex-col"
        >
            <div className="aspect-[4/3] relative bg-gray-100 overflow-hidden">
                <Image
                    src={primaryImage}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-3 right-3 ${product.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-orange-500 text-white"} px-2 py-1 rounded-lg text-xs font-semibold text-gray-900 shadow-sm`}>
                    {product.status}
                </div>
                {isOwner && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        Your Listing
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">{product.title}</h3>
                    <span className="font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-lg">{formattedPrice}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {location}
                    </div>
                    <span className="font-medium text-gray-400">by {product.seller.name}</span>
                </div>
            </div>
        </div>
    );
}
