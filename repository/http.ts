import { useRefreshToken } from "@/hooks/api/useRefreshToken";
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

// ============================================
// Types (Matching Backend ErrorResponse.java)
// ============================================
interface ApiErrorResponse {
    status: string; // Always "error"
    message: string;
    errorCode: string;
    path: string;
    timestamp: string;
    fieldErrors?: FieldError[];
}

interface FieldError {
    field: string;
    message: string;
}

export interface ApiError {
    status: string;
    message: string;
    errorCode: string;
    path?: string;
    timestamp?: string;
    fieldErrors?: FieldError[];
    isNetworkError: boolean;
}

// ============================================
// Configuration
// ============================================
const BASE_URL = "http://192.168.18.12:8080/api";
const TIMEOUT = 15000; // 15 seconds

// ============================================
// Axios Instance
// ============================================
const http: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true, // Important: Send cookies with requests
});

// ============================================
// Request Interceptor
// ============================================
http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get token from localStorage and add to headers
        const token = localStorage.getItem("accessToken");
        console.log("Access token:", token);
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// ============================================
// Response Interceptor
// ============================================
http.interceptors.response.use(
    (response: AxiosResponse) => {
        // Return the data directly for cleaner usage in repositories
        return response;
    },
    async (error: AxiosError<ApiErrorResponse>) => {
        const apiError: ApiError = {
            status: "error",
            message: "An unexpected error occurred",
            errorCode: "INTERNAL_SERVER_ERROR",
            isNetworkError: false,
        };

        // Network Error (No internet, server down, etc.)
        if (!error.response) {
            apiError.message = "Network error. Please check your connection.";
            apiError.errorCode = "NETWORK_ERROR";
            apiError.isNetworkError = true;
            return Promise.reject(apiError);
        }

        const { status, data } = error.response;
        console.log("Error response:", error);

        // If backend sent structured ErrorResponse, use it
        if (data && data.status === "error") {
            apiError.message = data.message;
            apiError.errorCode = data.errorCode;
            apiError.path = data.path;
            apiError.timestamp = data.timestamp;
            apiError.fieldErrors = data.fieldErrors;
        } else {
            // Fallback to status code-based messages
            switch (status) {
                case 400:
                    // Bad Request - Business logic errors, validation errors
                    apiError.message = data?.message || "Invalid request";
                    apiError.errorCode = data?.errorCode || "BAD_REQUEST";
                    apiError.fieldErrors = data?.fieldErrors;
                    break;

                case 401:
                    // Unauthorized - Authentication failed
                    apiError.message = data?.message || "Authentication required. Please login.";
                    apiError.errorCode = data?.errorCode || "UNAUTHORIZED";
                    handleUnauthorized();
                    break;

                case 403:
                    // Forbidden - User doesn't have permission
                    apiError.message = data?.message || "You don't have permission to access this resource";
                    apiError.errorCode = data?.errorCode || "ACCESS_DENIED";
                    break;

                case 404:
                    // Not Found - Resource not found
                    apiError.message = data?.message || "Resource not found";
                    apiError.errorCode = data?.errorCode || "RESOURCE_NOT_FOUND";
                    break;

                case 409:
                    // Conflict - Data integrity violation (duplicate records)
                    apiError.message = data?.message || "This record already exists";
                    apiError.errorCode = data?.errorCode || "DATA_INTEGRITY_VIOLATION";
                    break;

                case 429:
                    // Too Many Requests - Rate limit exceeded
                    apiError.message = data?.message || "Too many requests. Please try again later.";
                    apiError.errorCode = data?.errorCode || "RATE_LIMIT_EXCEEDED";
                    break;

                case 500:
                    // Internal Server Error
                    apiError.message = data?.message || "Server error. Please try again later.";
                    apiError.errorCode = data?.errorCode || "INTERNAL_SERVER_ERROR";
                    break;

                case 502:
                    // Bad Gateway
                    apiError.message = "Service temporarily unavailable. Please try again.";
                    apiError.errorCode = "BAD_GATEWAY";
                    break;

                case 503:
                    // Service Unavailable
                    apiError.message = "Service temporarily unavailable. Please try again.";
                    apiError.errorCode = "SERVICE_UNAVAILABLE";
                    break;

                default:
                    apiError.message = data?.message || "Something went wrong";
                    apiError.errorCode = data?.errorCode || "UNKNOWN_ERROR";
            }
        }

        return Promise.reject(apiError);
    }
);

// ============================================
// Helper Functions
// ============================================

/**
 * Handle 401 Unauthorized responses
 * Clear auth state and redirect to login
 */
function handleUnauthorized(): void {
    // Clear any client-side storage if needed
    if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        // Redirect to login page
        window.location.href = "/login";
    }
}

// ============================================
// API Wrapper Functions (Auto-unwrap response.data)
// ============================================
import { AxiosRequestConfig } from "axios";

export const api = {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        http.get<T>(url, config).then(res => res.data),

    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
        http.post<T>(url, data, config).then(res => res.data),

    /**
     * POST request with upload progress tracking
     * Used for file uploads (images, videos) where progress feedback is needed
     * @param url - API endpoint
     * @param data - Request body (typically FormData)
     * @param onProgress - Callback with progress percentage (0-100)
     * @param config - Additional Axios config
     */
    postWithProgress: <T>(
        url: string,
        data: unknown,
        onProgress?: (progress: number) => void,
        config?: AxiosRequestConfig
    ): Promise<T> =>
        http.post<T>(url, data, {
            ...config,
            onUploadProgress: (progressEvent) => {
                if (onProgress && progressEvent.total) {
                    const percentComplete = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    onProgress(percentComplete);
                }
            },
        }).then(res => res.data),

    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
        http.put<T>(url, data, config).then(res => res.data),

    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
        http.patch<T>(url, data, config).then(res => res.data),

    delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        http.delete<T>(url, config).then(res => res.data),
};

// ============================================
// Export
// ============================================
export default http;