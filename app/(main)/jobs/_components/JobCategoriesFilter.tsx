"use client";
import {
    Wrench,
    Home,
    Car,
    GraduationCap,
    Monitor,
    TrendingUp,
    Heart,
    Leaf,
    UtensilsCrossed,
    ShoppingBag,
    Factory,
    Shield,
    Truck,
    Sparkles,
    MoreHorizontal,
    Layers
} from "lucide-react";
import { JobCategory } from "@/types/api/job";

interface JobCategoriesFilterProps {
    selectedCategory?: JobCategory;
    onCategoryChange: (category: JobCategory | undefined) => void;
}

// Map categories to icons and colors
const categoryConfig: Record<JobCategory, { label: string; icon: React.ElementType; color: string }> = {
    CONSTRUCTION: { label: "Construction", icon: Wrench, color: "text-orange-600 bg-orange-50 border-orange-200" },
    DOMESTIC_HELP: { label: "Domestic", icon: Home, color: "text-pink-600 bg-pink-50 border-pink-200" },
    DRIVING: { label: "Driving", icon: Car, color: "text-blue-600 bg-blue-50 border-blue-200" },
    TEACHING: { label: "Teaching", icon: GraduationCap, color: "text-purple-600 bg-purple-50 border-purple-200" },
    IT_TECHNOLOGY: { label: "IT & Tech", icon: Monitor, color: "text-cyan-600 bg-cyan-50 border-cyan-200" },
    SALES_MARKETING: { label: "Sales", icon: TrendingUp, color: "text-green-600 bg-green-50 border-green-200" },
    HEALTHCARE: { label: "Healthcare", icon: Heart, color: "text-red-600 bg-red-50 border-red-200" },
    AGRICULTURE: { label: "Agriculture", icon: Leaf, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    HOSPITALITY: { label: "Hospitality", icon: UtensilsCrossed, color: "text-amber-600 bg-amber-50 border-amber-200" },
    RETAIL: { label: "Retail", icon: ShoppingBag, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
    MANUFACTURING: { label: "Manufacturing", icon: Factory, color: "text-slate-600 bg-slate-50 border-slate-200" },
    SECURITY: { label: "Security", icon: Shield, color: "text-gray-600 bg-gray-100 border-gray-300" },
    DELIVERY: { label: "Delivery", icon: Truck, color: "text-teal-600 bg-teal-50 border-teal-200" },
    BEAUTY_WELLNESS: { label: "Beauty", icon: Sparkles, color: "text-rose-600 bg-rose-50 border-rose-200" },
    OTHERS: { label: "Others", icon: MoreHorizontal, color: "text-gray-600 bg-gray-50 border-gray-200" }
};

const categories: JobCategory[] = [
    "CONSTRUCTION",
    "DOMESTIC_HELP",
    "DRIVING",
    "TEACHING",
    "IT_TECHNOLOGY",
    "SALES_MARKETING",
    "HEALTHCARE",
    "AGRICULTURE",
    "HOSPITALITY",
    "RETAIL",
    "MANUFACTURING",
    "SECURITY",
    "DELIVERY",
    "BEAUTY_WELLNESS",
    "OTHERS"
];

export function JobCategoriesFilter({ selectedCategory, onCategoryChange }: JobCategoriesFilterProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-700">Browse by Category</span>
            </div>

            <div className="flex flex-wrap gap-2">
                {/* All Categories button */}
                <button
                    onClick={() => onCategoryChange(undefined)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${!selectedCategory
                            ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    <Layers className="w-3.5 h-3.5" />
                    All
                </button>

                {/* Individual category buttons */}
                {categories.map((cat) => {
                    const config = categoryConfig[cat];
                    const Icon = config.icon;
                    const isSelected = selectedCategory === cat;

                    return (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${isSelected
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                                    : `${config.color} hover:shadow-sm`
                                }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            {config.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
