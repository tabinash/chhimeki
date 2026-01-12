import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { storefrontRepository } from "@/repository/storefrontRepository";
import { UpdateStorefrontResponse } from "@/types/api/storefront";
import { ApiError } from "@/repository/http";

/**
 * Info-only update request (no images)
 */
export interface UpdateStorefrontInfoRequest {
    name?: string;
    description?: string;
    contactPhone?: string;
    contactEmail?: string;
    palika?: string;
    district?: string;
}

/**
 * Hook to update storefront general info (text fields only, no images)
 * Uses the updateStorefront API with only text fields
 */
export function useUpdateStorefrontInfo(): UseMutationResult<
    UpdateStorefrontResponse,
    ApiError,
    UpdateStorefrontInfoRequest
> {
    const queryClient = useQueryClient();

    return useMutation<UpdateStorefrontResponse, ApiError, UpdateStorefrontInfoRequest>({
        mutationFn: (data) => storefrontRepository.updateStorefront(data),
        onError: (error) => {
            console.error("Failed to update storefront", error);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["storefront", "me"] });
            queryClient.invalidateQueries({ queryKey: ["storefronts", "all"] });
            console.log("Storefront updated successfully", response);
            if (response.data?.id) {
                queryClient.invalidateQueries({ queryKey: ["storefront", response.data.id] });
            }
        },
    });
}
