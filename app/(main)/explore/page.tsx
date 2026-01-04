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
    groups,
} from "@/data/explore";
import { businesses } from "@/data/mockBusinessData";
import PeopleCard from "./_components/PeopleCard";
import OrganizationCard from "./_components/OrganizationCard";
import BusinessCard from "./_components/BusinessCard";
import GroupCard from "./_components/GroupCard";

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
                            <PeopleCard key={user.username} user={user} />
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
                            <OrganizationCard key={inst.name} organization={inst} />
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
                            <BusinessCard key={business.id} business={business} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= Groups ================= */}
            <section className="px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-bold">Groups</h2>
                    <Link
                        href="/explore/groups"
                        className="text-xs text-blue-600 font-semibold uppercase"
                    >
                        See All
                    </Link>
                </div>
                <div className="space-y-3">
                    {groups.map((group) => (
                        <GroupCard key={group.id} group={group} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ExplorePage;
