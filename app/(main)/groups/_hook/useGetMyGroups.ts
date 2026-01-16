import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { groupRepository } from "@/repository/groupRepository";
import { GetMyGroupsResponse, GetMyGroupsParams } from "@/types/api/group";
import { ApiError } from "@/types/api/common";

export function useGetMyGroups(
    params?: GetMyGroupsParams
): UseQueryResult<GetMyGroupsResponse, ApiError> {
    return useQuery<GetMyGroupsResponse, ApiError>({
        queryKey: ["myGroups", params?.page ?? 0, params?.size ?? 20],
        queryFn: () => groupRepository.getMyGroups(params),
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}
