"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Hooks
import { useUser } from "@/hooks/useUser";
import { useBrowseProducts, useMyProducts } from "./_hook";


// Local components
import { MarketplaceHeroSection } from "./_components/MarketplaceHeroSection";
import { ProductCard } from "./_components/ProductCard";
import { EmptyMarketplaceState } from "./_components/EmptyMarketplaceState";
import { MarketplaceLeftSidebar } from "./_components/MarketplaceLeftSidebar";

// Global modals (keep these in global components folder)
import CreateProductModal from "@/app/(main)/marketplace/_modals/CreateProductModal";
import EditProductModal from "@/app/(main)/marketplace/_modals/EditProductModal";
import ProductDetailModal from "@/app/(main)/marketplace/_modals/ProductDetailModal";


// Types
import { ProductResponse, ProductCategory } from "@/types/api/products";

export default function MarketplacePage() {
    const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
    const [viewMode, setViewMode] = useState<'browse' | 'selling'>('browse');
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | undefined>(undefined);

    const searchParams = useSearchParams();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);


    // Get current user for geography
    const { user } = useUser();

    // Fetch products based on view mode
    const { data: browseData, isLoading: isBrowseLoading } = useBrowseProducts(
        user?.palika || "",
        {
            category: selectedCategory,
            page: 0,
            size: 20,
        }
    );

    const { data: myProductsData, isLoading: isMyProductsLoading } = useMyProducts(
        user?.id || 0,
        {
            status: "ALL",
            page: 0,
            size: 20,
        }
    );

    // Auto-open create modal if URL has ?action=sell-item
    useEffect(() => {
        if (searchParams.get('action') === 'sell-item') {
            setIsCreateModalOpen(true);
        }
    }, [searchParams]);

    const handlePostClick = () => {
        setIsCreateModalOpen(true);
    };



    const handleCreateModalClose = () => {
        setIsCreateModalOpen(false);
        window.history.replaceState(null, '', '/marketplace');
    };


    const handleCreateSuccess = () => {
        // Product created successfully - cache will auto-refresh
        window.history.replaceState(null, '', '/marketplace');
    };



    // Get products based on view mode
    const products = viewMode === 'selling'
        ? (myProductsData?.data || [])
        : (browseData?.data || []);

    const isLoading = viewMode === 'selling' ? isMyProductsLoading : isBrowseLoading;

    return (
        <div className="flex h-full">
            {/* Left Sidebar - Category Filters */}

            <MarketplaceLeftSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                userLocation={user?.palika || "Not logged in"}
            />

            {/* Main Content Area */}
            <div className="flex-1 h-full ">
                <div className="min-h-screen p-8 relative">
                    <div className="max-w-6xl mx-auto">
                        {/* Unified Hero Section */}
                        <MarketplaceHeroSection
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            onSellClick={handlePostClick}
                            productCount={viewMode === 'browse' ? browseData?.data?.length : myProductsData?.data?.length}
                        />

                        {/* Loading State */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                                        <div className="aspect-[4/3] bg-gray-200" />
                                        <div className="p-4 space-y-3">
                                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                                            <div className="h-4 bg-gray-200 rounded w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Grid */
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onClick={() => setSelectedProduct(product)}
                                        />
                                    ))
                                ) : (
                                    <EmptyMarketplaceState viewMode={viewMode} onPostClick={handlePostClick} />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Product Detail Modal */}
                    <ProductDetailModal />

                    {/* Create Product Modal */}
                    <CreateProductModal
                        isOpen={isCreateModalOpen}
                        onClose={handleCreateModalClose}
                        onSuccess={handleCreateSuccess}
                    />

                    {/* Edit Product Modal */}
                    <EditProductModal />

                </div>
            </div>
        </div>
    );
}


