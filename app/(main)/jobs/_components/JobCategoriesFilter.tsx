"use client";

interface JobCategory {
    name: string;
    count: number;
}

interface JobCategoriesFilterProps {
    categories: JobCategory[];
}

export function JobCategoriesFilter({ categories }: JobCategoriesFilterProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat, i) => (
                <button
                    key={i}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${i === 0 ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}
