import { useQuery } from "@tanstack/react-query";
import { productRepository } from "@/repository/productRepository";
import { GetStorefrontProductsParams } from "@/types/api/products";

/**
 * Hook to fetch products for a specific storefront
 * @param storefrontId - The storefront ID to fetch products for
 * @param params - Optional pagination params
 */
export function useStorefrontProducts(storefrontId: number, params?: GetStorefrontProductsParams) {
    return useQuery({
        queryKey: ["storefrontProducts", storefrontId, params?.page, params?.size],
        queryFn: () => productRepository.getStorefrontProducts(storefrontId, params),
        enabled: storefrontId > 0,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
}
