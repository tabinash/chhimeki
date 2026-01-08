"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Share2, MoreVertical, MessageCircle, Phone, Briefcase, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useJobById, useUpdateJob, useDeleteJob } from "../_hook";
import { useUser } from "@/hooks/useUser";

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

// Format category for display
function formatCategory(category: string): string {
    const categoryMap: Record<string, string> = {
        CONSTRUCTION: "Construction",
        DOMESTIC_HELP: "Domestic Help",
        DRIVING: "Driving",
        TEACHING: "Teaching",
        IT_TECHNOLOGY: "IT & Tech",
        SALES_MARKETING: "Sales & Marketing",
        HEALTHCARE: "Healthcare",
        AGRICULTURE: "Agriculture",
        HOSPITALITY: "Hospitality",
        RETAIL: "Retail",
        MANUFACTURING: "Manufacturing",
        SECURITY: "Security",
        DELIVERY: "Delivery",
        BEAUTY_WELLNESS: "Beauty & Wellness",
        OTHERS: "Others",
    };
    return categoryMap[category] || category;
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

export default function JobDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);

    // Get current user for ownership check
    const { user } = useUser();

    // Fetch job data
    const { data, isLoading, error } = useJobById(id);
    const job = data?.data;

    // Mutations
    const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();
    const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob();

    // Delete confirmation state
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Check if current user is the owner
    const isOwner = job?.poster.id === user?.id;

    // Handle status toggle
    const handleStatusToggle = () => {
        if (!job) return;
        const newStatus = job.status === "ACTIVE" ? "CLOSED" : "ACTIVE";
        updateJob(
            { jobId: job.id, data: { status: newStatus } },
            {
                onSuccess: () => {
                    // Cache will be invalidated by the hook
                },
                onError: (error) => {
                    alert(error.message || "Failed to update status");
                },
            }
        );
    };

    // Handle delete
    const handleDelete = () => {
        if (!job) return;
        deleteJob(job.id, {
            onSuccess: () => {
                router.push("/jobs");
            },
            onError: (error) => {
                alert(error.message || "Failed to delete job");
            },
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    // Error or not found state
    if (error || !job) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
                <Briefcase className="w-12 h-12 text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Job not found</h2>
                <p className="text-gray-500 mb-6">
                    {error?.message || "This job post may have been removed or expired."}
                </p>
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
            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Job?</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            This action cannot be undone. Are you sure you want to delete this job posting?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 py-3 bg-gray-100 text-gray-900 rounded-xl font-bold text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                            >
                                {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-900" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">Job Details</h1>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                        <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Content Container */}
            <div className="px-5 py-6">
                {/* Title Section */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">
                            {formatCategory(job.category)}
                        </span>
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold">
                            {formatEmploymentType(job.employmentType)}
                        </span>
                        {job.status !== "ACTIVE" && (
                            <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-bold">
                                {job.status === "CLOSED" ? "Closed" : job.status === "FILLED" ? "Filled" : job.status}
                            </span>
                        )}
                        {isOwner && (
                            <span className="px-2.5 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-bold">
                                Your Post
                            </span>
                        )}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">{job.title}</h1>
                </div>

                {/* Info List - Linear Layout */}
                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Posted By</span>
                        <span className="text-sm font-bold text-gray-900">{job.poster.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Salary</span>
                        <span className="text-sm font-bold text-black">{formatSalary(job.salaryAmount, job.isNegotiable)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Location</span>
                        <span className="text-sm font-bold text-gray-900 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            {job.palika}, {job.district}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Type</span>
                        <span className="text-sm font-bold text-gray-900">{formatEmploymentType(job.employmentType)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Posted</span>
                        <span className="text-sm text-gray-600">{getRelativeTime(job.createdAt)} • {job.viewCount} views</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Contact</span>
                        <a href={`tel:${job.contactPhone}`} className="text-sm font-bold text-blue-600">{job.contactPhone}</a>
                    </div>
                </div>

                <hr className="border-gray-100 my-6" />

                {/* Description */}
                <div className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-3">About the Role</h3>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                        {job.description}
                    </p>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="p-4 bg-white">
                <div className="max-w-md mx-auto space-y-3">
                    {isOwner ? (
                        <>
                            {/* Owner Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleStatusToggle}
                                    disabled={isUpdating}
                                    className={`flex-1 font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 ${job.status === "ACTIVE"
                                        ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                        : "bg-green-600 text-white hover:bg-green-700"
                                        }`}
                                >
                                    {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {job.status === "ACTIVE" ? "Close Job" : "Reopen Job"}
                                </button>
                                <Link
                                    href={`/jobs/edit?jobId=${job.id}`}
                                    className="flex-1 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 text-center"
                                >
                                    Edit Post
                                </Link>
                            </div>
                            {/* Delete Button */}
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="w-full py-3 border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete Job
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Visitor Actions */}
                            <div className="flex gap-3">
                                <a
                                    href={`tel:${job.contactPhone}`}
                                    className="flex-1 border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Phone className="w-4 h-4" />
                                    Call
                                </a>
                                <Link
                                    href={`/messages/${job.poster.id}`}
                                    className="flex-[2] bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Message
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
