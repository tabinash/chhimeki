"use client";

import { Business } from "@/data/mockBusinessData";
import { MapPin, Star, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BusinessCardProps {
    business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
    return (
        <Link
            href={`/storefront/${business.id}`}
            className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform"
        >
            {/* Image */}
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                    src={business.coverImage}
                    alt={business.name}
                    fill
                    className="object-cover"
                />
                {/* Open/Closed Badge */}
                <div className="absolute bottom-1 left-1">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${business.isOpen
                            ? "bg-green-500 text-white"
                            : "bg-gray-700 text-white"
                        }`}>
                        {business.isOpen ? "Open" : "Closed"}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 py-0.5">
                {/* Title & Rating Row */}
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-sm truncate">
                        {business.name}
                    </h3>
                    <div className="flex items-center gap-0.5 bg-yellow-50 px-1.5 py-0.5 rounded flex-shrink-0">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-gray-700">{business.rating}</span>
                    </div>
                </div>

                {/* Category & Location */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                    <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-medium">
                        {business.category}
                    </span>
                    <span>•</span>
                    <div className="flex items-center gap-0.5 truncate">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{business.location}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {business.description}
                </p>

                {/* Features Tags */}
                <div className="flex items-center gap-1.5 mt-2">
                    {business.features.slice(0, 2).map((feature, i) => (
                        <span
                            key={i}
                            className="text-[10px] font-medium text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded"
                        >
                            {feature}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
