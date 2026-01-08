"use client";

import { Search, Briefcase, Filter, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import JobCard from "./_components/JobCard";
import { useBrowseJobs, useMyJobs } from "./_hook";
import { useUser } from "@/hooks/useUser";
import { JobCategory } from "@/types/api/job";

// Category options matching API JobCategory type
const JOB_CATEGORIES: { label: string; value: JobCategory | undefined }[] = [
    { label: "All", value: undefined },
    { label: "Construction", value: "CONSTRUCTION" },
    { label: "Domestic Help", value: "DOMESTIC_HELP" },
    { label: "Driving", value: "DRIVING" },
    { label: "Teaching", value: "TEACHING" },
    { label: "IT & Tech", value: "IT_TECHNOLOGY" },
    { label: "Sales", value: "SALES_MARKETING" },
    { label: "Healthcare", value: "HEALTHCARE" },
    { label: "Delivery", value: "DELIVERY" },
    { label: "Others", value: "OTHERS" },
];

export default function JobsPage() {
    const [viewMode, setViewMode] = useState<"All" | "My Jobs">("All");
    const [selectedCategory, setSelectedCategory] = useState<JobCategory | undefined>(undefined);

    // Get current user for geography and ownership check
    const { user, isLoading: isUserLoading } = useUser();

    // Browse jobs query - uses user's palika as geography
    const {
        data: browseData,
        isLoading: isBrowseLoading,
        error: browseError,
    } = useBrowseJobs(user?.palika || "", {
        category: selectedCategory,
    });

    // My jobs query - for "My Jobs" tab
    const {
        data: myJobsData,
        isLoading: isMyJobsLoading,
    } = useMyJobs(user?.id || 0);

    // Determine which data to show based on view mode
    const jobs = viewMode === "My Jobs"
        ? myJobsData?.data || []
        : browseData?.data || [];

    const isLoading = isUserLoading || (viewMode === "My Jobs" ? isMyJobsLoading : isBrowseLoading);

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24">
            {/* Mobile Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Neighborhood Jobs</h1>
                        <p className="text-xs text-gray-500">
                            {user?.palika ? `Jobs in ${user.palika}` : "Find work nearby"}
                        </p>
                    </div>
                    <Link
                        href="/jobs/new"
                        className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Post Job</span>
                    </Link>
                </div>

                {/* Navigation Tabs */}
                <div className="flex p-1 bg-gray-100 rounded-xl mb-4">
                    <button
                        onClick={() => {
                            setViewMode("All");
                            setSelectedCategory(undefined);
                        }}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === "All"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500"
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setViewMode("My Jobs")}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === "My Jobs"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500"
                            }`}
                    >
                        My Jobs
                    </button>
                </div>

                {/* Search Bar */}
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={viewMode === "My Jobs" ? "Search your posts..." : "Search jobs..."}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                        />
                    </div>
                    {viewMode === "All" && (
                        <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Categories Pills (Horizontal Scroll) */}
                {viewMode === "All" && (
                    <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
                        {JOB_CATEGORIES.map((cat) => (
                            <button
                                key={cat.label}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${selectedCategory === cat.value
                                    ? "bg-black text-white"
                                    : "bg-white border border-gray-200 text-gray-600"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                )}

                {/* Error State */}
                {browseError && viewMode === "All" && (
                    <div className="text-center py-16">
                        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Briefcase className="w-6 h-6 text-red-400" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">Failed to load jobs</h3>
                        <p className="text-gray-500 text-xs mt-1">{browseError.message}</p>
                    </div>
                )}

                {/* Job Listings */}
                {!isLoading && !browseError && (
                    <>
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    isOwner={job.poster.id === user?.id}
                                />
                            ))
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Briefcase className="w-6 h-6 text-gray-400" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">No jobs found</h3>
                                <p className="text-gray-500 text-xs mt-1 mb-4">
                                    {viewMode === "My Jobs"
                                        ? "You haven't posted any jobs yet."
                                        : "No jobs match your search."}
                                </p>
                                {viewMode === "My Jobs" && (
                                    <Link
                                        href="/jobs/new"
                                        className="px-5 py-2 inline-flex bg-blue-600 text-white rounded-xl text-xs font-bold"
                                    >
                                        Post a Job
                                    </Link>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
