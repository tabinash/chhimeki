import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";

interface JobCardProps {
    job: {
        id: number;
        title: string;
        employer: string;
        location: string;
        salary: string;
        type: string;
        posted: string;
        image: string;
        isPostedByMe: boolean;
    };
}

export default function JobCard({ job }: JobCardProps) {
    return (
        <Link
            href={`/jobs/${job.id}`}
            className="block bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform relative overflow-hidden"
        >
            {/* Blue Accent for Own Posts */}
            {job.isPostedByMe && (
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
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
                        <div className="flex items-center gap-1 font-bold text-black">
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
    );
}
