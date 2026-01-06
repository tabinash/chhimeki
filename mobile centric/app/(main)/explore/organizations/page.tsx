"use client";
import { CheckCircle2, ChevronLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { nearbyInstitutions, suggestedInstitutions } from "@/data/explore";

export default function ExploreOrganizationsPage() {
    const allOrgs = [...suggestedInstitutions, ...nearbyInstitutions];

    return (
        <div className="pb-20 bg-white min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                <Link href="/explore" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </Link>
                <h1 className="text-lg font-bold text-gray-900">Organizations</h1>
            </div>

            <div className="divide-y divide-gray-100">
                {allOrgs.map((org: any, index) => (
                    <div key={index} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 relative flex-shrink-0">
                            <img
                                src={org.avatar}
                                alt={org.name}
                                className="w-full h-full object-cover"
                            />
                            {org.verified && (
                                <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                    <CheckCircle2 className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-sm mb-0.5">{org.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{org.type}</span>
                                {org.location && (
                                    <>
                                        <span>•</span>
                                        <div className="flex items-center gap-0.5 text-blue-600">
                                            <MapPin className="w-3 h-3" />
                                            <span>{org.location}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <button className="px-5 py-2 border border-gray-200 text-gray-900 font-semibold text-xs rounded-lg hover:bg-gray-50 transition-colors">
                            View
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
