import { api } from "./http";
import {
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
} from "@/types/api/auth";

// ============================================
// Auth Repository
// ============================================

export const authRepository = {
    /**
     * Login with identifier (phone/email) and password
     * @param credentials - User login credentials
     * @returns Login response with user data and tokens
     */
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        console.log("Login Credentials:", credentials);
        const response = await api.post<LoginResponse>("/auth/login", credentials);
        console.log("Login Response:", response);
        return response;
    },

    /**
     * Refresh access token using refresh token
     * @param refreshToken - The refresh token
     * @returns New access and refresh tokens
     */
    refreshToken: async (refreshToken: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
        const response = await api.post<RefreshTokenResponse>("/auth/refresh", refreshToken);
        console.log("Refresh Token Response:", response);
        return response;
    },

    logout: async (): Promise<void> => {
        const response = await api.post<void>("/auth/logout");
        console.log("Logout Response:", response);
        return response;
    },

    /**
     * Register a new user
     * @param data - Registration data including profile picture
     * @returns Login response (auto-login after register)
     */
    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("district", data.district);
        formData.append("palika", data.palika);
        formData.append("wada", data.wada.toString());

        if (data.password) {
            formData.append("password", data.password);
        }

        if (data.profilePicture) {
            formData.append("profilePicture", data.profilePicture);
        }

        // Add default userType if needed, or backend handles it
        // formData.append("userType", "GENERAL"); 

        console.log("Registering User...", Object.fromEntries(formData));

        const response = await api.post<RegisterResponse>("/auth/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    },
};
