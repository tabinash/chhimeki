import { Business } from "@/data/mockBusinessData";
import { MapPin, Star, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BusinessCardProps {
    business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
    return (
        <Link
            href={`/businesses/${business.id}`}
            className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-gray-200"
        >
            {/* Cover Image */}
            <div className="relative h-32 bg-gray-100">
                <Image src={business.coverImage} alt={business.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide backdrop-blur-md shadow-sm ${business.isOpen
                            ? "bg-green-500/90 text-white"
                            : "bg-gray-900/80 text-white"
                        }`}>
                        {business.isOpen ? "Open Now" : "Closed"}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 relative">
                {/* Avatar Overlap */}
                <div className="absolute -top-6 left-4">
                    <div className="w-12 h-12 rounded-xl border-2 border-white shadow-md overflow-hidden bg-white">
                        <Image src={business.avatar} alt={business.name} fill className="object-cover" />
                    </div>
                </div>

                <div className="mt-7">
                    <div className="flex justify-between items-start mb-1">
                        <div>
                            <h3 className="font-bold text-gray-900 truncate pr-2 group-hover:text-blue-600 transition-colors">
                                {business.name}
                            </h3>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-medium">
                                    {business.category}
                                </span>
                                <span>•</span>
                                <MapPin className="w-3 h-3" />
                                <span className="truncate max-w-[100px]">{business.location}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-1 rounded-lg">
                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-bold text-gray-700">{business.rating}</span>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                        {business.description}
                    </p>

                    {/* Footer features */}
                    <div className="mt-4 pt-3 border-t border-gray-50 flex items-center gap-2 overflow-hidden">
                        {business.features.slice(0, 2).map((feature, i) => (
                            <span key={i} className="text-[10px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}
