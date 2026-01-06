import { api } from "./http";
import {
    CreateJobRequest,
    CreateJobResponse,
    GetJobByIdResponse,
    UpdateJobRequest,
    UpdateJobResponse,
    DeleteJobResponse,
    GetAllJobsParams,
    GetAllJobsResponse,
    GetMyJobsParams,
    GetMyJobsResponse,
    GetUserJobsParams,
    GetUserJobsResponse,
    SearchJobsParams,
    SearchJobsResponse,
} from "@/types/api/job";

// ============================================
// Job Repository
// ============================================
// Endpoints:
// POST   /api/jobs                    - Create job posting
// GET    /api/jobs/{jobId}            - Get job by ID
// PUT    /api/jobs/{jobId}            - Update job posting
// DELETE /api/jobs/{jobId}            - Delete job posting
// GET    /api/jobs                    - Get all jobs (browse)
// GET    /api/jobs/my-jobs            - Get my job postings
// GET    /api/jobs/user/{userId}      - Get user's job postings
// GET    /api/jobs/search             - Search jobs
// ============================================

export const jobRepository = {
    /**
     * Create a new job posting
     * @param data - Job creation data
     * @returns Created job data
     */
    createJob: async (data: CreateJobRequest): Promise<CreateJobResponse> => {
        console.log("Creating job with data:", data);
        const response = await api.post<CreateJobResponse>("/jobs", data);
        console.log("Create Job Response:", response);
        return response;
    },

    /**
     * Get a specific job by ID
     * @param jobId - The ID of the job to fetch
     * @returns Job data
     */
    getJobById: async (jobId: number): Promise<GetJobByIdResponse> => {
        console.log("Fetching job with ID:", jobId);
        const response = await api.get<GetJobByIdResponse>(`/jobs/${jobId}`);
        console.log("Get Job Response:", response);
        return response;
    },

    /**
     * Update an existing job posting
     * @param jobId - The ID of the job to update
     * @param data - Updated job data
     * @returns Updated job data
     */
    updateJob: async (jobId: number, data: UpdateJobRequest): Promise<UpdateJobResponse> => {
        console.log("Updating job ID:", jobId, "with data:", data);
        const response = await api.put<UpdateJobResponse>(`/jobs/${jobId}`, data);
        console.log("Update Job Response:", response);
        return response;
    },

    /**
     * Delete a job posting
     * @param jobId - The ID of the job to delete
     * @returns Success response
     */
    deleteJob: async (jobId: number): Promise<DeleteJobResponse> => {
        console.log("Deleting job with ID:", jobId);
        const response = await api.delete<DeleteJobResponse>(`/jobs/${jobId}`);
        console.log("Delete Job Response:", response);
        return response;
    },

    /**
     * Get all jobs (browse job board)
     * Filtered by location and optional filters
     * @param params - Filter and pagination parameters
     * @returns Paginated list of jobs
     */
    getAllJobs: async (params?: GetAllJobsParams): Promise<GetAllJobsResponse> => {
        console.log("Fetching all jobs with params:", params);
        const response = await api.get<GetAllJobsResponse>("/jobs", {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
                category: params?.category,
                employmentType: params?.employmentType,
                status: params?.status,
                geography: params?.geography,
                search: params?.search,
            },
        });
        console.log("All Jobs Response:", response);
        return response;
    },

    /**
     * Get all job postings created by the current authenticated user
     * @param params - Filter and pagination parameters
     * @returns Paginated list of user's own job postings
     */
    getMyJobs: async (params?: GetMyJobsParams): Promise<GetMyJobsResponse> => {
        console.log("Fetching my jobs with params:", params);
        const response = await api.get<GetMyJobsResponse>("/jobs/my-jobs", {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
                status: params?.status,
            },
        });
        console.log("My Jobs Response:", response);
        return response;
    },

    /**
     * Get all job postings created by a specific user
     * @param userId - The ID of the user whose jobs to fetch
     * @param params - Pagination parameters
     * @returns Paginated list of user's job postings
     */
    getUserJobs: async (userId: number, params?: GetUserJobsParams): Promise<GetUserJobsResponse> => {
        console.log("Fetching jobs for user ID:", userId, "with params:", params);
        const response = await api.get<GetUserJobsResponse>(`/jobs/user/${userId}`, {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
            },
        });
        console.log("User Jobs Response:", response);
        return response;
    },

    /**
     * Search jobs by query and filters
     * @param params - Search query and filter parameters
     * @returns Paginated search results
     */
    searchJobs: async (params: SearchJobsParams): Promise<SearchJobsResponse> => {
        console.log("Searching jobs with params:", params);
        const response = await api.get<SearchJobsResponse>("/jobs/search", {
            params: {
                query: params.query,
                page: params.page ?? 0,
                size: params.size ?? 20,
                category: params.category,
                employmentType: params.employmentType,
                geography: params.geography,
            },
        });
        console.log("Search Jobs Response:", response);
        return response;
    },
};