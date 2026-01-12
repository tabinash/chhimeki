"use client";

import { X, MessageCircle, MapPin, Phone, Clock, Tag, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getChatUrl } from "@/lib/chatUtils";
import { JobResponse, EmploymentType } from "@/types/api/job";
import { useUser } from "@/hooks/useUser";
import { useDeleteJob, useJobById, useUpdateJob } from "@/app/(main)/jobs/_hook";
import { useDispatch, useSelector } from "react-redux";
import { openChat } from "@/redux/slices/chatSlice";
import { RootState } from "@/redux/store";
import { closeJobDetailModal, openJobEditModal } from "@/redux/slices/modalSlice";


// Helper functions
function formatSalary(amount: number | null, isNegotiable: boolean): string {
    if (!amount) return isNegotiable ? "Negotiable" : "Not Specified";
    return `NPR ${amount.toLocaleString()}${isNegotiable ? " (Negotiable)" : ""}`;
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

function formatCategory(category: string): string {
    return category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}

export default function JobDetailModal() {

    const dispatch = useDispatch()
    const jobDetailModal = useSelector((state: RootState) => state.modal.jobDetailModal);
    const { data: jobDetail, isLoading: jobDetaiLoading } = useJobById(jobDetailModal.jobId ?? 0);
    const job = jobDetail?.data
    const router = useRouter();
    const { user } = useUser();
    const updateMutation = useUpdateJob();
    const deleteMutation = useDeleteJob();
    // can you tell me how we get this update muation in language,how his hook return this thing
    // can you tell me how we get this update muation in language,how his hook return this thing

    if (!jobDetailModal.isOpen) return null;


    if (jobDetaiLoading || !job) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <Loader2 className="animate-spin w-8 h-8 text-white" />
            </div>
        );
    }
    const handleJobStatusToggle = () => {
        const newStatus = job?.status === "ACTIVE" ? "CLOSED" : "ACTIVE";
        updateMutation.mutate({
            jobId: job.id,
            data: { status: newStatus }
        }, {
            onSuccess: () => {
                dispatch(closeJobDetailModal())
            }
        });
    };



    const isPostedByMe = job.poster.id === user?.id;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <div className="flex-1 mr-4">
                        <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-600">{job.poster.name}</span>
                            {isPostedByMe && (
                                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded">
                                    Your Post
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => dispatch(closeJobDetailModal())}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <div>
                                <div className="text-xs text-gray-500 mb-0.5">Salary</div>
                                <div className="font-semibold text-black">
                                    {formatSalary(job.salaryAmount, job.isNegotiable)}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <div className="text-xs text-gray-500 mb-0.5">Employment Type</div>
                                <div className="font-semibold text-gray-900">
                                    {formatEmploymentType(job.employmentType)}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <div className="text-xs text-gray-500 mb-0.5">Location</div>
                                <div className="font-semibold text-gray-900">
                                    {job.palika}, {job.district}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Tag className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <div className="text-xs text-gray-500 mb-0.5">Category</div>
                                <div className="font-semibold text-gray-900">
                                    {formatCategory(job.category)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Description */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2">Job Description</h3>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {job.description}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Contact & Additional Info */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-gray-900">Contact Information</h3>

                        <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{job.contactPhone}</span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
                            <div>
                                <span className="font-medium">Posted:</span> {formatRelativeTime(job.createdAt)}
                            </div>
                            <div>
                                <span className="font-medium">Status:</span>{' '}
                                <span className={`font-semibold ${job.status === 'ACTIVE' ? 'text-green-600' :
                                    job.status === 'FILLED' ? 'text-blue-600' :
                                        'text-red-600'
                                    }`}>
                                    {job.status}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium">Views:</span> {job.viewCount}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl">
                    {isPostedByMe ? (
                        <div className="flex gap-3">
                            <button
                                onClick={handleJobStatusToggle}
                                className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium text-sm rounded-lg py-2.5 hover:bg-gray-50 transition-colors">
                                {updateMutation.isPending ? (
                                    <Loader2 className="animate-spin mx-auto" />
                                ) : job.status === "ACTIVE" ? (
                                    "Mark as Closed"
                                ) : (
                                    "Mark as Open"
                                )}                            </button>
                            <button
                                onClick={() => {
                                    dispatch(openJobEditModal(job))
                                    dispatch(closeJobDetailModal())
                                }}
                                className="flex-1 bg-black text-white font-medium text-sm rounded-lg py-2.5 hover:bg-gray-800 transition-colors"
                            >
                                Edit Job
                            </button>
                            <button
                                onClick={() => {
                                    deleteMutation.mutate(job.id, {
                                        onSuccess: () => {
                                            dispatch(closeJobDetailModal())
                                        },
                                        onError: (err) => {
                                            alert("Failed to delete job")
                                        }
                                    })
                                }}
                                className="flex-1 bg-red-100 text-red-700 items-center font-bold text-sm rounded-lg py-2.5 hover:bg-red-200 transition-colors"
                            >
                                {deleteMutation.isPending ? <Loader2 className="animate-spin" /> : "Delete Job"}

                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={() => dispatch(openChat({ id: job.poster.id, profilePicture: job.poster.profileImage, name: job.poster.name }))}
                                className="flex-1 bg-blue-500 text-white font-medium text-sm rounded-lg py-2.5 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Message
                            </button>
                            <a
                                href={`tel:${job.contactPhone}`}
                                className="flex-1 bg-green-500 text-white font-medium text-sm rounded-lg py-2.5 hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <Phone className="w-4 h-4" />
                                Call
                            </a>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
