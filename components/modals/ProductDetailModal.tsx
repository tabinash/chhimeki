"use client";

import { X, Heart, MessageCircle, Share2, ShieldCheck, Tag, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getChatUrl } from "@/lib/chatUtils";
import { MarketplaceItem } from "@/data/mockMarketplaceData";

interface ProductDetailModalProps {
    item: MarketplaceItem | null;
    onClose: () => void;
    onEdit?: (item: MarketplaceItem) => void;
}

export default function ProductDetailModal({ item, onClose, onEdit }: ProductDetailModalProps) {
    const router = useRouter();

    if (!item) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col md:flex-row relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-md transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Image Section (Left) */}
                <div className="w-full md:w-1/2 relative bg-gray-100 h-64 md:h-auto">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>

                {/* Details Section (Right) */}
                <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-full flex flex-col">

                    {/* Header details */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{item.category}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-400">{item.time}</span>
                            </div>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">{item.title}</h2>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-green-600">{item.price}</span>
                            <span className="flex items-center gap-1 text-sm font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
                                <Tag className="w-3.5 h-3.5" /> {item.condition}
                            </span>
                        </div>
                    </div>

                    {/* Seller Info */}
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 mb-6">
                        <div className="w-12 h-12 rounded-full overflow-hidden relative border border-white shadow-sm">
                            <Image src={item.sellerImage} alt={item.seller} fill className="object-cover" />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 text-sm flex items-center gap-1">
                                {item.seller} {item.isOwner && "(You)"}
                                {item.isVerified && <ShieldCheck className="w-4 h-4 text-green-500" />}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {item.location} • Verified neighbor
                            </div>
                        </div>
                        {!item.isOwner && (
                            <button className="ml-auto p-2 bg-white rounded-full border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-100 transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-8 flex-1">
                        <h3 className="text-sm font-bold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {item.description}
                        </p>
                    </div>

                    {/* Actions - Dynamic based on Ownership */}
                    <div className="flex gap-3 mt-auto pt-4 border-t border-gray-50">
                        {item.isOwner ? (
                            <>
                                <button className="flex-1 bg-gray-100 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                    Mark as Sold
                                </button>
                                <button
                                    onClick={() => onEdit?.(item)}
                                    className="flex-1 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 "
                                >
                                    Edit Listing
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => router.push(getChatUrl(item.sellerId, { hideSidebar: true, source: 'marketplace' }))}
                                    className="flex-1 bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg "
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Message Seller
                                </button>
                                <button className="p-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-600">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
