"use client";

import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import { useCreateJob } from "@/app/(main)/jobs/_hook";
import { JobCategory, EmploymentType, CreateJobRequest } from "@/types/api/job";
import { useUser } from "@/hooks/useUser";

interface CreateJobModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const jobCategories: { value: JobCategory; label: string }[] = [
    { value: "CONSTRUCTION", label: "Construction" },
    { value: "DOMESTIC_HELP", label: "Domestic Help" },
    { value: "DRIVING", label: "Driving" },
    { value: "TEACHING", label: "Teaching" },
    { value: "IT_TECHNOLOGY", label: "IT & Technology" },
    { value: "SALES_MARKETING", label: "Sales & Marketing" },
    { value: "HEALTHCARE", label: "Healthcare" },
    { value: "AGRICULTURE", label: "Agriculture" },
    { value: "HOSPITALITY", label: "Hospitality" },
    { value: "RETAIL", label: "Retail" },
    { value: "MANUFACTURING", label: "Manufacturing" },
    { value: "SECURITY", label: "Security" },
    { value: "DELIVERY", label: "Delivery" },
    { value: "BEAUTY_WELLNESS", label: "Beauty & Wellness" },
    { value: "OTHERS", label: "Others" }
];

const employmentTypes: { value: EmploymentType; label: string }[] = [
    { value: "FULL_TIME", label: "Full-time" },
    { value: "PART_TIME", label: "Part-time" },
    { value: "CONTRACT", label: "Contract" },
    { value: "FREELANCE", label: "Freelance" },
    { value: "DAILY_WAGE", label: "Daily Wage" },
    { value: "TEMPORARY", label: "Temporary" }
];

export default function CreateJobModal({ isOpen, onClose, onSuccess }: CreateJobModalProps) {
    const { user } = useUser();
    const { mutate: createJob, isPending } = useCreateJob();
    const [formData, setFormData] = useState<CreateJobRequest>({
        title: "",
        description: "",
        category: "OTHERS",
        employmentType: "FULL_TIME",
        salaryAmount: undefined,
        isNegotiable: false,
        contactPhone: "",
        palika: user?.palika || "",
        district: user?.district || ""
    });

    useEffect(() => {
        if (user?.palika || user?.district) {
            setFormData((prev) => ({
                ...prev,
                palika: user?.palika || "",
                district: user?.district || ""
            }));
        }
    }, [user]);


    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createJob(formData, {
            onSuccess: () => {
                onSuccess?.();
                onClose();
                // Reset form
                setFormData({
                    title: "",
                    description: "",
                    category: "OTHERS",
                    employmentType: "FULL_TIME",
                    salaryAmount: undefined,
                    isNegotiable: false,
                    contactPhone: "",
                    palika: user?.palika || "",
                    district: user?.district || ""
                });
            },
            onError: (error) => {
                alert(`Failed to create job: ${error.message}`);
            }
        });
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Post a New Job</h2>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Job Title *</label>
                        <input
                            type="text"
                            required
                            minLength={3}
                            maxLength={100}
                            placeholder="e.g. Housekeeper Needed"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    {/* Category & Employment Type */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Category *</label>
                            <select
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as JobCategory })}
                            >
                                {jobCategories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Employment Type *</label>
                            <select
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                value={formData.employmentType}
                                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as EmploymentType })}
                            >
                                {employmentTypes.map(type => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Salary (NPR)</label>
                        <input
                            type="number"
                            min={0}
                            placeholder="e.g. 15000"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            value={formData.salaryAmount || ""}
                            onChange={(e) => setFormData({ ...formData, salaryAmount: e.target.value ? Number(e.target.value) : undefined })}
                        />
                        <label className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                checked={formData.isNegotiable}
                                onChange={(e) => setFormData({ ...formData, isNegotiable: e.target.checked })}
                                className="rounded"
                            />
                            <span className="text-sm text-gray-600">Negotiable</span>
                        </label>
                    </div>

                    {/* Contact Phone */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Contact Phone *</label>
                        <input
                            type="tel"
                            required
                            placeholder="e.g. 9841234567"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            value={formData.contactPhone}
                            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        />
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Palika *</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Kathmandu"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                value={formData.palika}
                                onChange={(e) => setFormData({ ...formData, palika: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">District *</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Kathmandu"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                value={formData.district}
                                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Description *</label>
                        <textarea
                            required
                            minLength={10}
                            maxLength={3000}
                            rows={5}
                            placeholder="Describe the role, responsibilities, working hours, and requirements..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 px-4 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-gray-200 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Check className="w-4 h-4" />
                            {isPending ? "Posting..." : "Post Job"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
