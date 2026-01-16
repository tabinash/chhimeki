"use client";

import { useState } from "react";
import { Search, MapPin, Phone, Star, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

// Service categories with icons (using emoji for simplicity)
const SERVICE_CATEGORIES = [
    { id: "all", label: "All", icon: "🏠" },
    { id: "micro", label: "Micro", icon: "🚐" },
    { id: "hotel", label: "Hotels", icon: "🏨" },
    { id: "barber", label: "Barber", icon: "💈" },
    { id: "beauty", label: "Beauty Parlor", icon: "💅" },
    { id: "restaurant", label: "Restaurant", icon: "🍽️" },
    { id: "pharmacy", label: "Pharmacy", icon: "💊" },
    { id: "repair", label: "Repair", icon: "🔧" },
    { id: "grocery", label: "Grocery", icon: "🛒" },
];

// Mock services data
const MOCK_SERVICES = [
    {
        id: 1,
        name: "Baneshwor Micro Service",
        category: "micro",
        description: "Daily micro bus service to Ratnapark, Kalanki, and Koteshwor",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
        rating: 4.5,
        reviewCount: 128,
        phone: "9801234567",
        address: "Baneshwor Chowk",
        timing: "6:00 AM - 8:00 PM",
        isOpen: true,
    },
    {
        id: 2,
        name: "New Style Barber Shop",
        category: "barber",
        description: "Professional haircuts, shaving, and grooming services",
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop",
        rating: 4.8,
        reviewCount: 256,
        phone: "9812345678",
        address: "Near Bus Stop",
        timing: "9:00 AM - 7:00 PM",
        isOpen: true,
    },
    {
        id: 3,
        name: "Hotel Sunrise",
        category: "hotel",
        description: "Comfortable rooms with AC, WiFi, and breakfast included",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
        rating: 4.2,
        reviewCount: 89,
        phone: "9823456789",
        address: "Main Road",
        timing: "24 Hours",
        isOpen: true,
    },
    {
        id: 4,
        name: "Glamour Beauty Parlor",
        category: "beauty",
        description: "Facial, makeup, hair styling, bridal packages available",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
        rating: 4.6,
        reviewCount: 312,
        phone: "9834567890",
        address: "2nd Floor, Shopping Complex",
        timing: "10:00 AM - 8:00 PM",
        isOpen: false,
    },
    {
        id: 5,
        name: "Nepali Kitchen",
        category: "restaurant",
        description: "Authentic Nepali cuisine, dal bhat, momos, and thali sets",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
        rating: 4.4,
        reviewCount: 445,
        phone: "9845678901",
        address: "Corner Shop",
        timing: "7:00 AM - 9:00 PM",
        isOpen: true,
    },
    {
        id: 6,
        name: "Health Plus Pharmacy",
        category: "pharmacy",
        description: "All medicines, health products, and free BP check",
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop",
        rating: 4.7,
        reviewCount: 178,
        phone: "9856789012",
        address: "Opposite Hospital",
        timing: "8:00 AM - 10:00 PM",
        isOpen: true,
    },
];

export default function ServicesPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useUser();

    const filteredServices = MOCK_SERVICES.filter((service) => {
        const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
                <div className="px-4 pt-4 pb-3">
                    <div className="flex items-center justify-between mb-1">
                        <h1 className="text-2xl font-bold text-gray-900">Local Services</h1>
                    </div>
                    <div className="flex items-center gap-1 text-[13px] text-gray-500 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{user?.palika || "Your Area"}</span>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-900" strokeWidth={2} />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-[#e4e1dd] rounded-xl text-[16px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                        />
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
                    {SERVICE_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors ${selectedCategory === cat.id
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Services List */}
            <div className="px-4 pt-4 space-y-3">
                {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))
                ) : (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-[16px] font-bold text-gray-900">No services found</h3>
                        <p className="text-[13px] text-gray-500 mt-1">
                            Try a different search or category
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ServiceCard({ service }: { service: typeof MOCK_SERVICES[0] }) {
    return (
        <Link
            href={`/services/${service.id}`}
            className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
            <div className="flex">
                {/* Image */}
                <div className="w-28 h-28 relative flex-shrink-0">
                    <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                    />
                    {/* Open/Closed Badge */}
                    <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${service.isOpen
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                        }`}>
                        {service.isOpen ? "Open" : "Closed"}
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 p-3 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-gray-900 text-[15px] line-clamp-1">
                            {service.name}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>

                    <p className="text-[12px] text-gray-500 line-clamp-2 mt-0.5 mb-2">
                        {service.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-1.5">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-[13px] font-bold text-gray-900">{service.rating}</span>
                        <span className="text-[12px] text-gray-500">({service.reviewCount})</span>
                    </div>

                    {/* Timing */}
                    <div className="flex items-center gap-1 text-[12px] text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{service.timing}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
