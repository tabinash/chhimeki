"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";

// Local components
import { JobsHeader } from "./_components/JobsHeader";
import { JobsSearchBar } from "./_components/JobsSearchBar";
import { JobCategoriesFilter } from "./_components/JobCategoriesFilter";
import { JobCard } from "./_components/JobCard";
import { EmptyJobsState } from "./_components/EmptyJobsState";

// Global modals (keep these in global components folder)
import JobPostModal from "@/components/jobs/JobPostModal";
import JobDetailModal from "@/components/modals/JobDetailModal";

// Data
import { jobCategories, jobs } from "@/data/mockJobsData";

export default function JobsPage() {
    const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
    const [viewMode, setViewMode] = useState<'seeking' | 'hiring'>('seeking');

    const searchParams = useSearchParams();
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<typeof jobs[0] | null>(null);

    // Auto-open modal if URL has ?action=post-job
    useEffect(() => {
        if (searchParams.get('action') === 'post-job') {
            setIsPostModalOpen(true);
            setEditingJob(null);
        }
    }, [searchParams]);

    const filteredJobs = viewMode === 'hiring'
        ? jobs.filter(job => job.isPostedByMe)
        : jobs;

    const handlePostClick = () => {
        setEditingJob(null);
        setIsPostModalOpen(true);
    };

    const handleEditClick = (job: typeof jobs[0]) => {
        setEditingJob(job);
        setIsPostModalOpen(true);
        setSelectedJob(null); // Close the detail view
    };

    const handleFormSubmit = (data: any) => {
        console.log("Job Submitted:", data);
        // Here we would actually update the data source
        setIsPostModalOpen(false);
        setEditingJob(null);
        // Clean URL
        window.history.replaceState(null, '', '/jobs');
    };

    const handleModalClose = () => {
        setIsPostModalOpen(false);
        // Clean URL
        window.history.replaceState(null, '', '/jobs');
    }

    return (
        <div className="min-h-screen p-6 md:p-8 relative">
            <div className="max-w-4xl mx-auto">
                {/* Header & Tabs */}
                <JobsHeader viewMode={viewMode} onViewModeChange={setViewMode} />

                {/* Search & Filter */}
                <JobsSearchBar viewMode={viewMode} />

                {/* Categories Pills */}
                {viewMode === 'seeking' && (
                    <JobCategoriesFilter categories={jobCategories} />
                )}

                {/* Job Listings */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">
                        {viewMode === 'hiring' ? 'Your Job Posts' : 'Latest Opportunities'}
                    </h2>

                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
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
            <JobDetailModal
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
                onEdit={handleEditClick}
            />

            {/* Post/Edit Job Modal */}
            <JobPostModal
                isOpen={isPostModalOpen}
                onClose={handleModalClose}
                initialData={editingJob}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
}

