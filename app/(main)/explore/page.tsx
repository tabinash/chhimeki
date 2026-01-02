"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
    MapPin,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    suggestedUsers,
    suggestedInstitutions,
    nearbyInstitutions,
} from "@/data/explore";
import { businesses } from "@/data/mockBusinessData";

/* -------------------- Types -------------------- */
type ScrollDirection = "left" | "right";

interface ScrollButtonProps {
    direction: ScrollDirection;
    onClick: () => void;
}

/* -------------------- Scroll Button -------------------- */
const ScrollButton: React.FC<ScrollButtonProps> = ({
    direction,
    onClick,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`hidden md:flex absolute top-1/2 -translate-y-1/2 z-10
        bg-white/90 border  border-gray-300 border-gray-200 shadow-md
        rounded-full p-1.5 hover:bg-gray-100 transition
        ${direction === "left" ? "left-2" : "right-2"}`}
            aria-label={`Scroll ${direction}`}
        >
            {direction === "left" ? (
                <ChevronLeft className="w-4 h-4 text-gray-700" />
            ) : (
                <ChevronRight className="w-4 h-4 text-gray-700" />
            )}
        </button>
    );
};

/* -------------------- Page -------------------- */
const ExplorePage: React.FC = () => {
    const peopleRef = useRef<HTMLDivElement | null>(null);
    const orgRef = useRef<HTMLDivElement | null>(null);
    const businessRef = useRef<HTMLDivElement | null>(null);

    const scroll = (
        ref: React.RefObject<HTMLDivElement | null>,
        direction: ScrollDirection
    ): void => {
        if (!ref.current) return;

        ref.current.scrollBy({
            left: direction === "left" ? -260 : 260,
            behavior: "smooth",
        });
    };

    return (
        <div className="pb-8 bg-white">
            {/* Header */}
            <div className="p-4">
                <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
            </div>

            {/* ================= Suggested People ================= */}
            <section className="mb-6">
                <div className="flex justify-between px-4 mb-3">
                    <h2 className="text-base font-bold">Suggested People</h2>
                    <Link
                        href="/explore/people"
                        className="text-xs text-blue-600 font-semibold uppercase"
                    >
                        See All
                    </Link>
                </div>

                <div className="relative">
                    <ScrollButton
                        direction="left"
                        onClick={() => scroll(peopleRef, "left")}
                    />
                    <ScrollButton
                        direction="right"
                        onClick={() => scroll(peopleRef, "right")}
                    />

                    <div
                        ref={peopleRef}
                        className="flex gap-3 overflow-x-auto px-4 pb-4
              snap-x snap-mandatory no-scrollbar"
                    >
                        {suggestedUsers.map((user) => (
                            <div
                                key={user.username}
                                className="snap-start flex-shrink-0 w-[140px]
                  bg-white border  border-gray-300 rounded-2xl p-3 text-center shadow-sm"
                            >
                                <div className="relative w-16 h-16 mx-auto">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                    {user.verified && (
                                        <span className="absolute bottom-0 right-0
                      bg-blue-500 rounded-full p-1">
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        </span>
                                    )}
                                </div>
                                <h3 className="mt-2 text-sm font-semibold truncate">
                                    {user.name}
                                </h3>
                                <p className="text-[10px] text-gray-500 truncate">
                                    {user.username}
                                </p>
                                <button className="mt-2 w-full py-1.5 text-xs font-bold
                  bg-blue-50 text-blue-600 rounded-lg">
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= Organizations ================= */}
            <section className="mb-6">
                <div className="flex justify-between px-4 mb-3">
                    <h2 className="text-base font-bold">Organizations</h2>
                    <Link
                        href="/explore/organizations"
                        className="text-xs text-blue-600 font-semibold uppercase"
                    >
                        See All
                    </Link>
                </div>

                <div className="relative">
                    <ScrollButton
                        direction="left"
                        onClick={() => scroll(orgRef, "left")}
                    />
                    <ScrollButton
                        direction="right"
                        onClick={() => scroll(orgRef, "right")}
                    />

                    <div
                        ref={orgRef}
                        className="flex gap-3 overflow-x-auto px-4
              snap-x snap-mandatory no-scrollbar"
                    >
                        {suggestedInstitutions.map((inst) => (
                            <div
                                key={inst.name}
                                className="snap-center w-[240px] flex-shrink-0
                  bg-white border  border-gray-300 rounded-2xl shadow-sm overflow-hidden"
                            >
                                <div className="h-20 bg-gray-100 relative">
                                    <span className="absolute -bottom-5 left-4 text-3xl">
                                        {inst.icon}
                                    </span>
                                </div>
                                <div className="pt-7 px-4 pb-4">
                                    <h3 className="font-bold">{inst.name}</h3>
                                    <p className="text-xs text-gray-500">{inst.type}</p>
                                    <button className="mt-2 px-3 py-1.5 text-xs font-bold
                    bg-blue-600 text-white rounded-lg">
                                        Follow
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= Popular Businesses ================= */}
            <section className="mb-6">
                <div className="flex justify-between px-4 mb-3">
                    <h2 className="text-base font-bold">Popular Businesses</h2>
                    <Link
                        href="/explore/businesses"
                        className="text-xs text-blue-600 font-semibold uppercase"
                    >
                        See All
                    </Link>
                </div>

                <div className="relative">
                    <ScrollButton
                        direction="left"
                        onClick={() => scroll(businessRef, "left")}
                    />
                    <ScrollButton
                        direction="right"
                        onClick={() => scroll(businessRef, "right")}
                    />

                    <div
                        ref={businessRef}
                        className="flex gap-4 overflow-x-auto px-4 pb-4
              snap-x snap-mandatory no-scrollbar"
                    >
                        {businesses.slice(0, 5).map((business) => (
                            <Link
                                key={business.id}
                                href={`/businesses/${business.id}`}
                                className="snap-center w-[220px] flex-shrink-0
                  bg-white border  border-gray-300  rounded-2xl shadow-sm overflow-hidden"
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
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= Nearby ================= */}
            <section className="px-4">
                <h2 className="text-base font-bold mb-4">Nearby</h2>
                <div className="space-y-3">
                    {nearbyInstitutions.map((place) => (
                        <div
                            key={place.name}
                            className="flex items-center gap-3 p-3
                bg-white border  border-gray-300 rounded-2xl shadow-sm"
                        >
                            <img
                                src={place.avatar}
                                alt={place.name}
                                className="w-12 h-12 rounded-xl object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold truncate">
                                    {place.name}
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <MapPin className="w-3 h-3 text-blue-600" />
                                    {place.location}
                                </div>
                            </div>
                            <button className="px-3 py-1.5 text-xs border  border-gray-300 rounded-lg">
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ExplorePage;
