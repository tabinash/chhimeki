"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, MapPin, DollarSign, Clock, ShieldCheck, Share2, MoreVertical, MessageCircle, Phone, CheckCircle, Briefcase } from "lucide-react";
import { jobs } from "@/data/mockJobsData";

export default function JobDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);
    const job = jobs.find((j) => j.id === id);

    if (!job) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
                <Briefcase className="w-12 h-12 text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Job not found</h2>
                <p className="text-gray-500 mb-6">This job post may have been removed or expired.</p>
                <button
                    onClick={() => router.back()}
                    className="px-6 py-2.5 bg-black text-white rounded-xl font-bold text-sm"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-32 relative">
            {/* Header / Nav */}
            <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                <button
                    onClick={() => router.back()}
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white pointer-events-auto hover:bg-white/30 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex gap-2 pointer-events-auto">
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full aspect-[16/9] bg-gray-100">
                <Image
                    src={job.image}
                    alt={job.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
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
                    <h1 className="text-2xl font-bold leading-tight shadow-sm">{job.title}</h1>
                </div>
            </div>

            {/* Content Container */}
            <div className="px-5 py-6">

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">Employer</div>
                        <div className="font-bold text-gray-900 text-sm truncate">{job.employer}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">Salary</div>
                        <div className="font-bold text-green-600 text-sm">{job.salary}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">Location</div>
                        <div className="font-bold text-gray-900 text-sm flex items-center gap-1 truncate">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            {job.location}
                        </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">Posted</div>
                        <div className="font-bold text-gray-900 text-sm">{job.posted}</div>
                    </div>
                </div>

                <hr className="border-gray-100 my-6" />

                {/* Description */}
                <div className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">About the Role</h3>
                    <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
                        {job.description}
                    </p>
                </div>

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                    <div className="mb-8">
                        <h3 className="font-bold text-gray-900 mb-3 text-lg">Requirements</h3>
                        <ul className="space-y-3">
                            {job.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-600">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm reading-relaxed">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Fixed Bottom Action Bar */}
            {/* Added bottom-16 class to sit above the global BottomNav (h-16) */}
            <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-200 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="max-w-md mx-auto flex gap-3">
                    {job.isPostedByMe ? (
                        <>
                            <button className="flex-1 bg-gray-100 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors">
                                Close Job
                            </button>
                            <button className="flex-1 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                                Edit Post
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="flex-1 border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" />
                                Call
                            </button>
                            <button className="flex-[2] bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                                <MessageCircle className="w-5 h-5" />
                                Apply Now
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
