import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { storefrontRepository } from "@/repository/storefrontRepository";
import { CreateStorefrontRequest, CreateStorefrontResponse } from "@/types/api/storefront";
import { ApiError } from "@/repository/http";

/**
 * Hook to create a new storefront
 * Invalidates storefront queries on success
 * @returns Mutation result for creating a storefront
 */
export function useCreateStorefront(): UseMutationResult<
    CreateStorefrontResponse,
    ApiError,
    CreateStorefrontRequest
> {
    const queryClient = useQueryClient();

    return useMutation<CreateStorefrontResponse, ApiError, CreateStorefrontRequest>({
        mutationFn: (data) => storefrontRepository.createStorefront(data),
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: ["storefront", "me"] });
            queryClient.invalidateQueries({ queryKey: ["storefronts", "all"] });
        },
    });
}
