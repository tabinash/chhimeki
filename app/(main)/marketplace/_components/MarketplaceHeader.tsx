"use client";
import { Tag } from "lucide-react";

interface MarketplaceHeaderProps {
    viewMode: 'browse' | 'selling';
    onViewModeChange: (mode: 'browse' | 'selling') => void;
    onSellClick: () => void;
}

export function MarketplaceHeader({ viewMode, onViewModeChange, onSellClick }: MarketplaceHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-100 pb-6 md:pb-0 md:border-0">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
                <p className="text-gray-500 text-sm mt-1">Buy and sell with your neighbors</p>
            </div>

            <div className="flex items-center gap-4 bg-gray-100/80 p-1.5 rounded-xl self-start md:self-auto">
                <button
                    onClick={() => onViewModeChange('browse')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'browse' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Browse Market
                </button>
                <button
                    onClick={() => onViewModeChange('selling')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'selling' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    My Listings
                </button>
            </div>

            <button
                onClick={onSellClick}
                className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 self-start md:self-auto"
            >
                <Tag className="w-4 h-4" />
                <span className="hidden sm:inline">Sell Item</span>
                <span className="inline sm:hidden">Sell</span>
            </button>
        </div>
    );
}
