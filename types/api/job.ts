// ============================================
// Job API Types
// ============================================

// Common API Response Wrapper
export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    timestamp: string;
}

// Pagination Wrapper
export interface PagedResponse<T> {
    status: string;
    message: string;
    data: T[];
    pagination: {
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
    timestamp: string;
}

// ============================================
// Job Domain Types
// ============================================

export interface JobPoster {
    id: number;
    name: string;
    userType: "GENERAL" | "GOVERNMENT_OFFICE" | "BUSINESS";
    profilePicture: string | null;
    isVerified: boolean;
}

export interface JobResponse {
    id: number;
    title: string;
    description: string;
    category: string;
    employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
    salaryRange: string | null;
    requirements: string | null;
    status: "ACTIVE" | "CLOSED" | "INACTIVE";
    poster: JobPoster;
    location: {
        district: string;
        palika: string;
        wada: string | null;
    };
    contactPhone: string | null;
    contactEmail: string | null;
    applicationCount: number;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
    expiresAt: string | null;
}

// ============================================
// Create Job API
// POST /api/jobs
// ============================================

export interface CreateJobRequest {
    title: string;
    description: string;
    category: string;
    employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
    salaryRange?: string;
    requirements?: string;
    contactPhone?: string;
    contactEmail?: string;
    expiresAt?: string; // ISO date string
}

export type CreateJobResponse = ApiResponse<JobResponse>;

// ============================================
// Get Job By ID API
// GET /api/jobs/{jobId}
// ============================================

export type GetJobByIdResponse = ApiResponse<JobResponse>;

// ============================================
// Update Job API
// PUT /api/jobs/{jobId}
// ============================================

export interface UpdateJobRequest {
    title: string;
    description: string;
    category: string;
    employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
    salaryRange?: string;
    requirements?: string;
    status: "ACTIVE" | "CLOSED" | "INACTIVE";
    contactPhone?: string;
    contactEmail?: string;
    expiresAt?: string; // ISO date string
}

export type UpdateJobResponse = ApiResponse<JobResponse>;

// ============================================
// Delete Job API
// DELETE /api/jobs/{jobId}
// ============================================

export type DeleteJobResponse = ApiResponse<void>;

// ============================================
// Get All Jobs API (Browse Jobs)
// GET /api/jobs
// ============================================

export interface GetAllJobsParams {
    page?: number;
    size?: number;
    category?: string;
    employmentType?: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
    status?: "ACTIVE" | "CLOSED" | "INACTIVE";
    geography?: string; // District or Palika name
    search?: string;
}

export type GetAllJobsResponse = PagedResponse<JobResponse>;

// ============================================
// Get My Jobs API
// GET /api/jobs/my-jobs
// ============================================

export interface GetMyJobsParams {
    page?: number;
    size?: number;
    status?: "ACTIVE" | "CLOSED" | "INACTIVE";
}

export type GetMyJobsResponse = PagedResponse<JobResponse>;

// ============================================
// Get User Jobs API
// GET /api/jobs/user/{userId}
// ============================================

export interface GetUserJobsParams {
    page?: number;
    size?: number;
}

export type GetUserJobsResponse = PagedResponse<JobResponse>;

// ============================================
// Search Jobs API
// GET /api/jobs/search
// ============================================

export interface SearchJobsParams {
    query: string;
    page?: number;
    size?: number;
    category?: string;
    employmentType?: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
    geography?: string;
}

export type SearchJobsResponse = PagedResponse<JobResponse>;