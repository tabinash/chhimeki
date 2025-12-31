"use client";
import { Search, MapPin, Grid, List, X, Heart, MessageCircle, Share2, ShieldCheck, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const items = [
    {
        id: 1,
        title: "Modern Sofa Set - Like New",
        price: "$450",
        location: "Downtown",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
        time: "2h ago",
        seller: "Sarah J.",
        sellerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        isVerified: true,
        condition: "Like New",
        description: "Moving out sale! This sofa was bought 6 months ago from IKEA. No stains, pet-free home. Includes the cushions shown in the picture. Must pick up by this weekend.",
        category: "Furniture"
    },
    {
        id: 2,
        title: "MacBook Pro M1 2021",
        price: "$1,200",
        location: "North Hills",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=400&h=300&fit=crop",
        time: "5h ago",
        seller: "Mike C.",
        sellerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        isVerified: false,
        condition: "Good",
        description: "14-inch MacBook Pro, M1 Pro chip, 16GB RAM, 512GB SSD. Minor scratches on the bottom case, but screen and keyboard are perfect. Battery health 92%.",
        category: "Electronics"
    },
    {
        id: 3,
        title: "Vintage Camera Collection",
        price: "$350",
        location: "Westside",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
        time: "1d ago",
        seller: "Alex R.",
        sellerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        isVerified: true,
        condition: "Vintage",
        description: "Selling my grandfather's collection of film cameras. Includes a Canon AE-1 and a Nikon F3. Haven't tested them recently but they have been stored carefully.",
        category: "Collectibles"
    },
    {
        id: 4,
        title: "Oak Dining Table",
        price: "$200",
        location: "Downtown",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=300&fit=crop",
        time: "3d ago",
        seller: "Emily W.",
        sellerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        isVerified: true,
        condition: "Used",
        description: "Solid oak dining table, seats 6. A bit of wear on the surface but can be refinished. Great sturdy table for a family.",
        category: "Furniture"
    },
    {
        id: 5,
        title: "Mountain Bike",
        price: "$550",
        location: "Greenwood",
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&h=300&fit=crop",
        time: "4h ago",
        seller: "John D.",
        sellerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        isVerified: false,
        condition: "Good",
        description: "Trek Marlin 5. Ridden for one season. Tuned up recently. Comes with a lock and helmet if needed.",
        category: "Sports"
    },
    {
        id: 6,
        title: "Pottery Set (Handmade)",
        price: "$85",
        location: "Arts District",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop",
        time: "1h ago",
        seller: "Lisa M.",
        sellerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
        isVerified: true,
        condition: "New",
        description: "Set of 4 handmade ceramic bowls and plates. Microwave and dishwasher safe. Made by me in my local studio!",
        category: "Home & Garden"
    }
];

export default function MarketplacePage() {
    const [selectedItem, setSelectedItem] = useState<typeof items[0] | null>(null);

    return (
        <div className="min-h-screen p-8 relative">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
                        <p className="text-gray-500 text-sm mt-1">Buy and sell with your neighbors</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search listings..."
                                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 shadow-sm"
                            />
                        </div>
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button className="p-2 bg-white rounded-md shadow-sm"><Grid className="h-4 w-4 text-gray-700" /></button>
                            <button className="p-2 hover:bg-gray-200 rounded-md transition-colors"><List className="h-4 w-4 text-gray-500" /></button>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer border border-gray-100"
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
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">{item.title}</h3>
                                    <span className="font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-lg">{item.price}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {item.location}
                                    </div>
                                    <span className="font-medium text-gray-400">by {item.seller}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Detail Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col md:flex-row relative">

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 left-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-md transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Image Section (Left) */}
                        <div className="w-full md:w-1/2 relative bg-gray-100 h-64 md:h-auto">
                            <Image src={selectedItem.image} alt={selectedItem.title} fill className="object-cover" />
                        </div>

                        {/* Details Section (Right) */}
                        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-full flex flex-col">

                            {/* Header details */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{selectedItem.category}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-gray-400">{selectedItem.time}</span>
                                    </div>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">{selectedItem.title}</h2>
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-bold text-green-600">{selectedItem.price}</span>
                                    <span className="flex items-center gap-1 text-sm font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
                                        <Tag className="w-3.5 h-3.5" /> {selectedItem.condition}
                                    </span>
                                </div>
                            </div>

                            {/* Seller Info */}
                            <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 mb-6">
                                <div className="w-12 h-12 rounded-full overflow-hidden relative border border-white shadow-sm">
                                    <Image src={selectedItem.sellerImage} alt={selectedItem.seller} fill className="object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm flex items-center gap-1">
                                        {selectedItem.seller}
                                        {selectedItem.isVerified && <ShieldCheck className="w-4 h-4 text-green-500" />}
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {selectedItem.location} • Verified neighbor
                                    </div>
                                </div>
                                <button className="ml-auto p-2 bg-white rounded-full border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-100 transition-colors">
                                    <Heart className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Description */}
                            <div className="mb-8 flex-1">
                                <h3 className="text-sm font-bold text-gray-900 mb-2">Description</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {selectedItem.description}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 mt-auto pt-4 border-t border-gray-50">
                                <button className="flex-1 bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gray-200">
                                    <MessageCircle className="w-5 h-5" />
                                    Message Seller
                                </button>
                                <button className="p-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-600">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
