"use client";
import { Search, MapPin, Briefcase, DollarSign, Clock, Building2, Filter, Phone, Star } from "lucide-react";
import Image from "next/image";

const jobCategories = [
    { name: "All", count: 156 },
    { name: "Household Help", count: 42 },
    { name: "Driver / Delivery", count: 28 },
    { name: "Sales / Shop", count: 35 },
    { name: "Education", count: 18 },
    { name: "Construction", count: 12 },
    { name: "Office Admin", count: 21 },
];

const jobs = [
    {
        id: 1,
        title: "Housekeeper / Cook Needed",
        employer: "Private Home",
        location: "Baneshwor, Block B",
        salary: "Rs. 15,000 / mo",
        type: "Full-time",
        posted: "2h ago",
        image: "https://images.unsplash.com/photo-1581578731117-10d52143b1e8?w=100&h=100&fit=crop", // Cleaning/Home
        isLocal: true,
        tags: ["Cooking", "Cleaning", "Urgent"],
        description: "Looking for an experienced housekeeper who can also cook Nepali meals. Must be reliable and good with kids. Working hours: 7 AM to 6 PM.",
        requirements: ["2+ years experience", "References required", "Must live nearby"]
    },
    {
        id: 2,
        title: "Shop Assistant",
        employer: "Bhatbhateni Supermarket",
        location: "Koteshwor Branch",
        salary: "Rs. 18,000 - 22,000",
        type: "Shift-based",
        posted: "5h ago",
        image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=100&h=100&fit=crop", // Retail
        isLocal: false,
        tags: ["Retail", "Customer Service"],
        description: "Join our team at the Koteshwor branch. Responsibilities include stocking shelves, helping customers, and managing the checkout counter.",
        requirements: ["SLC/SEE completed", "Basic computer knowledge", "Good communication skills"]
    },
    {
        id: 3,
        title: "Delivery Rider",
        employer: "Pathao",
        location: "Kathmandu Valley",
        salary: "Commission based",
        type: "Part-time",
        posted: "1d ago",
        image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=100&h=100&fit=crop", // Rider
        isLocal: false,
        tags: ["Bike License", "Flexible"],
        description: "Earn extra money by delivering food and packages. You choose your own hours. Valid driving license and own bike required.",
        requirements: ["Valid 2-wheeler license", "Own vehicle (Bike/Scooter)", "Smartphone with data"]
    },
    {
        id: 4,
        title: "Math Tutor (Class 8-10)",
        employer: "Local Family",
        location: "Shantinagar",
        salary: "Rs. 8,000 / mo",
        type: "Evening",
        posted: "1d ago",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&h=100&fit=crop", // Education
        isLocal: true,
        tags: ["Education", "Part-time"],
        description: "Seeking a tutor for my son in Class 9. Focus on Math and Optional Math. 1 hour per day, 6 days a week.",
        requirements: ["Bachelor in Education or Science", "Previous tutoring experience", "Patience with teenagers"]
    },
    {
        id: 5,
        title: "Electrician for Wiring",
        employer: "New Building Project",
        location: "Tinkune",
        salary: "Daily Wage",
        type: "Contract",
        posted: "3h ago",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=100&h=100&fit=crop", // Construction
        isLocal: true,
        tags: ["Skilled", "Urgent"],
        description: "Experienced electrician needed for a new residential building wiring. Contract for 2 weeks.",
        requirements: ["CTEVT certified preferred", "Own tools", "Safety conscious"]
    }
];

import { useState } from 'react';
import { X, CheckCircle, Share2, ShieldCheck } from "lucide-react";

export default function JobsPage() {
    const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

    return (
        <div className="min-h-screen p-6 md:p-8 relative">
            <div className="max-w-4xl mx-auto">
                {/* Simple Local Header */}
                <div className="mb-8 border-b border-gray-100 pb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Neighborhood Jobs</h1>
                    <p className="text-gray-500 mt-1">Find work nearby or hire a neighbor.</p>
                </div>

                {/* Search & Filter - Clean & Functional */}
                <div className="flex gap-3 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="What kind of work are you looking for?"
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors shadow-sm"
                        />
                    </div>
                    <button className="px-5 flex items-center gap-2 border border-gray-200 bg-white rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                        <Filter className="h-4 w-4" />
                        <span className="hidden sm:inline">Filters</span>
                    </button>
                    <button className="px-6 bg-black text-white font-bold rounded-xl text-sm hover:bg-gray-800 transition-colors">
                        Search
                    </button>
                </div>

                {/* Categories Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {jobCategories.map((cat, i) => (
                        <button key={i} className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${i === 0 ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Job Listings */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">Latest Opportunities</h2>

                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            onClick={() => setSelectedJob(job)}
                            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="flex md:items-center gap-5">
                                {/* Image/Avatar */}
                                <div className="w-16 h-16 rounded-xl bg-gray-100 relative overflow-hidden flex-shrink-0 border border-gray-100">
                                    <Image src={job.image} alt={job.title} fill className="object-cover" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-2">
                                        <div>
                                            <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-0.5">
                                                <span className="font-medium text-gray-900">{job.employer}</span>
                                                {job.isLocal && <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] uppercase font-bold rounded-md">Verified Neighbor</span>}
                                            </div>
                                        </div>
                                        <div className="text-xs font-medium text-gray-400 whitespace-nowrap hidden md:block">{job.posted}</div>
                                    </div>

                                    {/* Grid Details */}
                                    <div className="grid grid-cols-2 md:flex md:items-center gap-y-2 gap-x-4 text-xs font-medium text-gray-500 mb-3">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-900 font-bold">
                                            <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                                            {job.salary}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5" />
                                            {job.type}
                                        </div>
                                    </div>

                                    {/* Mobile Timestamp */}
                                    <div className="text-xs font-medium text-gray-400 mt-1 md:hidden">{job.posted}</div>
                                </div>

                                {/* Call to Action */}
                                <div className="hidden md:block">
                                    <button className="px-5 py-2 rounded-xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Footer with Tags and Button */}
                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between md:hidden">
                                <div className="flex gap-2">
                                    {job.tags.slice(0, 2).map((tag, i) => (
                                        <span key={i} className="text-[10px] font-medium bg-gray-100 px-2 py-1 rounded-md text-gray-600">{tag}</span>
                                    ))}
                                </div>
                                <button className="text-xs font-bold text-blue-600">
                                    View Details &rarr;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Job Detail Modal */}
            {selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 relative">

                        {/* Header Image & Close */}
                        <div className="relative h-48 bg-gray-100">
                            <Image src={selectedJob.image} alt={selectedJob.title} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-4 left-6 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/20">
                                        {selectedJob.type}
                                    </span>
                                    {selectedJob.isLocal && (
                                        <span className="px-2 py-0.5 bg-green-500/80 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-wider border border-green-400/30 flex items-center gap-1">
                                            <ShieldCheck className="w-3 h-3" /> Verified Neighbor
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-2xl font-bold leading-tight">{selectedJob.title}</h2>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8">

                            {/* Key Stats Row */}
                            <div className="flex flex-wrap gap-4 md:gap-8 pb-6 border-b border-gray-100 mb-6">
                                <div>
                                    <div className="text-xs font-medium text-gray-500 mb-1">Employer</div>
                                    <div className="font-bold text-gray-900">{selectedJob.employer}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-medium text-gray-500 mb-1">Location</div>
                                    <div className="font-bold text-gray-900 flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                        {selectedJob.location}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs font-medium text-gray-500 mb-1">Salary</div>
                                    <div className="font-bold text-green-600">{selectedJob.salary}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-medium text-gray-500 mb-1">Posted</div>
                                    <div className="font-bold text-gray-900">{selectedJob.posted}</div>
                                </div>
                            </div>

                            {/* Description & Requirements */}
                            <div className="space-y-6 mb-8">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">About the Role</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {selectedJob.description}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">Requirements</h3>
                                    <ul className="space-y-2">
                                        {selectedJob.requirements?.map((req, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                                                <div className="mt-1">
                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                </div>
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="flex gap-3 pt-6 border-t border-gray-100">
                                <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-600">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button className="flex-1 bg-black text-white font-bold text-sm rounded-xl py-3 hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                                    Apply Now
                                </button>
                                <button className="flex-1 border border-black text-black font-bold text-sm rounded-xl py-3 hover:bg-gray-50 transition-colors">
                                    Call Employer
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
