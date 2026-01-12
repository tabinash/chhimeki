"use client";
import { Briefcase, ListTodo, Plus, Sparkles } from "lucide-react";

interface JobsHeaderProps {
    viewMode: 'all' | 'my jobs';
    onViewModeChange: (mode: 'all' | 'my jobs') => void;
    onPostJobClick?: () => void;
    jobCount?: number;
}

export function JobsHeader({ viewMode, onViewModeChange, onPostJobClick, jobCount }: JobsHeaderProps) {
    return (
        <div className="mb-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 mb-6 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Title Section */}
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                                Neighborhood Jobs
                                <Sparkles className="w-5 h-5 text-yellow-300" />
                            </h1>
                            <p className="text-blue-100 text-sm mt-1">
                                Find work nearby or hire a trusted neighbor
                            </p>
                            {jobCount !== undefined && (
                                <div className="mt-2 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <span className="text-white text-xs font-bold">{jobCount}</span>
                                    <span className="text-blue-100 text-xs">opportunities available</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Post Job CTA */}
                    {onPostJobClick && (
                        <button
                            onClick={onPostJobClick}
                            className="flex items-center gap-2 bg-white text-blue-700 px-5 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20 self-start md:self-auto"
                        >
                            <Plus className="w-5 h-5" />
                            Post a Job
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs Section */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onViewModeChange('all')}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${viewMode === 'all'
                            ? 'bg-gray-900 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    <Briefcase className="w-4 h-4" />
                    Browse All
                </button>
                <button
                    onClick={() => onViewModeChange('my jobs')}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${viewMode === 'my jobs'
                            ? 'bg-gray-900 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    <ListTodo className="w-4 h-4" />
                    My Posts
                </button>
            </div>
        </div>
    );
}
