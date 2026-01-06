"use client";
import { CheckCircle2, ChevronLeft, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { businesses } from "@/data/mockBusinessData";

export default function ExploreBusinessesPage() {
    return (
        <div className="pb-20 bg-white min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                <Link href="/explore" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </Link>
                <h1 className="text-lg font-bold text-gray-900">Popular Businesses</h1>
            </div>

            <div className="divide-y divide-gray-100">
                {businesses.map((business) => (
                    <Link href={`/businesses/${business.id}`} key={business.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 relative flex-shrink-0 border border-gray-100">
                            <img
                                src={business.coverImage}
                                alt={business.name}
                                className="w-full h-full object-cover"
                            />
                            {business.isOpen && (
                                <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-white shadow-sm" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-sm mb-0.5">{business.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className="font-medium">{business.category}</span>
                                <span>•</span>
                                <div className="flex items-center gap-0.5 text-yellow-500 font-bold">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span>{business.rating}</span>
                                </div>
                            </div>
                        </div>
                        <button className="px-5 py-2 border border-gray-200 text-gray-900 font-semibold text-xs rounded-lg hover:bg-gray-50 transition-colors">
                            View
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
}
