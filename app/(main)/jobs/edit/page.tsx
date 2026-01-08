"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useJobById, useUpdateJob } from "../_hook";
import { useUser } from "@/hooks/useUser";
import { JobCategory, EmploymentType, JobStatus } from "@/types/api/job";

// Category options
const JOB_CATEGORIES: { label: string; value: JobCategory }[] = [
    { label: "Construction", value: "CONSTRUCTION" },
    { label: "Domestic Help", value: "DOMESTIC_HELP" },
    { label: "Driving", value: "DRIVING" },
    { label: "Teaching", value: "TEACHING" },
    { label: "IT & Tech", value: "IT_TECHNOLOGY" },
    { label: "Sales & Marketing", value: "SALES_MARKETING" },
    { label: "Healthcare", value: "HEALTHCARE" },
    { label: "Agriculture", value: "AGRICULTURE" },
    { label: "Hospitality", value: "HOSPITALITY" },
    { label: "Retail", value: "RETAIL" },
    { label: "Manufacturing", value: "MANUFACTURING" },
    { label: "Security", value: "SECURITY" },
    { label: "Delivery", value: "DELIVERY" },
    { label: "Beauty & Wellness", value: "BEAUTY_WELLNESS" },
    { label: "Others", value: "OTHERS" },
];

// Employment type options
const EMPLOYMENT_TYPES: { label: string; value: EmploymentType }[] = [
    { label: "Full-time", value: "FULL_TIME" },
    { label: "Part-time", value: "PART_TIME" },
    { label: "Contract", value: "CONTRACT" },
    { label: "Freelance", value: "FREELANCE" },
    { label: "Daily Wage", value: "DAILY_WAGE" },
    { label: "Temporary", value: "TEMPORARY" },
];



export default function EditJobPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const jobId = Number(searchParams.get("jobId"));

    // Get current user for ownership check
    const { user } = useUser();

    // Fetch existing job data
    const { data: jobData, isLoading: isJobLoading, error: jobError } = useJobById(jobId);
    const job = jobData?.data;

    // Update mutation
    const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "" as JobCategory,
        employmentType: "" as EmploymentType,
        salaryAmount: "",
        isNegotiable: false,
        contactPhone: "",
        status: "ACTIVE" as JobStatus,
    });

    // Populate form when job data loads
    useEffect(() => {
        if (job) {
            setFormData({
                title: job.title,
                description: job.description,
                category: job.category,
                employmentType: job.employmentType,
                salaryAmount: job.salaryAmount?.toString() || "",
                isNegotiable: job.isNegotiable,
                contactPhone: job.contactPhone,
                status: job.status,
            });
        }
    }, [job]);

    // Handle form submission
    const handleSubmit = () => {
        if (!formData.title.trim()) {
            alert("Please enter a job title");
            return;
        }
        if (!formData.description.trim()) {
            alert("Please enter a job description");
            return;
        }

        updateJob(
            {
                jobId,
                data: {
                    title: formData.title,
                    description: formData.description,
                    category: formData.category,
                    employmentType: formData.employmentType,
                    salaryAmount: formData.salaryAmount ? Number(formData.salaryAmount) : undefined,
                    isNegotiable: formData.isNegotiable,
                    contactPhone: formData.contactPhone,
                    // status is not sent - keeps original value
                },
            },
            {
                onSuccess: () => {
                    router.push(`/jobs/${jobId}`);
                },
                onError: (error) => {
                    alert(error.message || "Failed to update job");
                },
            }
        );
    };

    // Check ownership
    const isOwner = job?.poster.id === user?.id;

    // Loading state
    if (isJobLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    // Error or not allowed
    if (jobError || !job) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Job not found</h2>
                <p className="text-gray-500 mb-6">This job may have been removed.</p>
                <button onClick={() => router.back()} className="px-6 py-2.5 bg-black text-white rounded-xl font-bold text-sm">
                    Go Back
                </button>
            </div>
        );
    }

    // Not owner
    if (!isOwner) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
                <p className="text-gray-500 mb-6">You can only edit your own job postings.</p>
                <button onClick={() => router.back()} className="px-6 py-2.5 bg-black text-white rounded-xl font-bold text-sm">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-50 rounded-full">
                    <ArrowLeft className="w-5 h-5 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">Edit Job</h1>
            </div>

            {/* Form */}
            <div className="p-4 space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Job Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Housekeeper Needed"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as JobCategory })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {JOB_CATEGORIES.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Employment Type */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Employment Type</label>
                    <div className="grid grid-cols-2 gap-2">
                        {EMPLOYMENT_TYPES.map((type) => (
                            <button
                                key={type.value}
                                type="button"
                                onClick={() => setFormData({ ...formData, employmentType: type.value })}
                                className={`py-2.5 rounded-xl text-sm font-bold transition-colors ${formData.employmentType === type.value
                                    ? "bg-black text-white"
                                    : "bg-white border border-gray-200 text-gray-600"
                                    }`}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Salary */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Salary (Rs.)</label>
                    <input
                        type="number"
                        value={formData.salaryAmount}
                        onChange={(e) => setFormData({ ...formData, salaryAmount: e.target.value })}
                        placeholder="e.g. 15000"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="flex items-center gap-2 mt-2">
                        <input
                            type="checkbox"
                            checked={formData.isNegotiable}
                            onChange={(e) => setFormData({ ...formData, isNegotiable: e.target.checked })}
                            className="w-4 h-4 rounded"
                        />
                        <span className="text-sm text-gray-600">Salary is negotiable</span>
                    </label>
                </div>

                {/* Contact Phone */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Contact Phone</label>
                    <input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        placeholder="e.g. 9801234567"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe the role, requirements, and what you're looking for..."
                        rows={5}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={isUpdating}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isUpdating ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
}