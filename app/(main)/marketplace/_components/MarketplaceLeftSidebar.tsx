"use client";
import { SlidersHorizontal, MapPin, Tag, ShoppingBag, X } from "lucide-react";
import { ProductCategory } from "@/types/api/products";

interface MarketplaceLeftSidebarProps {
    selectedCategory: ProductCategory | undefined;
    onCategoryChange: (category: ProductCategory | undefined) => void;
    userLocation: string;
}

// All available categories from API
const categories: { value: ProductCategory; label: string }[] = [
    { value: "ELECTRONICS", label: "Electronics" },
    { value: "FURNITURE", label: "Furniture" },
    { value: "VEHICLES", label: "Vehicles" },
    { value: "FASHION", label: "Fashion & Clothing" },
    { value: "HOME_GARDEN", label: "Home & Garden" },
    { value: "SPORTS", label: "Sports & Outdoors" },
    { value: "BOOKS", label: "Books & Media" },
    { value: "TOYS", label: "Toys & Games" },
    { value: "MOBILE", label: "Mobile & Accessories" },
    { value: "OTHERS", label: "Others" },
];

export function MarketplaceLeftSidebar({
    selectedCategory,
    onCategoryChange,
    userLocation
}: MarketplaceLeftSidebarProps) {
    const handleCategoryClick = (category: ProductCategory) => {
        // Toggle: if already selected, deselect (show all)
        if (selectedCategory === category) {
            onCategoryChange(undefined);
        } else {
            onCategoryChange(category);
        }
    };

    const handleReset = () => {
        onCategoryChange(undefined);
    };

    return (
        <aside className="w-50 min-w-[280px] flex-shrink-0 flex flex-col p-4">
            <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col gap-6">

                {/* Filters Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                    {selectedCategory && (
                        <button
                            onClick={handleReset}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                            <X className="w-3 h-3" />
                            Reset
                        </button>
                    )}
                </div>

                {/* Location Display */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> Your Location
                    </h3>
                    <div className="bg-blue-50 p-3 rounded-xl flex items-center gap-2 text-sm text-blue-700 border border-blue-100">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">{userLocation || "Not set"}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Showing products from your area</p>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Tag className="h-4 w-4" /> Categories
                    </h3>
                    <div className="space-y-1 max-h-[400px] overflow-y-auto">
                        <button
                            onClick={() => onCategoryChange(undefined)}
                            className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-colors text-left ${!selectedCategory
                                ? 'bg-blue-50 border border-blue-200'
                                : 'hover:bg-gray-50'
                                }`}
                        >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${!selectedCategory
                                ? 'border-blue-600'
                                : 'border-gray-300'
                                }`}>
                                {!selectedCategory && (
                                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                                )}
                            </div>
                            <span className={`text-sm font-medium ${!selectedCategory ? 'text-blue-700' : 'text-gray-700'
                                }`}>
                                All Categories
                            </span>
                        </button>

                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => handleCategoryClick(cat.value)}
                                className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-colors text-left ${selectedCategory === cat.value
                                    ? 'bg-blue-50 border border-blue-200'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedCategory === cat.value
                                    ? 'border-blue-600'
                                    : 'border-gray-300'
                                    }`}>
                                    {selectedCategory === cat.value && (
                                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                                    )}
                                </div>
                                <span className={`text-sm ${selectedCategory === cat.value
                                    ? 'font-medium text-blue-700'
                                    : 'text-gray-700'
                                    }`}>
                                    {cat.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
