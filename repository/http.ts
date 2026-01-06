import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

// ============================================
// Types
// ============================================
interface ApiErrorResponse {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}

export interface ApiError {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
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
        // Token is handled via HttpOnly cookies (sent automatically with withCredentials: true)
        // If you need to add any custom headers, do it here:

        // Example: Add language header for i18n
        // const language = localStorage.getItem("language") || "en";
        // config.headers["Accept-Language"] = language;

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
            message: "An unexpected error occurred",
            statusCode: 500,
            isNetworkError: false,
        };

        // Network Error (No internet, server down, etc.)
        if (!error.response) {
            apiError.message = "Network error. Please check your connection.";
            apiError.isNetworkError = true;
            return Promise.reject(apiError);
        }

        const { status, data } = error.response;
        apiError.statusCode = status;

        switch (status) {
            case 400:
                // Bad Request - Validation errors
                apiError.message = data?.message || "Invalid request";
                apiError.errors = data?.errors;
                break;

            case 401:
                // Unauthorized - Token expired or invalid
                apiError.message = "Session expired. Please login again.";
                // Clear any client-side auth state and redirect to login
                handleUnauthorized();
                break;

            case 403:
                // Forbidden - User doesn't have permission
                apiError.message = "You don't have permission to perform this action.";
                break;

            case 404:
                // Not Found
                apiError.message = data?.message || "Resource not found";
                break;

            case 422:
                // Unprocessable Entity - Validation errors
                apiError.message = data?.message || "Validation failed";
                apiError.errors = data?.errors;
                break;

            case 429:
                // Too Many Requests
                apiError.message = "Too many requests. Please try again later.";
                break;

            case 500:
            case 502:
            case 503:
                // Server errors
                apiError.message = "Server error. Please try again later.";
                break;

            default:
                apiError.message = data?.message || "Something went wrong";
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
