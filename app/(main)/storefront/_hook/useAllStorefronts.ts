import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { storefrontRepository } from "@/repository/storefrontRepository";
import { GetAllStorefrontsResponse, GetAllStorefrontsParams } from "@/types/api/storefront";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch all storefronts (paginated)
 * @param params - Pagination parameters (page, size)
 * @returns Query result with paginated storefront list
 */
export function useAllStorefronts(
    params?: GetAllStorefrontsParams
): UseQueryResult<GetAllStorefrontsResponse, ApiError> {
    return useQuery<GetAllStorefrontsResponse, ApiError>({
        queryKey: ["storefronts", "all", params?.page ?? 0, params?.size ?? 20],
        queryFn: () => storefrontRepository.getAllStorefronts(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
