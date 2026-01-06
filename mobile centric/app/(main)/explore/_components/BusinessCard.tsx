import Link from "next/link";

interface BusinessCardProps {
    business: {
        id: number;
        name: string;
        category: string;
        coverImage: string;
    };
}

export default function BusinessCard({ business }: BusinessCardProps) {
    return (
        <Link
            href={`/businesses/${business.id}`}
            className="snap-center w-[220px] flex-shrink-0 bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden"
        >
            <div className="h-24 bg-gray-100">
                <img
                    src={business.coverImage}
                    alt={business.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="px-3 py-2">
                <h3 className="font-bold text-sm truncate">
                    {business.name}
                </h3>
                <p className="text-xs text-gray-500">
                    {business.category}
                </p>
            </div>
        </Link>
    );
}
