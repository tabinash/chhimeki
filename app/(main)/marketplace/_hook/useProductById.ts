import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { productRepository } from "@/repository/productRepository";
import { GetProductByIdResponse } from "@/types/api/products";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch a single product by its ID
 * @param productId - ID of the product to fetch
 * @returns Query result with full product details
 */
export function useProductById(
    productId: number
): UseQueryResult<GetProductByIdResponse, ApiError> {
    return useQuery<GetProductByIdResponse, ApiError>({
        queryKey: ["product", productId],
        queryFn: () => productRepository.getProductById(productId),
        enabled: !!productId && productId > 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
