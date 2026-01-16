import { useQuery } from "@tanstack/react-query";
import { storefrontRepository } from "@/repository/storefrontRepository";
import { GetMyStorefrontResponse } from "@/types/api/storefront";

export function useMyStorefront() {
    return useQuery<GetMyStorefrontResponse>({
        queryKey: ["storefront", "me"],
        queryFn: () => storefrontRepository.getMyStorefront(),
        staleTime: 60000, // 1 minute
    });
}
