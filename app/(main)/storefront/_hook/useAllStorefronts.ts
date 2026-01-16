import { useQuery } from "@tanstack/react-query";
import { storefrontRepository } from "@/repository/storefrontRepository";
import { GetAllStorefrontsParams, GetAllStorefrontsResponse } from "@/types/api/storefront";

export function useAllStorefronts(params?: GetAllStorefrontsParams) {
    return useQuery<GetAllStorefrontsResponse>({
        queryKey: ["storefronts", params],
        queryFn: () => storefrontRepository.getAllStorefronts(params),
        staleTime: 60000, // 1 minute
    });
}
