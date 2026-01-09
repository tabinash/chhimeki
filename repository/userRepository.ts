import { api } from "./http";
import {
    GetCurrentUserProfileResponse,
    UpdateProfileRequest,
    UpdateProfileResponse,
    GetUserByIdResponse,
    GetNearbyGeneralUsersResponse,
    GetNearbyInstitutionsResponse,
    FollowUserResponse,
    UnfollowUserResponse,
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
     * Update user profile (unified endpoint for all profile updates)
     * Uses purpose field to determine what is being updated:
     * - profile_info: name and/or dateOfBirth (JSON)
     * - profile_picture: profile picture only (FormData)
     * - cover_picture: cover picture only (FormData)
     * 
     * @param data - Profile update data with purpose
     * @returns Updated user profile
     */
    updateProfile: async (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
        console.log("Updating profile with purpose:", data.purpose);

        switch (data.purpose) {
            case "profile_info": {
                // Send JSON for profile info updates
                const jsonData: { name?: string; dateOfBirth?: string } = {};
                if (data.name) jsonData.name = data.name;
                if (data.dateOfBirth) jsonData.dateOfBirth = data.dateOfBirth;

                const response = await api.put<UpdateProfileResponse>("/users/profile", jsonData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                console.log("Update Profile Info Response:", response);
                localStorage.setItem("user", JSON.stringify(response.data));
                return response;
            }

            case "profile_picture": {
                // Send FormData with only profile picture
                if (!data.profilePicture) {
                    throw new Error("Profile picture is required when purpose is profile_picture");
                }

                const formData = new FormData();
                formData.append("profilePicture", data.profilePicture);

                const response = await api.put<UpdateProfileResponse>(
                    "/users/profile",
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
            }

            case "cover_picture": {
                // Send FormData with only cover picture
                if (!data.coverPicture) {
                    throw new Error("Cover picture is required when purpose is cover_picture");
                }

                const formData = new FormData();
                formData.append("coverPicture", data.coverPicture);

                const response = await api.put<UpdateProfileResponse>(
                    "/users/profile",
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
            }

            default:
                throw new Error(`Unknown update purpose: ${data.purpose}`);
        }
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

    /**
     * Follow a user
     * @param userId - The ID of the user to follow
     * @returns Success response
     */
    followUser: async (userId: number): Promise<FollowUserResponse> => {
        console.log("Following user ID:", userId);
        const response = await api.post<FollowUserResponse>(`/users/${userId}/follow`);
        console.log("Follow User Response:", response);
        return response;
    },

    /**
     * Unfollow a user
     * @param userId - The ID of the user to unfollow
     * @returns Success response
     */
    unfollowUser: async (userId: number): Promise<UnfollowUserResponse> => {
        console.log("Unfollowing user ID:", userId);
        const response = await api.delete<UnfollowUserResponse>(`/users/${userId}/follow`);
        console.log("Unfollow User Response:", response);
        return response;
    },
};