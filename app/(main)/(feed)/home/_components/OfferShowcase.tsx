"use client";

import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { businesses } from "@/data/mockStoreFrontData";

export default function OfferShowcase() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const offers = businesses
        .flatMap(business =>
            (business.products || []).map(product => ({
                ...product,
                businessName: business.name,
                discount: Math.floor(Math.random() * 20) + 10,
            }))
        )
        .slice(0, 10);

    const scroll = (direction: "left" | "right") => {
        scrollRef.current?.scrollBy({
            left: direction === "left" ? -260 : 260,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative">
            {/* Scroll Buttons (Desktop) */}
            <button
                onClick={() => scroll("left")}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
                           w-9 h-9 rounded-full bg-white shadow-md
                           items-center justify-center
                           text-[#0c0f14]
                           hover:text-[#577cff] hover:scale-105 transition -ml-4"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <button
                onClick={() => scroll("right")}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
                           w-9 h-9 rounded-full bg-white shadow-md
                           items-center justify-center
                           text-[#0c0f14]
                           hover:text-[#577cff] hover:scale-105 transition -mr-4"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-2 scroll-smooth hide-scrollbar"
            >
                {/* Create Offer / Story */}
                {/* Create Offer / Story */}
                <div
                    className="flex-shrink-0 w-36 h-52 rounded-2xl
               bg-gradient-to-br from-[#577cff]/15 to-[#577cff]/5
               flex flex-col items-center justify-center
               gap-3 cursor-pointer
               hover:shadow-md transition"
                >
                    {/* Icon container */}
                    <div
                        className="w-12 h-12 rounded-full
                   bg-[#0c0f14]
                   flex items-center justify-center
                   shadow"
                    >
                        <Plus className="w-6 h-6 text-white" />
                    </div>

                    <p className="text-sm font-semibold text-[#0c0f14]">
                        Create offer
                    </p>

                    <p className="text-[14px] font-medium text-[#0c0f14]/60">
                        Share with people
                    </p>
                </div>


                {/* Story / Offer Cards */}
                {offers.map(offer => (
                    <div
                        key={offer.id}
                        className="relative flex-shrink-0 w-32 h-52 rounded-2xl
                                   overflow-hidden bg-gray-200
                                   hover:shadow-lg transition group cursor-pointer"
                    >
                        {/* Image */}
                        <Image
                            src={offer.image}
                            alt={offer.name}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-[#0c0f14]/35" />

                        {/* Discount Badge (Accent Only) */}
                        <span
                            className="absolute top-2 right-2 px-2 py-0.5
                                       bg-[#ff8700] text-white
                                       text-[11px] font-bold
                                       rounded-full shadow"
                        >
                            {offer.discount}% OFF
                        </span>

                        {/* Business / Username */}
                        <div
                            className="absolute top-2 left-2 px-2 py-0.5
                                       bg-white/85 backdrop-blur
                                       rounded-full
                                       text-[11px] font-semibold
                                       text-[#0c0f14]"
                        >
                            {offer.businessName}
                        </div>

                        {/* Caption */}
                        <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white leading-snug line-clamp-2">
                                {offer.name}
                            </p>
                            <p className="text-[11px] font-medium text-white/80 mt-0.5">
                                Today only
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
