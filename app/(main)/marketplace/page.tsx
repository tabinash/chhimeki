"use client";

import { Search, MapPin, Grid, List, X, Heart, MessageCircle, Share2, ShieldCheck, Tag, ShoppingBag, Filter } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductPostModal from "@/components/marketplace/ProductPostModal";
import { marketplaceItems } from "@/data/mockMarketplaceData";

export default function MarketplacePage() {
    const [selectedItem, setSelectedItem] = useState<typeof marketplaceItems[0] | null>(null);
    const [viewMode, setViewMode] = useState<'browse' | 'selling'>('browse');

    const searchParams = useSearchParams();
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<typeof marketplaceItems[0] | null>(null);

    // Auto-open modal if URL has ?action=sell-item
    useEffect(() => {
        if (searchParams.get('action') === 'sell-item') {
            setIsPostModalOpen(true);
            setEditingItem(null);
        }
    }, [searchParams]);

    const handlePostClick = () => {
        setEditingItem(null);
        setIsPostModalOpen(true);
    };

    const handleEditClick = (item: typeof marketplaceItems[0]) => {
        setEditingItem(item);
        setIsPostModalOpen(true);
        setSelectedItem(null); // Close the detail view
    };

    const handleFormSubmit = (data: any) => {
        console.log("Listing Submitted:", data);
        setIsPostModalOpen(false);
        setEditingItem(null);
        window.history.replaceState(null, '', '/marketplace');
    };

    const handleModalClose = () => {
        setIsPostModalOpen(false);
        window.history.replaceState(null, '', '/marketplace');
    };

    const filteredItems = viewMode === 'selling'
        ? marketplaceItems.filter(item => item.isOwner)
        : marketplaceItems;

    return (
        <div className="min-h-screen p-8 relative">
            <div className="max-w-6xl mx-auto">
                {/* Header Row: Title, Tabs, Action */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-100 pb-6 md:pb-0 md:border-0">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
                        <p className="text-gray-500 text-sm mt-1">Buy and sell with your neighbors</p>
                    </div>

                    <div className="flex items-center gap-4 bg-gray-100/80 p-1.5 rounded-xl self-start md:self-auto">
                        <button
                            onClick={() => setViewMode('browse')}
                            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'browse' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Browse Market
                        </button>
                        <button
                            onClick={() => setViewMode('selling')}
                            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'selling' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            My Listings
                        </button>
                    </div>

                    <button
                        onClick={handlePostClick}
                        className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 self-start md:self-auto"
                    >
                        <Tag className="w-4 h-4" />
                        <span className="hidden sm:inline">Sell Item</span>
                        <span className="inline sm:hidden">Sell</span>
                    </button>
                </div>

                {/* Search Row: Search Bar & Filters */}
                <div className="flex gap-3 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={viewMode === 'selling' ? "Search your listings..." : "Search for bicycles, furniture, etc."}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors shadow-sm"
                        />
                    </div>
                    {viewMode === 'browse' && (
                        <button className="px-5 flex items-center gap-2 border border-gray-200 bg-white rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                            <Filter className="h-4 w-4" />
                            <span className="hidden sm:inline">Filters</span>
                        </button>
                    )}
                    <button className="px-6 bg-black text-white font-bold rounded-xl text-sm hover:bg-gray-800 transition-colors">
                        Search
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedItem(item)}
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
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                                <ShoppingBag className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">No listings found</h3>
                            <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">
                                {viewMode === 'selling' ? "You haven't listed any items specifically yet." : "No items match your criteria."}
                            </p>
                            {viewMode === 'selling' && (
                                <button
                                    onClick={handlePostClick}
                                    className="mt-6 px-6 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
                                >
                                    Listing Your First Item
                                </button>
                            )}
                        </div>
                    )}
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
                                        {selectedItem.seller} {selectedItem.isOwner && "(You)"}
                                        {selectedItem.isVerified && <ShieldCheck className="w-4 h-4 text-green-500" />}
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {selectedItem.location} • Verified neighbor
                                    </div>
                                </div>
                                {!selectedItem.isOwner && (
                                    <button className="ml-auto p-2 bg-white rounded-full border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-100 transition-colors">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-8 flex-1">
                                <h3 className="text-sm font-bold text-gray-900 mb-2">Description</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {selectedItem.description}
                                </p>
                            </div>

                            {/* Actions - Dynamic based on Ownership */}
                            <div className="flex gap-3 mt-auto pt-4 border-t border-gray-50">
                                {selectedItem.isOwner ? (
                                    <>
                                        <button className="flex-1 bg-gray-100 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                            Mark as Sold
                                        </button>
                                        <button
                                            onClick={() => handleEditClick(selectedItem)}
                                            className="flex-1 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 "
                                        >
                                            Edit Listing
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="flex-1 bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg ">
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
            )}

            {/* Post/Edit Product Modal */}
            <ProductPostModal
                isOpen={isPostModalOpen}
                onClose={handleModalClose}
                initialData={editingItem}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
}
