import Link from "next/link";
import { JobResponse } from "@/types/api/job";

interface JobCardProps {
    job: JobResponse;
    isOwnProfile: boolean;
}

export default function JobCard({ job, isOwnProfile }: JobCardProps) {
    const getRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return "Today";
        if (diffInDays === 1) return "Yesterday";
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    };

    const formatEmploymentType = (type: string) =>
        type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    const formatSalary = (amount: number | null, isNegotiable: boolean) => {
        if (amount === null) return isNegotiable ? "Negotiable" : null;
        const formatted = `Rs. ${amount.toLocaleString()}`;
        return isNegotiable ? `${formatted} (Negotiable)` : formatted;
    };

    const salaryDisplay = formatSalary(job.salaryAmount, job.isNegotiable);

    return (
        <div className="p-4 bg-white">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                    <h4 className="text-[16px] font-bold text-gray-900 truncate">
                        {job.title}
                    </h4>

                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[13px] font-medium text-gray-600 truncate">
                            {job.poster.name}
                        </span>

                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[11px] font-semibold">
                            {formatEmploymentType(job.employmentType)}
                        </span>

                        {job.status === "FILLED" && (
                            <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-[11px] font-semibold">
                                FILLED
                            </span>
                        )}

                        {job.status === "CLOSED" && (
                            <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-[11px] font-semibold">
                                CLOSED
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-2 mt-3 flex-wrap text-[13px] text-gray-500">
                {salaryDisplay && (
                    <>
                        <span className="text-[14px] font-medium text-gray-900">
                            {salaryDisplay}
                        </span>
                        <span>•</span>
                    </>
                )}
                <span>{getRelativeTime(job.createdAt)}</span>
                <span>•</span>
                <span>{job.palika}</span>
            </div>

            {/* Action */}
            <div className="mt-4">
                <Link
                    href={`/jobs/${job.id}`}
                    className="block w-full py-2.5 bg-blue-500 text-white rounded-lg text-[14px] font-medium text-center hover:bg-blue-600 transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
