import { api } from "./http";
import {
    CreateJobRequest,
    CreateJobResponse,
    UpdateJobRequest,
    UpdateJobResponse,
    GetJobByIdResponse,
    DeleteJobResponse,
    BrowseJobsParams,
    BrowseJobsResponse,
    GetUserJobsParams,
    GetUserJobsResponse,
} from "@/types/api/job";

// ============================================
// JOB REPOSITORY - Available APIs
// do in this format for below comments--// POST   /api/marketplace/products                    - Create product

// ============================================
// 1. createJob()       POST   /api/jobs                       -- JSON, Auth required
// 2. updateJob()       PUT    /api/jobs/{jobId}              -- JSON, owner only
// 3. deleteJob()       DELETE /api/jobs/{jobId}              -- Soft delete, owner only
// 4. getJobById()      GET    /api/jobs/{jobId}              -- Public
// 5. browseJobs()      GET    /api/jobs                      -- By geography & category, public
// 6. getUserJobs()     GET    /api/jobs/user/{userId}        -- All jobs by user, public
// ============================================

export const jobRepository = {
    /**
     * Create a new job listing
     * Content-Type: application/json
     * @param data - Job creation data with all required fields
     * @returns Created job data with poster info
     */
    createJob: async (data: CreateJobRequest): Promise<CreateJobResponse> => {
        console.log("Creating job:", data.title);
        const response = await api.post<CreateJobResponse>("/jobs", data);
        console.log("Create Job Response:", response);
        return response;
    },

    /**
     * Update existing job listing
     * Content-Type: application/json
     * @param jobId - ID of the job to update
     * @param data - Updated job data (all fields optional)
     * @returns Updated job data
     */
    updateJob: async (jobId: number, data: UpdateJobRequest): Promise<UpdateJobResponse> => {
        console.log("Updating job ID:", jobId, "with data:", data);
        const response = await api.put<UpdateJobResponse>(`/jobs/${jobId}`, data);
        console.log("Update Job Response:", response);
        return response;
    },

    /**
     * Delete job listing (soft delete)
     * @param jobId - ID of the job to delete
     * @returns Success response
     */
    deleteJob: async (jobId: number): Promise<DeleteJobResponse> => {
        console.log("Deleting job with ID:", jobId);
        const response = await api.delete<DeleteJobResponse>(`/jobs/${jobId}`);
        console.log("Delete Job Response:", response);
        return response;
    },

    /**
     * Get job details by ID
     * @param jobId - ID of the job
     * @returns Full job details with poster info
     */
    getJobById: async (jobId: number): Promise<GetJobByIdResponse> => {
        console.log("Fetching job with ID:", jobId);
        const response = await api.get<GetJobByIdResponse>(`/jobs/${jobId}`);
        console.log("Get Job Response:", response);
        return response;
    },

    /**
     * Browse jobs by geography and category
     * @param params - Geography (required), category, pagination
     * @returns Paginated list of jobs
     */
    browseJobs: async (params: BrowseJobsParams): Promise<BrowseJobsResponse> => {
        console.log("Browsing jobs with params:", params);
        const response = await api.get<BrowseJobsResponse>("/jobs", {
            params: {
                geography: params.geography,
                category: params.category,
                page: params.page ?? 0,
                size: params.size ?? 20,
            },
        });
        console.log("Browse Jobs Response:", response);
        return response;
    },

    /**
     * Get user's job listings
     * @param userId - ID of the user
     * @param params - Status filter and pagination
     * @returns Paginated list of user's jobs
     */
    getUserJobs: async (userId: number, params?: GetUserJobsParams): Promise<GetUserJobsResponse> => {
        console.log("Fetching jobs for user ID:", userId, "with params:", params);
        const response = await api.get<GetUserJobsResponse>(`/jobs/user/${userId}`, {
            params: {
                status: params?.status ?? "ALL",
                page: params?.page ?? 0,
                size: params?.size ?? 20,
            },
        });
        console.log("User Jobs Response:", response);
        return response;
    },
};