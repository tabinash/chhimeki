"use client";
import { JobCategory } from "@/types/api/job";

interface JobCategoriesFilterProps {
    selectedCategory?: JobCategory;
    onCategoryChange: (category: JobCategory | undefined) => void;
}

// Map API enum to display labels
const categoryLabels: Record<JobCategory, string> = {
    CONSTRUCTION: "Construction",
    DOMESTIC_HELP: "Domestic Help",
    DRIVING: "Driving",
    TEACHING: "Teaching",
    IT_TECHNOLOGY: "IT & Tech",
    SALES_MARKETING: "Sales",
    HEALTHCARE: "Healthcare",
    AGRICULTURE: "Agriculture",
    HOSPITALITY: "Hospitality",
    RETAIL: "Retail",
    MANUFACTURING: "Manufacturing",
    SECURITY: "Security",
    DELIVERY: "Delivery",
    BEAUTY_WELLNESS: "Beauty",
    OTHERS: "Others"
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
        <div className="flex flex-wrap gap-2 mb-8">
            {/* All Categories button */}
            <button
                onClick={() => onCategoryChange(undefined)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${!selectedCategory
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
            >
                All
            </button>

            {/* Individual category buttons */}
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${selectedCategory === cat
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    {categoryLabels[cat]}
                </button>
            ))}
        </div>
    );
}
