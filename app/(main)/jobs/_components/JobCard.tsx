"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import { JobResponse } from "@/types/api/job";

interface JobCardProps {
    job: JobResponse;
    isOwner?: boolean;
}

// Format salary display
function formatSalary(amount: number | null, isNegotiable: boolean): string {
    if (amount === null || amount === 0) {
        return isNegotiable ? "Negotiable" : "Not specified";
    }
    const formatted = `Rs. ${amount.toLocaleString("en-NP")}`;
    return isNegotiable ? `${formatted} (Negotiable)` : formatted;
}

// Format employment type for display
function formatEmploymentType(type: string): string {
    const typeMap: Record<string, string> = {
        FULL_TIME: "Full-time",
        PART_TIME: "Part-time",
        CONTRACT: "Contract",
        FREELANCE: "Freelance",
        DAILY_WAGE: "Daily Wage",
        TEMPORARY: "Temporary",
    };
    return typeMap[type] || type;
}

// Format relative time from createdAt
function getRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
}

export default function JobCard({ job, isOwner }: JobCardProps) {
    return (
        <Link
            href={`/jobs/${job.id}`}
            className="block bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform relative overflow-hidden"
        >
            {/* Orange Accent for Own Posts */}
            {isOwner && (
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
            )}

            <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 relative overflow-hidden flex-shrink-0 border border-gray-50">
                    {job.poster.profileImage ? (
                        <Image src={job.poster.profileImage} alt={job.poster.name} fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-lg">
                            {job.poster.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 truncate pr-2">
                        {job.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                        <span className="font-medium text-gray-900 truncate max-w-[120px]">{job.poster.name}</span>
                        <span>•</span>
                        <span className="truncate">{getRelativeTime(job.createdAt)}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500">
                        <div className="flex items-center gap-1 font-bold text-black">
                            {formatSalary(job.salaryAmount, job.isNegotiable)}
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.palika}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatEmploymentType(job.employmentType)}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
