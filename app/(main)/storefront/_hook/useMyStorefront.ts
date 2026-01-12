import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { storefrontRepository } from "@/repository/storefrontRepository";
import { GetMyStorefrontResponse } from "@/types/api/storefront";
import { ApiError } from "@/repository/http";

/**
 * Hook to fetch the current user's storefront
 * Returns null in data if user has no active storefront
 * @returns Query result with current user's storefront data
 */
export function useMyStorefront(): UseQueryResult<GetMyStorefrontResponse, ApiError> {
    return useQuery<GetMyStorefrontResponse, ApiError>({
        queryKey: ["storefront", "me"],
        queryFn: () => storefrontRepository.getMyStorefront(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
