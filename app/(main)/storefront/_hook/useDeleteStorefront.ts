import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storefrontRepository } from "@/repository/storefrontRepository";
import { DeleteStorefrontResponse } from "@/types/api/storefront";

export function useDeleteStorefront() {
    const queryClient = useQueryClient();

    return useMutation<DeleteStorefrontResponse, Error, void>({
        mutationFn: () => storefrontRepository.deleteStorefront(),
        onSuccess: () => {
            // Invalidate my storefront query
            queryClient.invalidateQueries({
                queryKey: ["storefront", "me"],
            });

            // Invalidate all storefronts list
            queryClient.invalidateQueries({
                queryKey: ["storefronts"],
            });
        },
    });
}
