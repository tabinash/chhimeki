"use client";

import { X, CheckCircle, Share2, ShieldCheck, MessageCircle, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getChatUrl } from "@/lib/chatUtils";

interface Job {
    id: number;
    title: string;
    employer: string;
    location: string;
    salary: string;
    type: string;
    posted: string;
    description: string;
    image: string;
    isLocal: boolean;
    isPostedByMe: boolean;
    requirements: string[];  // Changed from optional to required
    tags: string[];
}

interface JobDetailModalProps {
    job: Job | null;
    onClose: () => void;
    onEdit?: (job: Job) => void;
}

export default function JobDetailModal({ job, onClose, onEdit }: JobDetailModalProps) {
    const router = useRouter();

    if (!job) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 relative">

                {/* Header Image & Close */}
                <div className="relative h-48 bg-gray-100">
                    <Image src={job.image} alt={job.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/20">
                                {job.type}
                            </span>
                            {job.isLocal && (
                                <span className="px-2 py-0.5 bg-green-500/80 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-wider border border-green-400/30 flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Verified Neighbor
                                </span>
                            )}
                        </div>
                        <h2 className="text-2xl font-bold leading-tight">{job.title}</h2>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">

                    {/* Key Stats Row */}
                    <div className="flex flex-wrap gap-4 md:gap-8 pb-6 border-b border-gray-100 mb-6">
                        <div>
                            <div className="text-xs font-medium text-gray-500 mb-1">Employer</div>
                            <div className="font-bold text-gray-900">{job.employer} {job.isPostedByMe && '(You)'}</div>
                        </div>
                        <div>
                            <div className="text-xs font-medium text-gray-500 mb-1">Location</div>
                            <div className="font-bold text-gray-900 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                {job.location}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs font-medium text-gray-500 mb-1">Salary</div>
                            <div className="font-bold text-green-600">{job.salary}</div>
                        </div>
                        <div>
                            <div className="text-xs font-medium text-gray-500 mb-1">Posted</div>
                            <div className="font-bold text-gray-900">{job.posted}</div>
                        </div>
                    </div>

                    {/* Description & Requirements */}
                    <div className="space-y-6 mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">About the Role</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {job.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Requirements</h3>
                            <ul className="space-y-2">
                                {job.requirements.map((req, i) => (
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

                    {/* Action Footer - Dynamic based on Ownership */}
                    <div className="flex gap-3 pt-6 border-t border-gray-100">
                        <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-600">
                            <Share2 className="w-5 h-5" />
                        </button>
                        {job.isPostedByMe ? (
                            <>
                                <button className="flex-1 bg-gray-100 text-gray-900 font-bold text-sm rounded-xl py-3 hover:bg-gray-200 transition-colors">
                                    Mark as Closed
                                </button>
                                <button
                                    onClick={() => onEdit?.(job)}
                                    className="flex-1 bg-black text-white font-bold text-sm rounded-xl py-3 hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
                                >
                                    Edit Job
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => router.push(getChatUrl(job.id.toString(), { hideSidebar: true, source: 'job' }))}
                                    className="flex-1 bg-blue-500 text-white font-bold text-sm rounded-xl py-3 hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Message Employer
                                </button>

                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
