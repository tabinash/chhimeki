import { Business } from "@/data/mockStoreFrontData";
import { MapPin, Star, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BusinessCardProps {
    business: Business;
}

export default function StoreCard({ business }: BusinessCardProps) {
    return (
        <Link
            href={`/storefront/${business.id}`}
            className="group block relative bg-white rounded-2xl p-2.5 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
        >
            <div className="flex gap-3.5 items-start">
                {/* Image Section - Compact */}
                <div className="relative w-24 h-24 md:w-32 md:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                        src={business.coverImage || "/placeholder-cover.jpg"}
                        alt={business.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Status Badge - Micro */}
                    <div className="absolute top-1.5 left-1.5">
                        <span className={`px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border border-white/10 ${business.isOpen
                            ? "bg-green-500/90 text-white"
                            : "bg-black/60 text-white"
                            }`}>
                            {business.isOpen ? "Open" : "Closed"}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0 py-0.5 pr-1">
                    <div className="flex justify-between items-start mb-0.5">
                        <div>
                            {/* Category */}
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 block mb-0.5">
                                {business.category}
                            </span>

                            {/* Name */}
                            <h3 className="font-bold text-base md:text-lg text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                {business.name}
                            </h3>
                        </div>

                        {/* Rating Pill */}
                        <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded-md self-start">
                            <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                            <span className="font-bold text-xs text-gray-900">{business.rating}</span>
                        </div>
                    </div>

                    {/* Description - Line clamp 2 */}
                    <p className="text-xs md:text-sm text-gray-500 line-clamp-2 mb-2 leading-relaxed">
                        {business.description || "No description available."}
                    </p>

                    {/* Footer Info */}
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500 border-t border-gray-100 pt-2 mt-auto">
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="truncate max-w-[120px]">{business.palika}, {business.district}</span>
                        </div>
                        <div className="w-0.5 h-0.5 bg-gray-300 rounded-full" />
                        <span className="text-gray-400">{business.reviewCount} Reviews</span>

                        {/* Features - Desktop Only */}
                        <div className="hidden md:flex items-center gap-1.5 ml-auto">
                            {business.features.slice(0, 2).map((feature, i) => (
                                <span key={i} className="bg-gray-100 px-1.5 py-0.5 rounded text-[9px] text-gray-600">
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
