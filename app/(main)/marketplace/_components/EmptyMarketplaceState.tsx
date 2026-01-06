"use client";
import { ShoppingBag } from "lucide-react";

interface EmptyMarketplaceStateProps {
    viewMode: 'browse' | 'selling';
    onPostClick?: () => void;
}

export function EmptyMarketplaceState({ viewMode, onPostClick }: EmptyMarketplaceStateProps) {
    return (
        <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                <ShoppingBag className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No listings found</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">
                {viewMode === 'selling' ? "You haven't listed any items specifically yet." : "No items match your criteria."}
            </p>
            {viewMode === 'selling' && onPostClick && (
                <button
                    onClick={onPostClick}
                    className="mt-6 px-6 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
                >
                    Listing Your First Item
                </button>
            )}
        </div>
    );
}
