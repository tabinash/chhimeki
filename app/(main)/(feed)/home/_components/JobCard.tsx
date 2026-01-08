"use client";
import { MapPin, DollarSign, Clock, Briefcase } from "lucide-react";
import Image from "next/image";

interface Job {
    id: number;
    title: string;
    employer: string;
    location: string;
    salary: string;
    type: string;
    image: string;
}

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    return (
        <div className="flex-shrink-0 w-72 bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer group shadow-sm">
            <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 relative overflow-hidden flex-shrink-0">
                    <Image src={job.image} alt={job.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                        {job.title}
                    </h4>
                    <p className="text-xs text-gray-600 font-medium">{job.employer}</p>
                </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-green-600">
                    <DollarSign className="h-3 w-3" />
                    <span className="truncate">{job.salary}</span>
                </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {job.type}
                </span>
                <button className="text-xs font-bold text-blue-600 hover:underline">
                    View Details →
                </button>
            </div>
        </div>
    );
}
