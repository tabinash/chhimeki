import { api } from "./http";
import {
    GetCurrentUserProfileResponse,
    UpdateProfileRequest,
    UpdateProfileResponse,
    UpdateProfilePictureResponse,
    UpdateCoverPictureResponse,
    GetUserByIdResponse,
    GetNearbyGeneralUsersResponse,
    GetNearbyInstitutionsResponse,
} from "@/types/api/user";

// ============================================
// User Repository
// ============================================

export const userRepository = {
    /**
     * Get current authenticated user's profile
     * @returns Current user profile data
     */
    getCurrentUserProfile: async (): Promise<GetCurrentUserProfileResponse> => {
        console.log("Fetching current user profile...");
        const response = await api.get<GetCurrentUserProfileResponse>("/users/profile");
        console.log("Current User Profile Response:", response);
        return response;
    },

    /**
     * Update user profile information (name, date of birth)
     * @param data - Profile update data
     * @returns Updated user profile
     */
    updateProfile: async (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
        console.log("Updating profile with data:", data);
        const response = await api.put<UpdateProfileResponse>("/users/profile", data);
        console.log("Update Profile Response:", response);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response;
    },

    /**
     * Upload or update user profile picture
     * @param file - Profile picture file
     * @returns Updated user profile with new profile picture
     */
    updateProfilePicture: async (file: File): Promise<UpdateProfilePictureResponse> => {
        console.log("Uploading profile picture:", file.name);
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.put<UpdateProfilePictureResponse>(
            "/users/profile-picture",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log("Update Profile Picture Response:", response);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response;
    },

    /**
     * Upload or update user cover picture
     * @param file - Cover picture file
     * @returns Updated user profile with new cover picture
     */
    updateCoverPicture: async (file: File): Promise<UpdateCoverPictureResponse> => {
        console.log("Uploading cover picture:", file.name);
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.put<UpdateCoverPictureResponse>(
            "/users/cover-picture",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log("Update Cover Picture Response:", response);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response;
    },

    /**
     * Get any user's profile by their ID
     * @param userId - The ID of the user to fetch
     * @returns User profile data
     */
    getUserById: async (userId: number): Promise<GetUserByIdResponse> => {
        console.log("Fetching user profile for userId:", userId);
        const response = await api.get<GetUserByIdResponse>(`/users/${userId}`);
        console.log("User Profile Response:", response);
        return response;
    },

    /**
     * Get nearby general users from the same wada
     * @returns List of nearby general users
     */
    getNearbyGeneralUsers: async (): Promise<GetNearbyGeneralUsersResponse> => {
        console.log("Fetching nearby general users...");
        const response = await api.get<GetNearbyGeneralUsersResponse>("/users/nearby");
        console.log("Nearby General Users Response:", response);
        return response;
    },

    /**
     * Get nearby institutions from wada, palika, and district
     * @returns List of nearby institutions (government offices, businesses)
     */
    getNearbyInstitutions: async (): Promise<GetNearbyInstitutionsResponse> => {
        console.log("Fetching nearby institutions...");
        const response = await api.get<GetNearbyInstitutionsResponse>("/users/institutions");
        console.log("Nearby Institutions Response:", response);
        return response;
    },
};