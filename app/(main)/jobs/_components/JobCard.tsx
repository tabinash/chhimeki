"use client";
import { MapPin, DollarSign, Clock } from "lucide-react";
import Image from "next/image";

interface Job {
    id: number;
    title: string;
    employer: string;
    location: string;
    salary: string;
    type: string;
    posted: string;
    image: string;
    isLocal: boolean;
    isPostedByMe: boolean;
    tags: string[];
}

interface JobCardProps {
    job: Job;
    onClick: () => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
            {job.isPostedByMe && (
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
            )}

            <div className="flex md:items-center gap-5">
                {/* Image/Avatar */}
                <div className="w-16 h-16 rounded-xl bg-gray-100 relative overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image src={job.image} alt={job.title} fill className="object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-2">
                        <div>
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                {job.title}
                                {job.isPostedByMe && (
                                    <span className="px-1.5 py-0.5 bg-orange-500 text-white text-[10px] uppercase font-bold rounded-md">You</span>
                                )}
                            </h3>
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
                    {job.isPostedByMe ? (
                        <button className="px-5 py-2 rounded-xl bg-gray-100 text-gray-900 text-sm font-bold hover:bg-gray-200 transition-colors">
                            Manage
                        </button>
                    ) : (
                        <button className="px-5 py-2 rounded-xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm">
                            View Details
                        </button>
                    )}
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
                    {job.isPostedByMe ? "Manage Post" : "View Details"} &rarr;
                </button>
            </div>
        </div>
    );
}
