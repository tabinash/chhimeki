import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storefrontRepository } from "@/repository/storefrontRepository";
import { UpdateStorefrontRequest, UpdateStorefrontResponse } from "@/types/api/storefront";

export function useUpdateStorefront() {
    const queryClient = useQueryClient();

    return useMutation<UpdateStorefrontResponse, Error, UpdateStorefrontRequest>({
        mutationFn: (data: UpdateStorefrontRequest) => storefrontRepository.updateStorefront(data),
        onSuccess: (response) => {
            // Invalidate my storefront query
            queryClient.invalidateQueries({
                queryKey: ["storefront", "me"],
            });

            // Invalidate specific storefront by ID if we have it
            if (response.data?.id) {
                queryClient.invalidateQueries({
                    queryKey: ["storefront", response.data.id],
                });
            }

            // Invalidate all storefronts list
            queryClient.invalidateQueries({
                queryKey: ["storefronts"],
            });
        },
    });
}
