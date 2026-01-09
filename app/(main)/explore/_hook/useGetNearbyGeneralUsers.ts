import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { userRepository } from "@/repository/userRepository";
import { GetNearbyGeneralUsersResponse } from "@/types/api/user";
import { ApiError } from "@/types/api/common";

export function useGetNearbyGeneralUsers(): UseQueryResult<GetNearbyGeneralUsersResponse, ApiError> {
    return useQuery<GetNearbyGeneralUsersResponse, ApiError>({
        queryKey: ["nearbyGeneralUsers"],
        queryFn: () => userRepository.getNearbyGeneralUsers(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
