import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { storefrontRepository } from "@/repository/storefrontRepository";
import { GetStorefrontByIdResponse } from "@/types/api/storefront";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch a storefront by its ID
 * @param storefrontId - The ID of the storefront to fetch
 * @returns Query result with storefront data
 */
export function useStorefrontById(
    storefrontId: number
): UseQueryResult<GetStorefrontByIdResponse, ApiError> {
    return useQuery<GetStorefrontByIdResponse, ApiError>({
        queryKey: ["storefront", storefrontId],
        queryFn: () => storefrontRepository.getStorefrontById(storefrontId),
        enabled: !!storefrontId && storefrontId > 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
