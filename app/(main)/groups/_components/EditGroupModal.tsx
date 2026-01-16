"use client";

import { useState, useEffect } from "react";
import { Loader2, X, Edit3 } from "lucide-react";

interface EditGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { name: string; description: string }) => void;
    isLoading: boolean;
    currentName: string;
    currentDescription: string;
}

export default function EditGroupModal({
    isOpen,
    onClose,
    onSave,
    isLoading,
    currentName,
    currentDescription,
}: EditGroupModalProps) {
    const [name, setName] = useState(currentName);
    const [description, setDescription] = useState(currentDescription);
    const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

    // Sync state when modal opens with new values
    useEffect(() => {
        if (isOpen) {
            setName(currentName);
            setDescription(currentDescription);
            setErrors({});
        }
    }, [isOpen, currentName, currentDescription]);

    const validate = (): boolean => {
        const newErrors: { name?: string; description?: string } = {};

        if (!name.trim()) {
            newErrors.name = "Group name is required";
        } else if (name.trim().length > 100) {
            newErrors.name = "Name must be 100 characters or less";
        }

        if (description.length > 500) {
            newErrors.description = "Description must be 500 characters or less";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        // Only send if values changed
        if (name.trim() === currentName && description === currentDescription) {
            onClose();
            return;
        }

        onSave({
            name: name.trim(),
            description: description,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                            <Edit3 className="w-4 h-4 text-blue-600" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Edit Group</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                        disabled={isLoading}
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-4 mb-5">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">
                            Group Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter group name"
                            maxLength={100}
                            className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors ${errors.name
                                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                                }`}
                            disabled={isLoading}
                        />
                        <div className="flex justify-between mt-1">
                            {errors.name ? (
                                <span className="text-xs text-red-500">{errors.name}</span>
                            ) : (
                                <span />
                            )}
                            <span className="text-xs text-gray-400">{name.length}/100</span>
                        </div>
                    </div>

                    {/* Description Field */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What's this group about?"
                            maxLength={500}
                            rows={4}
                            className={`w-full px-4 py-2.5 border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 transition-colors ${errors.description
                                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                                }`}
                            disabled={isLoading}
                        />
                        <div className="flex justify-between mt-1">
                            {errors.description ? (
                                <span className="text-xs text-red-500">{errors.description}</span>
                            ) : (
                                <span />
                            )}
                            <span className="text-xs text-gray-400">{description.length}/500</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !name.trim()}
                        className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
