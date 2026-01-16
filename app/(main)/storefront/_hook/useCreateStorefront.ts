import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storefrontRepository } from "@/repository/storefrontRepository";
import { CreateStorefrontRequest, CreateStorefrontResponse } from "@/types/api/storefront";

export function useCreateStorefront() {
    const queryClient = useQueryClient();

    return useMutation<CreateStorefrontResponse, Error, CreateStorefrontRequest>({
        mutationFn: (data: CreateStorefrontRequest) => storefrontRepository.createStorefront(data),
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
