"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, MapPin, ShieldCheck, Heart, MessageCircle, Share2, Tag, MoreVertical } from "lucide-react";
import { marketplaceItems } from "@/data/mockMarketplaceData";
import Link from "next/link";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);
    const item = marketplaceItems.find((i) => i.id === id);

    if (!item) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Item not found</h2>
                <p className="text-gray-500 mb-6">This item may have been removed or sold.</p>
                <button
                    onClick={() => router.back()}
                    className="px-6 py-2.5 bg-black text-white rounded-xl font-bold text-sm"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-24 relative">
            {/* Header / Nav */}
            <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                <button
                    onClick={() => router.back()}
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white pointer-events-auto hover:bg-white/30 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex gap-2 pointer-events-auto">
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full aspect-[4/3] bg-gray-100">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                />

                {item.isOwner && (
                    <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm">
                        Your Listing
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="px-5 py-6">

                {/* Title & Price Section */}
                <div className="mb-6">
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900 leading-tight">{item.title}</h1>
                        <span className="text-2xl font-bold text-green-600 whitespace-nowrap">{item.price}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                            {item.category}
                        </span>
                        <span className="flex items-center gap-1">
                            <Tag className="w-3.5 h-3.5" />
                            {item.condition}
                        </span>
                        <span>•</span>
                        <span>{item.time}</span>
                    </div>
                </div>

                <hr className="border-gray-100 my-6" />

                {/* Seller Profile */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden relative border border-gray-100 bg-gray-50">
                        <Image
                            src={item.sellerImage}
                            alt={item.seller}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-gray-900 text-base flex items-center gap-1">
                            {item.seller}
                            {item.isVerified && <ShieldCheck className="w-4 h-4 text-green-500" />}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {item.location}
                        </div>
                    </div>
                    {!item.isOwner && (
                        <button className="p-2.5 bg-gray-50 rounded-full text-gray-400 hover:text-red-500 transition-colors">
                            <Heart className="w-6 h-6" />
                        </button>
                    )}
                </div>

                {/* Description */}
                <div className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
                        {item.description}
                    </p>
                </div>

                {/* Safety Tips (Optional, good for mobile) */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
                    <h4 className="text-xs font-bold text-blue-700 uppercase mb-2">Safety Tips</h4>
                    <ul className="text-xs text-blue-600 space-y-1 list-disc pl-4">
                        <li>Meet in a safe, public place.</li>
                        <li>Check the item before paying.</li>
                        <li>Pay only after collecting the item.</li>
                    </ul>
                </div>

            </div>

            <div className=" bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 safe-area-pb z-20">
                <div className="max-w-md mx-auto flex gap-3">
                    {item.isOwner ? (
                        <>
                            <button className="flex-1 bg-gray-100 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors">
                                Mark Sold
                            </button>
                            <button className="flex-1 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                                Edit Listing
                            </button>
                        </>
                    ) : (
                        <Link
                            href={`/messages/${item.sellerId}`}
                            className="flex-1 bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gray-200">
                            <MessageCircle className="w-5 h-5" />
                            Message Seller
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
