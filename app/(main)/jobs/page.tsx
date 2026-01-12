"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";

// Hooks
import { useUser } from "@/hooks/useUser";
import { useBrowseJobs, useMyJobs } from "./_hook";

// Local components
import { JobsHeroSection } from "./_components/JobsHeroSection";
import { JobCard } from "./_components/JobCard";
import { EmptyJobsState } from "./_components/EmptyJobsState";

// Global modals (keep these in global components folder)
import CreateJobModal from "@/app/(main)/jobs/_modal/CreateJobModal";
import EditJobModal from "@/app/(main)/jobs/_modal/EditJobModal";
import JobDetailModal from "@/app/(main)/jobs/_modal/JobDetailModal";

// Types
import { JobResponse, JobCategory } from "@/types/api/job";

export default function JobsPage() {
    const [selectedJob, setSelectedJob] = useState<JobResponse | null>(null);
    const [viewMode, setViewMode] = useState<'all' | 'my jobs'>('all');
    const [selectedCategory, setSelectedCategory] = useState<JobCategory | undefined>(undefined);

    const searchParams = useSearchParams();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<JobResponse | null>(null);

    // Get current user for geography
    const { user } = useUser();

    // Fetch jobs based on view mode
    const { data: browseData, isLoading: isBrowseLoading } = useBrowseJobs(
        user?.palika || "",
        {
            category: selectedCategory,
            page: 0,
            size: 20,
        }
    );

    const { data: myJobsData, isLoading: isMyJobsLoading } = useMyJobs(
        user?.id || 0,
        {
            status: "ALL",
            page: 0,
            size: 20,
        }
    );

    // Auto-open modal if URL has ?action=post-job
    useEffect(() => {
        if (searchParams.get('action') === 'post-job') {
            setIsCreateModalOpen(true);
        }
    }, [searchParams]);

    // Get jobs based on view mode
    const jobs: JobResponse[] = viewMode === 'my jobs'
        ? (myJobsData?.data || [])
        : (browseData?.data || []);

    const isLoading = viewMode === 'my jobs' ? isMyJobsLoading : isBrowseLoading;

    const handlePostClick = () => {
        setIsCreateModalOpen(true);
    };

    const handleEditClick = (job: JobResponse) => {
        setEditingJob(job);
        setIsEditModalOpen(true);
        setSelectedJob(null); // Close the detail view
    };

    const handleCreateSuccess = () => {
        // Clean URL
        window.history.replaceState(null, '', '/jobs');
    };

    const handleCreateClose = () => {
        setIsCreateModalOpen(false);
        // Clean URL
        window.history.replaceState(null, '', '/jobs');
    };

    const handleEditClose = () => {
        setIsEditModalOpen(false);
        setEditingJob(null);
    };

    return (
        <div className="min-h-screen p-6 md:p-8 relative">
            <div className="max-w-4xl mx-auto">
                {/* Unified Hero Section */}
                <JobsHeroSection
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    onPostJobClick={handlePostClick}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    jobCount={viewMode === 'all' ? browseData?.data?.length : myJobsData?.data?.length}
                />

                {/* Job Listings */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">
                        {viewMode === 'my jobs' ? 'Your Job Posts' : 'Latest Opportunities'}
                    </h2>

                    {isLoading ? (
                        // Loading skeleton
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 animate-pulse">
                                    <div className="flex gap-5">
                                        <div className="w-16 h-16 rounded-xl bg-gray-200" />
                                        <div className="flex-1 space-y-3">
                                            <div className="h-4 bg-gray-200 rounded w-2/3" />
                                            <div className="h-3 bg-gray-200 rounded w-1/2" />
                                            <div className="h-3 bg-gray-200 rounded w-1/3" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : jobs.length > 0 ? (
                        jobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onClick={() => setSelectedJob(job)}
                            />
                        ))
                    ) : (
                        <EmptyJobsState viewMode={viewMode} onPostClick={handlePostClick} />
                    )}
                </div>
            </div>

            {/* Job Detail Modal */}
            <JobDetailModal />

            {/* Create Job Modal */}
            <CreateJobModal
                isOpen={isCreateModalOpen}
                onClose={handleCreateClose}
                onSuccess={handleCreateSuccess}
            />

            {/* Edit Job Modal */}
            <EditJobModal />
        </div>
    );
}

