"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, X } from "lucide-react";
import { useCreateJob } from "../_hook";
import { useUser } from "@/hooks/useUser";
import { JobCategory, EmploymentType } from "@/types/api/job";

// Category options matching API JobCategory enum
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

// Employment type options matching API EmploymentType enum
const EMPLOYMENT_TYPES: { label: string; value: EmploymentType }[] = [
    { label: "Full-time", value: "FULL_TIME" },
    { label: "Part-time", value: "PART_TIME" },
    { label: "Contract", value: "CONTRACT" },
    { label: "Freelance", value: "FREELANCE" },
    { label: "Daily Wage", value: "DAILY_WAGE" },
    { label: "Temporary", value: "TEMPORARY" },
];

export default function PostJobPage() {
    const router = useRouter();
    const { user } = useUser();
    const { mutate: createJob, isPending } = useCreateJob();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "DOMESTIC_HELP" as JobCategory,
        employmentType: "FULL_TIME" as EmploymentType,
        salaryAmount: "",
        isNegotiable: false,
        contactPhone: "",
        palika: "",
        district: "",
    });

    // Field-level errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Modal error state
    const [errorModal, setErrorModal] = useState<string | null>(null);

    // Track if form was submitted (to show errors)
    const [submitted, setSubmitted] = useState(false);

    // Pre-fill location from user profile when loaded
    useEffect(() => {
        if (user && !formData.palika && !formData.district) {
            setFormData((prev) => ({
                ...prev,
                palika: user.palika || "",
                district: user.district || "",
            }));
        }
    }, [user, formData.palika, formData.district]);

    // Validate form
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = "Job title is required";
        }
        if (!formData.description.trim()) {
            newErrors.description = "Job description is required";
        }
        if (!formData.contactPhone.trim()) {
            newErrors.contactPhone = "Contact phone is required";
        }
        if (!formData.palika.trim()) {
            newErrors.palika = "Palika is required";
        }
        if (!formData.district.trim()) {
            newErrors.district = "District is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (!validateForm()) {
            return;
        }

        createJob(
            {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                employmentType: formData.employmentType,
                salaryAmount: formData.salaryAmount ? Number(formData.salaryAmount) : undefined,
                isNegotiable: formData.isNegotiable,
                contactPhone: formData.contactPhone,
                palika: formData.palika,
                district: formData.district,
            },
            {
                onSuccess: (response) => {
                    router.push(`/jobs/${response.data.id}`);
                },
                onError: (error) => {
                    setErrorModal(error.message || "Failed to create job");
                },
            }
        );
    };

    // Clear error when field is edited
    const handleFieldChange = (field: string, value: string | boolean) => {
        setFormData({ ...formData, [field]: value });
        if (submitted && errors[field]) {
            setErrors({ ...errors, [field]: "" });
        }
    };

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Error Modal */}
            {errorModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Error</h3>
                            <button onClick={() => setErrorModal(null)} className="p-1 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">{errorModal}</p>
                        <button
                            onClick={() => setErrorModal(null)}
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">Post a Job</h1>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Job Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Housekeeper Needed"
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium ${errors.title ? "border-red-400" : "border-gray-200"
                            }`}
                        value={formData.title}
                        onChange={(e) => handleFieldChange("title", e.target.value)}
                    />
                    {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
                    <select
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                        value={formData.category}
                        onChange={(e) => handleFieldChange("category", e.target.value)}
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
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Employment Type</label>
                    <div className="grid grid-cols-2 gap-2">
                        {EMPLOYMENT_TYPES.map((type) => (
                            <button
                                key={type.value}
                                type="button"
                                onClick={() => handleFieldChange("employmentType", type.value)}
                                className={`py-2.5 rounded-xl text-sm font-bold transition-colors ${formData.employmentType === type.value
                                        ? "bg-black text-white"
                                        : "bg-gray-50 border border-gray-200 text-gray-600"
                                    }`}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Salary */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Salary (Rs.)</label>
                    <input
                        type="number"
                        placeholder="e.g. 15000"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                        value={formData.salaryAmount}
                        onChange={(e) => handleFieldChange("salaryAmount", e.target.value)}
                    />
                    <label className="flex items-center gap-2 mt-2">
                        <input
                            type="checkbox"
                            checked={formData.isNegotiable}
                            onChange={(e) => handleFieldChange("isNegotiable", e.target.checked)}
                            className="w-4 h-4 rounded"
                        />
                        <span className="text-sm text-gray-600">Salary is negotiable</span>
                    </label>
                </div>

                {/* Contact Phone */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Contact Phone</label>
                    <input
                        type="tel"
                        placeholder="e.g. 9801234567"
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium ${errors.contactPhone ? "border-red-400" : "border-gray-200"
                            }`}
                        value={formData.contactPhone}
                        onChange={(e) => handleFieldChange("contactPhone", e.target.value)}
                    />
                    {errors.contactPhone && <p className="text-xs text-red-500 mt-1">{errors.contactPhone}</p>}
                </div>

                {/* Location */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Palika</label>
                        <input
                            type="text"
                            placeholder="e.g. Kathmandu"
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium ${errors.palika ? "border-red-400" : "border-gray-200"
                                }`}
                            value={formData.palika}
                            onChange={(e) => handleFieldChange("palika", e.target.value)}
                        />
                        {errors.palika && <p className="text-xs text-red-500 mt-1">{errors.palika}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">District</label>
                        <input
                            type="text"
                            placeholder="e.g. Kathmandu"
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium ${errors.district ? "border-red-400" : "border-gray-200"
                                }`}
                            value={formData.district}
                            onChange={(e) => handleFieldChange("district", e.target.value)}
                        />
                        {errors.district && <p className="text-xs text-red-500 mt-1">{errors.district}</p>}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Job Description</label>
                    <textarea
                        rows={5}
                        placeholder="Describe the role, responsibilities, and what you're looking for..."
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium resize-none ${errors.description ? "border-red-400" : "border-gray-200"
                            }`}
                        value={formData.description}
                        onChange={(e) => handleFieldChange("description", e.target.value)}
                    />
                    {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                </div>

                {/* Spacer for fixed footer */}
                <div className="h-20" />

                {/* Fixed Footer */}
                <div className=" bottom-16 left-0 right-0 p-4 bg-white ">
                    <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-50"
                        >
                            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isPending ? "Posting..." : "Post Job"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
