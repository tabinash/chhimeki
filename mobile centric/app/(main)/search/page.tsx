
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, Search, Star, MapPin, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { suggestedUsers, peopleYouMayKnow, suggestedInstitutions, nearbyInstitutions, groups } from "@/data/explore";
import { businesses } from "@/data/mockBusinessData";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get("q") || "";
    const [activeTab, setActiveTab] = useState<"all" | "people" | "businesses" | "institutions" | "groups">("all");
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    // Combine data
    const allUsers = [...suggestedUsers, ...peopleYouMayKnow];
    const allInstitutions = [...suggestedInstitutions, ...nearbyInstitutions];

    // Static Data
    const results = {
        people: allUsers,
        businesses: businesses,
        institutions: allInstitutions,
        groups: groups
    };

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const renderSection = (title: string, data: any[], type: "people" | "businesses" | "institutions" | "groups") => {
        const isExpanded = expandedSections[type];
        const displayData = isExpanded ? data : data.slice(0, 3);
        const hasMore = data.length > 3;

        if (data.length === 0) return null;

        return (
            <section className=" pt-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="px-4 mb-2 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-gray-900">{title} <span className="text-gray-400 text-sm font-normal ml-1">({data.length})</span></h3>
                </div>

                <div className="bg-white  divide-y divide-gray-100">
                    {displayData.map((item: any, i: number) => (
                        <div key={i} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                            {type === "people" && (
                                <div className="flex items-center gap-3">
                                    <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover bg-gray-100" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-[15px] text-gray-900 truncate">{item.name}</h4>
                                        <p className="text-sm text-gray-500 truncate">{item.username}</p>
                                    </div>
                                    <button className="px-4 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black">Follow</button>
                                </div>
                            )}

                            {type === "businesses" && (
                                <Link href={`/businesses/${item.id}`} className="flex gap-4">
                                    <img src={item.coverImage} className="w-20 h-20 rounded-xl object-cover bg-gray-100 flex-shrink-0" />
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <h4 className="font-bold text-[15px] text-gray-900 truncate">{item.name}</h4>
                                        <p className="text-xs text-gray-500 mb-1.5">{item.category}</p>
                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                <Star className="w-3.5 h-3.5 fill-current" />
                                                <span className="font-bold text-gray-700">{item.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="truncate">{item.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {type === "groups" && (
                                <div className="flex items-center gap-3">
                                    <img src={item.avatar} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-gray-100" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-[15px] text-gray-900 truncate">{item.name}</h4>
                                        <p className="text-xs text-gray-500 truncate mb-1">{item.description}</p>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                                            <span>{item.members}</span>
                                        </div>
                                    </div>
                                    <button className="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100">Join</button>
                                </div>
                            )}

                            {type === "institutions" && (
                                <div className="flex items-center gap-3">
                                    <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-gray-100" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1">
                                            <h4 className="font-bold text-[15px] text-gray-900 truncate">{item.name}</h4>
                                            {item.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                            <span>{item.type}</span>
                                            <span>•</span>
                                            <div className="flex items-center gap-1 text-blue-600">
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
                        <div className="p-2">
                            <button
                                onClick={() => toggleSection(type)}
                                className="w-full py-3 text-sm font-semibold text-blue-600 flex items-center justify-center gap-1 hover:bg-gray-50 transition-colors rounded-xl"
                            >
                                {isExpanded ? "Show Less" : "See All"}
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                        </div>
                    )}
                </div>
                <div className="h-2 bg-gray-50"></div>
            </section>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white border-b border-gray-100 mb-2">
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
                            placeholder="Search people, businesses, groups..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    router.push(`/search?q=${encodeURIComponent(e.currentTarget.value)}`);
                                }
                            }}
                            readOnly
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex px-4 gap-6 overflow-x-auto no-scrollbar">
                    {["all", "people", "businesses", "groups", "institutions"].map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-3 text-[15px] font-bold capitalize whitespace-nowrap border-b-2 transition-colors cursor-pointer ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400"
                                } `}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="bg-white min-h-screen">
                {(activeTab === "all" || activeTab === "people") && renderSection("People", results.people, "people")}
                {(activeTab === "all" || activeTab === "businesses") && renderSection("Businesses", results.businesses, "businesses")}
                {(activeTab === "all" || activeTab === "groups") && renderSection("Groups", results.groups, "groups")}
                {(activeTab === "all" || activeTab === "institutions") && renderSection("Institutions", results.institutions, "institutions")}
            </div>
        </div>
    );
}

