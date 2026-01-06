"use client";
import { Briefcase } from "lucide-react";

interface EmptyJobsStateProps {
    viewMode: 'seeking' | 'hiring';
    onPostClick?: () => void;
}

export function EmptyJobsState({ viewMode, onPostClick }: EmptyJobsStateProps) {
    return (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900">No jobs found</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto mt-1">
                {viewMode === 'hiring' ? "You haven't posted any jobs yet." : "No jobs match your search."}
            </p>
            {viewMode === 'hiring' && onPostClick && (
                <button
                    onClick={onPostClick}
                    className="mt-4 px-6 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
                >
                    Post a Job
                </button>
            )}
        </div>
    );
}
