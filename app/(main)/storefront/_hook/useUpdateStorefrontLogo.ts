import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { storefrontRepository } from "@/repository/storefrontRepository";
import { UpdateStorefrontResponse } from "@/types/api/storefront";
import { ApiError } from "@/repository/http";

/**
 * Hook to update the storefront logo (profile image)
 * Uses the updateStorefront API with only the logo field
 */
export function useUpdateStorefrontLogo(): UseMutationResult<
    UpdateStorefrontResponse,
    ApiError,
    File
> {
    const queryClient = useQueryClient();

    return useMutation<UpdateStorefrontResponse, ApiError, File>({
        mutationFn: (logoFile) => storefrontRepository.updateStorefront({ logo: logoFile }),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["storefront", "me"] });
            queryClient.invalidateQueries({ queryKey: ["storefronts", "all"] });
            if (response.data?.id) {
                queryClient.invalidateQueries({ queryKey: ["storefront", response.data.id] });
            }
        },
    });
}
