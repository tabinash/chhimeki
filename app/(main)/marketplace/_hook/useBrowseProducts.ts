import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { productRepository } from "@/repository/productRepository";
import { BrowseProductsResponse, BrowseProductsParams, ProductCategory } from "@/types/api/products";
import { ApiError } from "@/repository/http";

/**
 * Hook to browse products by geography and optional category
 * @param geography - Required: Palika or District name
 * @param category - Optional: Filter by category
 * @param page - Optional: Page number (default: 0)
 * @param size - Optional: Items per page (default: 20)
 * @returns Query result with paginated products
 */
export function useBrowseProducts(
    geography: string,
    options?: {
        category?: ProductCategory;
        page?: number;
        size?: number;
        sort?: "createdAt" | "price";
        direction?: "ASC" | "DESC";
    }
): UseQueryResult<BrowseProductsResponse, ApiError> {
    const params: BrowseProductsParams = {
        geography,
        category: options?.category,
        page: options?.page ?? 0,
        size: options?.size ?? 20,
        sort: options?.sort ?? "createdAt",
        direction: options?.direction ?? "DESC",
    };

    return useQuery<BrowseProductsResponse, ApiError>({
        queryKey: ["browseProducts", geography, options?.category, options?.page, options?.size],
        queryFn: () => productRepository.browseProducts(params),
        enabled: !!geography && geography.length > 0,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}
