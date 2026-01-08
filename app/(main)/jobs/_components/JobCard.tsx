"use client";
import { MapPin, Clock } from "lucide-react";
import { JobResponse, EmploymentType } from "@/types/api/job";
import { useUser } from "@/hooks/useUser";

interface JobCardProps {
    job: JobResponse;
    onClick: () => void;
}

// Helper functions for formatting
function formatSalary(amount: number | null, isNegotiable: boolean): string {
    if (!amount) return isNegotiable ? "Negotiable" : "Not Specified";
    return `NPR ${amount.toLocaleString()}${isNegotiable ? " (Neg.)" : ""}`;
}

function formatEmploymentType(type: EmploymentType): string {
    const typeMap: Record<EmploymentType, string> = {
        FULL_TIME: "Full-time",
        PART_TIME: "Part-time",
        CONTRACT: "Contract",
        FREELANCE: "Freelance",
        DAILY_WAGE: "Daily Wage",
        TEMPORARY: "Temporary"
    };
    return typeMap[type] || type;
}

function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

export function JobCard({ job, onClick }: JobCardProps) {
    const { user } = useUser();
    const isPostedByMe = job.poster.id === user?.id;
    const isLocal = true; // Always true since filtered by geography

    return (
        <div
            onClick={onClick}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
            {isPostedByMe && (
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
            )}

            <div className="flex md:items-center gap-5">


                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-2">
                        <div>
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                {job.title}

                                <span className={`px-1.5 py-0.5
                                ${job.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"} text-white text-[10px] uppercase font-bold rounded-md`}>{job.status == "ACTIVE" ? "Open" : "Closed"}</span>

                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-0.5">
                                <span className="font-medium text-gray-900">{job.poster.name}</span>
                                {isLocal && <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-[10px] uppercase font-bold rounded-md">Verified Neighbor</span>}
                            </div>
                        </div>
                        <div className="text-xs font-medium text-gray-400 whitespace-nowrap hidden md:block">
                            {formatRelativeTime(job.createdAt)}
                        </div>
                    </div>

                    {/* Grid Details */}
                    <div className="grid grid-cols-2 md:flex md:items-center gap-y-2 gap-x-4 text-xs font-medium text-gray-500 mb-3">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            {job.palika}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-900 font-bold">
                            {formatSalary(job.salaryAmount, job.isNegotiable)}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {formatEmploymentType(job.employmentType)}
                        </div>
                    </div>

                    {/* Mobile Timestamp */}
                    <div className="text-xs font-medium text-gray-400 mt-1 md:hidden">
                        {formatRelativeTime(job.createdAt)}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="hidden md:block">
                    {isPostedByMe ? (
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

            {/* Mobile Footer with Button */}
            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-end md:hidden">
                <button className="text-xs font-bold text-blue-600">
                    {isPostedByMe ? "Manage Post" : "View Details"} &rarr;
                </button>
            </div>
        </div>
    );
}
