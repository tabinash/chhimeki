import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

interface JobPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any; // Using any for flexibility with mock data structure
    onSubmit: (data: any) => void;
}

export default function JobPostModal({ isOpen, onClose, initialData, onSubmit }: JobPostModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        salary: "",
        type: "Full-time",
        description: "",
        requirements: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                location: initialData.location || "",
                salary: initialData.salary || "",
                type: initialData.type || "Full-time",
                description: initialData.description || "",
                requirements: initialData.requirements ? initialData.requirements.join(", ") : ""
            });
        } else {
            setFormData({
                title: "",
                location: "",
                salary: "",
                type: "Full-time",
                description: "",
                requirements: ""
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation/processing could go here
        onSubmit({
            ...formData,
            requirements: formData.requirements.split(",").map(r => r.trim()).filter(Boolean)
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">
                        {initialData ? "Edit Job Post" : "Post a New Job"}
                    </h2>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Job Title</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Housekeeper Needed"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    {/* Row: Location & Type */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Location</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Baneshwor"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Job Type</label>
                            <select
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium appearance-none"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Contract</option>
                                <option>Daily Wage</option>
                            </select>
                        </div>
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Estimated Salary / Wage</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Rs. 15,000 / mo"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                            value={formData.salary}
                            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
                        <textarea
                            required
                            rows={4}
                            placeholder="Describe the role, responsibilities, and working hours..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* Requirements */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Requirements <span className="text-gray-400 font-normal">(Comma separated)</span></label>
                        <input
                            type="text"
                            placeholder="e.g. 2 years experience, Own vehicle, Cooking skills"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                            value={formData.requirements}
                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-gray-200 flex items-center justify-center gap-2"
                        >
                            <Check className="w-4 h-4" />
                            {initialData ? "Save Changes" : "Post Job"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
