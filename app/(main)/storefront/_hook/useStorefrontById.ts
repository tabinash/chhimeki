import { useQuery } from "@tanstack/react-query";
import { storefrontRepository } from "@/repository/storefrontRepository";
import { GetStorefrontByIdResponse } from "@/types/api/storefront";

export function useStorefrontById(storefrontId: number | null) {
    return useQuery<GetStorefrontByIdResponse>({
        queryKey: ["storefront", storefrontId],
        queryFn: () => {
            if (!storefrontId) {
                throw new Error("storefrontId is required");
            }
            return storefrontRepository.getStorefrontById(storefrontId);
        },
        enabled: !!storefrontId,
        staleTime: 60000, // 1 minute
    });
}
