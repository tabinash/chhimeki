import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { productRepository } from "@/repository/productRepository";
import { GetUserProductsResponse, GetUserProductsParams } from "@/types/api/products";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch current user's product listings
 * @param userId - Current user's ID
 * @param params - Optional status filter and pagination
 * @returns Query result with paginated user products
 */
export function useMyProducts(
    userId: number,
    params?: GetUserProductsParams
): UseQueryResult<GetUserProductsResponse, ApiError> {
    return useQuery<GetUserProductsResponse, ApiError>({
        queryKey: ["myProducts", userId, params?.status, params?.page, params?.size],
        queryFn: () => productRepository.getUserProducts(userId, params),
        enabled: !!userId && userId > 0,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}
