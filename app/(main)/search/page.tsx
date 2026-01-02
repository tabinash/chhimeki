
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, Search, Star, MapPin, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { suggestedUsers, peopleYouMayKnow, suggestedInstitutions, nearbyInstitutions } from "@/data/explore";
import { businesses } from "@/data/mockBusinessData";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get("q") || "";
    const [activeTab, setActiveTab] = useState<"all" | "people" | "businesses" | "institutions">("all");
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    // Combine data
    const allUsers = [...suggestedUsers, ...peopleYouMayKnow];
    const allInstitutions = [...suggestedInstitutions, ...nearbyInstitutions];

    // Static Data
    const results = {
        people: allUsers,
        businesses: businesses,
        institutions: allInstitutions
    };

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const renderSection = (title: string, data: any[], type: "people" | "businesses" | "institutions") => {
        const isExpanded = expandedSections[type];
        const displayData = isExpanded ? data : data.slice(0, 3);
        const hasMore = data.length > 3;

        return (
            <section className="mb-6">
                <div className="px-2 mb-2 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-gray-900">{title} <span className="text-gray-400 text-sm font-normal ml-1">({data.length})</span></h3>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
                    {displayData.map((item: any, i: number) => (
                        <div key={i} className="p-3 hover:bg-gray-50 transition-colors">
                            {type === "people" && (
                                <div className="flex items-center gap-3">
                                    <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover bg-gray-100" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-sm text-gray-900 truncate">{item.name}</h4>
                                        <p className="text-xs text-gray-500 truncate">{item.username}</p>
                                    </div>
                                    <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black">Follow</button>
                                </div>
                            )}

                            {type === "businesses" && (
                                <Link href={`/businesses/${item.id}`} className="flex gap-3">
                                    <img src={item.coverImage} className="w-16 h-16 rounded-xl object-cover bg-gray-100 flex-shrink-0" />
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <h4 className="font-bold text-sm text-gray-900 truncate">{item.name}</h4>
                                        <p className="text-xs text-gray-500 mb-1">{item.category}</p>
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <div className="flex items-center gap-0.5 text-yellow-500">
                                                <Star className="w-3 h-3 fill-current" />
                                                <span className="font-bold text-gray-700">{item.rating}</span>
                                            </div>
                                            <span>•</span>
                                            <span className="truncate">{item.location}</span>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {type === "institutions" && (
                                <div className="flex items-center gap-3">
                                    <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-xl object-cover bg-gray-100" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1">
                                            <h4 className="font-bold text-sm text-gray-900 truncate">{item.name}</h4>
                                            {item.verified && <CheckCircle2 className="w-3 h-3 text-blue-500" />}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <span>{item.type}</span>
                                            <span>•</span>
                                            <div className="flex items-center gap-0.5 text-blue-600">
                                                <MapPin className="w-3 h-3" />
                                                <span>{item.location || "Local"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 border border-blue-100 text-blue-600 bg-blue-50/50 rounded-lg">
                                        <ChevronDown className="w-4 h-4 -rotate-90" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {hasMore && (
                        <button
                            onClick={() => toggleSection(type)}
                            className="w-full py-3 text-xs font-semibold text-blue-600 flex items-center justify-center gap-1 hover:bg-gray-50 transition-colors"
                        >
                            {isExpanded ? "Show Less" : "See All"}
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                    )}
                </div>
            </section>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white border-b border-gray-100">
                <div className="flex items-center gap-3 p-4">
                    <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-50">
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            defaultValue={query}
                            className="w-full bg-gray-100 h-10 rounded-xl pl-10 pr-4 text-sm font-medium focus:outline-none"
                            placeholder="Search..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    router.push(`/ search ? q = ${encodeURIComponent(e.currentTarget.value)} `);
                                }
                            }}
                            readOnly
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex px-4 gap-6 overflow-x-auto no-scrollbar">
                    {["all", "people", "businesses", "institutions"].map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-3 text-[400] font-bold capitalize whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400"
                                } `}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6">
                {(activeTab === "all" || activeTab === "people") && renderSection("People", results.people, "people")}
                {(activeTab === "all" || activeTab === "businesses") && renderSection("Businesses", results.businesses, "businesses")}
                {(activeTab === "all" || activeTab === "institutions") && renderSection("Institutions", results.institutions, "institutions")}
            </div>
        </div>
    );
}

