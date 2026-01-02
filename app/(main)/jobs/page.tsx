"use client";

import { Search, MapPin, Briefcase, DollarSign, Clock, Filter, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { jobCategories, jobs } from "@/data/mockJobsData";
import { useState } from 'react';

export default function JobsPage() {
    const [viewMode, setViewMode] = useState<'seeking' | 'hiring'>('seeking');

    const filteredJobs = viewMode === 'hiring'
        ? jobs.filter(job => job.isPostedByMe)
        : jobs;

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24">
            {/* Mobile Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Neighborhood Jobs</h1>
                        <p className="text-xs text-gray-500">Find work nearby</p>
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
                        onClick={() => setViewMode('seeking')}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === 'seeking'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500'
                            }`}
                    >
                        Find Work
                    </button>
                    <button
                        onClick={() => setViewMode('hiring')}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === 'hiring'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500'
                            }`}
                    >
                        Hiring
                    </button>
                </div>

                {/* Search Bar */}
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={viewMode === 'hiring' ? "Search your posts..." : "Search jobs..."}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                        />
                    </div>
                    {viewMode === 'seeking' && (
                        <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Categories Pills (Horizontal Scroll) */}
                {viewMode === 'seeking' && (
                    <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
                        {jobCategories.map((cat, i) => (
                            <button key={i} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
                                {cat.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Job Listings */}
            <div className="p-4 space-y-3">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <Link
                            href={`/jobs/${job.id}`}
                            key={job.id}
                            className="block bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform relative overflow-hidden"
                        >
                            {/* Blue Accent for Own Posts */}
                            {job.isPostedByMe && (
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                            )}

                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-lg bg-gray-100 relative overflow-hidden flex-shrink-0 border border-gray-50">
                                    <Image src={job.image} alt={job.title} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 truncate pr-2">
                                        {job.title}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                                        <span className="font-medium text-gray-900 truncate max-w-[120px]">{job.employer}</span>
                                        <span>•</span>
                                        <span className="truncate">{job.posted}</span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500">
                                        <div className="flex items-center gap-1 font-bold text-blue-600">
                                            {job.salary}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {job.type}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-16">
                        <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Briefcase className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">No jobs found</h3>
                        <p className="text-gray-500 text-xs mt-1 mb-4">
                            {viewMode === 'hiring' ? "You haven't posted any jobs yet." : "No jobs match your search."}
                        </p>
                        {viewMode === 'hiring' && (
                            <Link
                                href="/jobs/new"
                                className="px-5 py-2 inline-flex bg-blue-600 text-white rounded-xl text-xs font-bold"
                            >
                                Post a Job
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
