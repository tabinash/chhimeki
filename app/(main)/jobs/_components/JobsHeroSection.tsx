"use client";
import { useState } from "react";
import {
    Briefcase,
    Search,
    Plus,
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
    ChevronRight,
    MapPin,
    Users
} from "lucide-react";
import { JobCategory } from "@/types/api/job";

interface JobsHeroSectionProps {
    viewMode: 'all' | 'my jobs';
    onViewModeChange: (mode: 'all' | 'my jobs') => void;
    onPostJobClick?: () => void;
    selectedCategory?: JobCategory;
    onCategoryChange: (category: JobCategory | undefined) => void;
    jobCount?: number;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
}

// Category configuration with icons
const categoryConfig: Record<JobCategory, { label: string; icon: React.ElementType }> = {
    CONSTRUCTION: { label: "Construction", icon: Wrench },
    DOMESTIC_HELP: { label: "Domestic", icon: Home },
    DRIVING: { label: "Driving", icon: Car },
    TEACHING: { label: "Teaching", icon: GraduationCap },
    IT_TECHNOLOGY: { label: "IT & Tech", icon: Monitor },
    SALES_MARKETING: { label: "Sales", icon: TrendingUp },
    HEALTHCARE: { label: "Healthcare", icon: Heart },
    AGRICULTURE: { label: "Agriculture", icon: Leaf },
    HOSPITALITY: { label: "Hospitality", icon: UtensilsCrossed },
    RETAIL: { label: "Retail", icon: ShoppingBag },
    MANUFACTURING: { label: "Manufacturing", icon: Factory },
    SECURITY: { label: "Security", icon: Shield },
    DELIVERY: { label: "Delivery", icon: Truck },
    BEAUTY_WELLNESS: { label: "Beauty", icon: Sparkles },
    OTHERS: { label: "Others", icon: MoreHorizontal }
};

const featuredCategories: JobCategory[] = [
    "CONSTRUCTION",
    "DOMESTIC_HELP",
    "DRIVING",
    "TEACHING",
    "IT_TECHNOLOGY",
    "HEALTHCARE"
];

const allCategories: JobCategory[] = Object.keys(categoryConfig) as JobCategory[];

export function JobsHeroSection({
    viewMode,
    onViewModeChange,
    onPostJobClick,
    selectedCategory,
    onCategoryChange,
    jobCount,
    searchQuery = "",
    onSearchChange
}: JobsHeroSectionProps) {
    const [showAllCategories, setShowAllCategories] = useState(false);
    const displayCategories = showAllCategories ? allCategories : featuredCategories;

    return (
        <div className="mb-6">
            {/* Hero Card - Blue Theme matching system */}
            <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-6 mb-5">
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                {/* Content */}
                <div className="relative z-10">
                    {/* Title Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Neighborhood Jobs</h1>
                                <p className="text-blue-100 text-sm">Find work or hire a neighbor</p>
                            </div>
                        </div>

                        {onPostJobClick && (
                            <button
                                onClick={onPostJobClick}
                                className="flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors self-start sm:self-auto"
                            >
                                <Plus className="w-4 h-4" />
                                Post a Job
                            </button>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => onSearchChange?.(e.target.value)}
                                placeholder="Search jobs..."
                                className="w-full pl-11 pr-4 py-3 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                            />
                        </div>
                        <div className="relative sm:w-40">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <select
                                className="w-full pl-9 pr-4 py-3 bg-white rounded-xl text-sm focus:outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Near Me</option>
                                <option value="5">5 km</option>
                                <option value="10">10 km</option>
                            </select>
                        </div>
                        <button className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl text-sm hover:bg-gray-800 transition-colors">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs + Categories - White Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                {/* Tabs Row */}
                <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex gap-2">
                        <button
                            onClick={() => onViewModeChange('all')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <Briefcase className="w-4 h-4" />
                            Browse
                        </button>
                        <button
                            onClick={() => onViewModeChange('my jobs')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'my jobs'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <Users className="w-4 h-4" />
                            My Jobs
                        </button>
                    </div>

                    {jobCount !== undefined && viewMode === 'all' && (
                        <span className="text-xs text-gray-500">
                            <span className="font-bold text-gray-700">{jobCount}</span> jobs found
                        </span>
                    )}
                </div>

                {/* Categories - Only for "all" mode */}
                {viewMode === 'all' && (
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Categories</span>
                            <button
                                onClick={() => setShowAllCategories(!showAllCategories)}
                                className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                                {showAllCategories ? 'Less' : 'All'}
                                <ChevronRight className={`w-3 h-3 transition-transform ${showAllCategories ? 'rotate-90' : ''}`} />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {/* All button */}
                            <button
                                onClick={() => onCategoryChange(undefined)}
                                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${!selectedCategory
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                All
                            </button>

                            {/* Category buttons */}
                            {displayCategories.map((cat) => {
                                const config = categoryConfig[cat];
                                const Icon = config.icon;
                                const isSelected = selectedCategory === cat;

                                return (
                                    <button
                                        key={cat}
                                        onClick={() => onCategoryChange(cat)}
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${isSelected
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        {config.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
