import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { productRepository } from "@/repository/productRepository";
import { GetUserProductsResponse, GetUserProductsParams } from "@/types/api/products";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch products listed by a specific user
 * @param userId - The ID of the user whose products to fetch
 * @param params - Optional pagination parameters
 * @returns Query result with paginated user products
 */
export function useUserProducts(
    userId: number,
    params?: GetUserProductsParams
): UseQueryResult<GetUserProductsResponse, ApiError> {
    return useQuery<GetUserProductsResponse, ApiError>({
        queryKey: ["userProducts", userId, params?.page, params?.size],
        queryFn: () => productRepository.getUserProducts(userId, params),
        enabled: !!userId && userId > 0,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}
