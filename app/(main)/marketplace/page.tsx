"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Local components
import { MarketplaceHeader } from "./_components/MarketplaceHeader";
import { MarketplaceSearchBar } from "./_components/MarketplaceSearchBar";
import { ProductCard } from "./_components/ProductCard";
import { EmptyMarketplaceState } from "./_components/EmptyMarketplaceState";

// Global modals (keep these in global components folder)
import ProductPostModal from "@/components/marketplace/ProductPostModal";
import ProductDetailModal from "@/components/modals/ProductDetailModal";

// Data
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
                <MarketplaceHeader
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    onSellClick={handlePostClick}
                />

                {/* Search Row: Search Bar & Filters */}
                <MarketplaceSearchBar viewMode={viewMode} />

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <ProductCard
                                key={item.id}
                                item={item}
                                onClick={() => setSelectedItem(item)}
                            />
                        ))
                    ) : (
                        <EmptyMarketplaceState viewMode={viewMode} onPostClick={handlePostClick} />
                    )}
                </div>
            </div>

            {/* Product Detail Modal */}
            <ProductDetailModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
                onEdit={handleEditClick}
            />

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

