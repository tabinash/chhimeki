"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Briefcase, DollarSign, MapPin, Clock } from "lucide-react";

export default function PostJobPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        category: "Household Help",
        salary: "",
        type: "Part-time",
        location: "",
        description: "",
        requirements: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Job Posted:", formData);
        router.push("/jobs");
    };

    return (
        <div className="min-h-screen bg-white pb-24">
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

                {/* Title & Category */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Job Title</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. Housekeeper Needed"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
                    <select
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium appearance-none"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option>Household Help</option>
                        <option>Driver / Delivery</option>
                        <option>Sales / Shop</option>
                        <option>Education</option>
                        <option>Construction</option>
                        <option>Office Admin</option>
                    </select>
                </div>

                {/* Salary & Type */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Salary</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                required
                                placeholder="e.g. 15000"
                                className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                                value={formData.salary}
                                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Type</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                                className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium appearance-none"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Contract</option>
                                <option>One-time</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            required
                            placeholder="e.g. Baneshwor"
                            className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Job Description</label>
                    <textarea
                        required
                        rows={5}
                        placeholder="Describe the role responsibilities..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                {/* Spacer for fixed footer */}
                <div className="h-20" />

                {/* Fixed Footer */}
                {/* Fixed action bar positioned above global bottom nav (bottom-16) */}
                <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-200 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
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
                            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                        >
                            <Check className="w-4 h-4" />
                            Post Job
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
