import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { storefrontRepository } from "@/repository/storefrontRepository";
import { DeleteStorefrontResponse } from "@/types/api/storefront";
import { ApiError } from "@/repository/http";

/**
 * Hook to delete (close) the current user's storefront
 * Invalidates storefront queries on success
 * @returns Mutation result for deleting a storefront
 */
export function useDeleteStorefront(): UseMutationResult<
    DeleteStorefrontResponse,
    ApiError,
    void
> {
    const queryClient = useQueryClient();

    return useMutation<DeleteStorefrontResponse, ApiError, void>({
        mutationFn: () => storefrontRepository.deleteStorefront(),
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: ["storefront", "me"] });
            queryClient.invalidateQueries({ queryKey: ["storefronts", "all"] });
        },
    });
}
