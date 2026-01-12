import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { storefrontRepository } from "@/repository/storefrontRepository";
import { UpdateStorefrontRequest, UpdateStorefrontResponse } from "@/types/api/storefront";
import { ApiError } from "@/repository/http";

/**
 * Hook to update the current user's storefront
 * Invalidates storefront queries on success
 * @returns Mutation result for updating a storefront
 */
export function useUpdateStorefront(): UseMutationResult<
    UpdateStorefrontResponse,
    ApiError,
    UpdateStorefrontRequest
> {
    const queryClient = useQueryClient();

    return useMutation<UpdateStorefrontResponse, ApiError, UpdateStorefrontRequest>({
        mutationFn: (data) => storefrontRepository.updateStorefront(data),
        onSuccess: (response) => {
            // Invalidate and update related queries
            queryClient.invalidateQueries({ queryKey: ["storefront", "me"] });
            queryClient.invalidateQueries({ queryKey: ["storefronts", "all"] });
            // Also invalidate the specific storefront if we have the ID
            if (response.data?.id) {
                queryClient.invalidateQueries({ queryKey: ["storefront", response.data.id] });
            }
        },
    });
}
