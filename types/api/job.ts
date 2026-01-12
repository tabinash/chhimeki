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

export type JobCategory =
    | "CONSTRUCTION"
    | "DOMESTIC_HELP"
    | "DRIVING"
    | "TEACHING"
    | "IT_TECHNOLOGY"
    | "SALES_MARKETING"
    | "HEALTHCARE"
    | "AGRICULTURE"
    | "HOSPITALITY"
    | "RETAIL"
    | "MANUFACTURING"
    | "SECURITY"
    | "DELIVERY"
    | "BEAUTY_WELLNESS"
    | "OTHERS";

export type EmploymentType =
    | "FULL_TIME"
    | "PART_TIME"
    | "CONTRACT"
    | "FREELANCE"
    | "DAILY_WAGE"
    | "TEMPORARY";

export type JobStatus = "ACTIVE" | "FILLED" | "CLOSED";

export interface PosterInfo {
    id: number;
    name: string;
    profileImage: string | null;
}

export interface JobResponse {
    id: number;
    title: string;
    description: string;
    category: JobCategory;
    employmentType: EmploymentType;
    salaryAmount: number | null; // BigDecimal in Java -> number in TS
    isNegotiable: boolean;
    contactPhone: string;
    poster: PosterInfo;
    palika: string;
    district: string;
    status: JobStatus;
    viewCount: number;
    createdAt: string;
    updatedAt: string;

}

// ============================================
// Create Job API
// POST /api/jobs
// Content-Type: application/json
// ============================================

export interface CreateJobRequest {
    title: string; // 3-100 chars
    description: string; // 10-3000 chars
    category: JobCategory;
    employmentType: EmploymentType;
    salaryAmount?: number; // >= 0, optional
    isNegotiable?: boolean; // default: false
    contactPhone: string;
    palika: string;
    district: string;
}

export type CreateJobResponse = ApiResponse<JobResponse>;

// ============================================
// Update Job API
// PUT /api/jobs/{jobId}
// Content-Type: application/json
// ============================================

export interface UpdateJobRequest {
    title?: string; // 3-100 chars
    description?: string; // 10-3000 chars
    category?: JobCategory;
    employmentType?: EmploymentType;
    salaryAmount?: number; // >= 0
    isNegotiable?: boolean;
    contactPhone?: string;
    status?: JobStatus;
}

export type UpdateJobResponse = ApiResponse<JobResponse>;

// ============================================
// Get Job By ID API
// GET /api/jobs/{jobId}
// ============================================

export type GetJobByIdResponse = ApiResponse<JobResponse>;

// ============================================
// Delete Job API
// DELETE /api/jobs/{jobId}
// ============================================

export type DeleteJobResponse = ApiResponse<void>;

// ============================================
// Browse Jobs By Geography API
// GET /api/jobs
// ============================================

export interface BrowseJobsParams {
    geography: string; // Palika or District name (required)
    category?: JobCategory; // Optional filter
    page?: number; // Default: 0
    size?: number; // Default: 20
}

export type BrowseJobsResponse = PagedResponse<JobResponse>;

// ============================================
// Get User Jobs API
// GET /api/jobs/user/{userId}
// ============================================

export interface GetUserJobsParams {
    status?: "ACTIVE" | "FILLED" | "CLOSED" | "ALL"; // Default: ALL
    page?: number; // Default: 0
    size?: number; // Default: 20
}

export type GetUserJobsResponse = PagedResponse<JobResponse>;