import Link from "next/link";
import { JobResponse } from "@/types/api/job";

interface JobCardProps {
    job: JobResponse;
    isOwnProfile: boolean;
}

export default function JobCard({ job, isOwnProfile }: JobCardProps) {
    // Format relative time
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

    // Format employment type for display
    const formatEmploymentType = (type: string) => {
        return type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    };

    // Format salary
    const formatSalary = (amount: number | null, isNegotiable: boolean) => {
        if (amount === null) return isNegotiable ? "Negotiable" : null;
        const formatted = `Rs. ${amount.toLocaleString()}`;
        return isNegotiable ? `${formatted} (Negotiable)` : formatted;
    };

    const salaryDisplay = formatSalary(job.salaryAmount, job.isNegotiable);
    const isClosed = job.status === "CLOSED" || job.status === "FILLED";

    return (
        <div className={`p-4 bg-white ${isClosed ? "opacity-60" : ""}`}>
            <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-base truncate">{job.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-xs font-medium text-gray-600 truncate">{job.poster.name}</span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold">
                            {formatEmploymentType(job.employmentType)}
                        </span>
                        {job.status !== "ACTIVE" && (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${job.status === "FILLED" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                                }`}>
                                {job.status}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 flex-wrap">
                {salaryDisplay && (
                    <>
                        <span className="font-semibold text-black"> {salaryDisplay}</span>
                        <span>•</span>
                    </>
                )}
                <span>{getRelativeTime(job.createdAt)}</span>
                <span>•</span>
                <span>{job.palika}</span>
            </div>

            <div className="mt-3 flex gap-2">
                <Link
                    href={`/jobs/${job.id}`}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg text-xs font-bold text-center hover:bg-blue-600 transition-colors"
                >
                    View Details
                </Link>

            </div>
        </div>
    );
}
