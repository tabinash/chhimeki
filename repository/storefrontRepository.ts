import { api } from "./http";
import {
    CreateStorefrontRequest,
    CreateStorefrontResponse,
    UpdateStorefrontRequest,
    UpdateStorefrontResponse,
    GetMyStorefrontResponse,
    DeleteStorefrontResponse,
    GetStorefrontByIdResponse,
    GetAllStorefrontsParams,
    GetAllStorefrontsResponse,
} from "@/types/api/storefront";

// ============================================
// STOREFRONT REPOSITORY - Available APIs
// ============================================
// 1. createStorefront()        POST   /api/storefronts (multipart/JSON)       -- Create with optional logo/cover
// 2. updateStorefront()        PUT    /api/storefronts/update (multipart/JSON) -- Update details/images
// 3. deleteStorefront()        DELETE /api/storefronts/close                   -- Soft delete (close)
// 4. getMyStorefront()         GET    /api/storefronts/me                      -- Own storefront (null if none)
// 5. getStorefrontById()       GET    /api/storefronts/{id}                    -- Public, any storefront
// 6. getAllStorefronts()       GET    /api/storefronts                         -- Public, paginated
// ============================================

export const storefrontRepository = {
    /**
     * Create a new storefront
     * Content-Type: multipart/form-data (if images) OR application/json (text only)
     */
    createStorefront: async (data: CreateStorefrontRequest): Promise<CreateStorefrontResponse> => {
        console.log("Creating storefront:", data.name);

        // Use multipart if images provided, otherwise JSON
        if (data.logo || data.coverImage) {
            const formData = new FormData();

            // Add text fields
            formData.append("name", data.name);
            if (data.description) formData.append("description", data.description);
            formData.append("contactPhone", data.contactPhone);
            if (data.contactEmail) formData.append("contactEmail", data.contactEmail);
            formData.append("palika", data.palika);
            formData.append("district", data.district);

            // Add optional images
            if (data.logo) formData.append("logo", data.logo);
            if (data.coverImage) formData.append("coverImage", data.coverImage);

            const response = await api.post<CreateStorefrontResponse>("/storefronts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Create Storefront Response:", response);
            return response;
        } else {
            // JSON request (no images)
            const response = await api.post<CreateStorefrontResponse>("/storefronts", {
                name: data.name,
                description: data.description,
                contactPhone: data.contactPhone,
                contactEmail: data.contactEmail,
                palika: data.palika,
                district: data.district,
            });
            console.log("Create Storefront Response:", response);
            return response;
        }
    },

    /**
     * Update own storefront
     * Content-Type: multipart/form-data (if images) OR application/json (text only)
     */
    updateStorefront: async (data: UpdateStorefrontRequest): Promise<UpdateStorefrontResponse> => {
        console.log("Updating storefront with data:", data);

        // Use multipart if images provided, otherwise JSON
        if (data.logo || data.coverImage) {
            const formData = new FormData();

            // Add optional text fields
            if (data.name) formData.append("name", data.name);
            if (data.description) formData.append("description", data.description);
            if (data.contactPhone) formData.append("contactPhone", data.contactPhone);
            if (data.contactEmail) formData.append("contactEmail", data.contactEmail);
            if (data.palika) formData.append("palika", data.palika);
            if (data.district) formData.append("district", data.district);

            // Add optional images
            if (data.logo) formData.append("logo", data.logo);
            if (data.coverImage) formData.append("coverImage", data.coverImage);

            const response = await api.put<UpdateStorefrontResponse>(
                "/storefronts/update",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Update Storefront Response:", response);
            return response;
        } else {
            // JSON request (no images)
            const response = await api.put<UpdateStorefrontResponse>("/storefronts/update", data);
            console.log("Update Storefront Response:", response);
            return response;
        }
    },

    /**
     * Delete (close) own storefront (soft delete)
     */
    deleteStorefront: async (): Promise<DeleteStorefrontResponse> => {
        console.log("Closing storefront");
        const response = await api.delete<DeleteStorefrontResponse>("/storefronts/close");
        console.log("Delete Storefront Response:", response);
        return response;
    },

    /**
     * Get own storefront details
     * Returns null in data if user has no active storefront
     */
    getMyStorefront: async (): Promise<GetMyStorefrontResponse> => {
        console.log("Fetching my storefront");
        const response = await api.get<GetMyStorefrontResponse>("/storefronts/me");
        console.log("My Storefront Response:", response);
        return response;
    },

    /**
     * Get storefront details by ID (public)
     */
    getStorefrontById: async (storefrontId: number): Promise<GetStorefrontByIdResponse> => {
        console.log("Fetching storefront with ID:", storefrontId);
        const response = await api.get<GetStorefrontByIdResponse>(`/storefronts/${storefrontId}`);
        console.log("Get Storefront Response:", response);
        return response;
    },

    /**
     * Get all active storefronts (public, paginated)
     */
    getAllStorefronts: async (
        params?: GetAllStorefrontsParams
    ): Promise<GetAllStorefrontsResponse> => {
        console.log("Fetching all storefronts with params:", params);
        const response = await api.get<GetAllStorefrontsResponse>("/storefronts", {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
            },
        });
        console.log("All Storefronts Response:", response);
        return response;
    },
};