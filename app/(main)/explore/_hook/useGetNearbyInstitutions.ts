import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { userRepository } from "@/repository/userRepository";
import { GetNearbyInstitutionsResponse } from "@/types/api/user";
import { ApiError } from "@/types/api/common";

export function useGetNearbyInstitutions(): UseQueryResult<GetNearbyInstitutionsResponse, ApiError> {
    return useQuery<GetNearbyInstitutionsResponse, ApiError>({
        queryKey: ["nearbyInstitutions"],
        queryFn: () => userRepository.getNearbyInstitutions(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
