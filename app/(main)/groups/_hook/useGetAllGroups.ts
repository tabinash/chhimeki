import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { groupRepository } from "@/repository/groupRepository";
import { GetAllGroupsResponse, GetAllGroupsParams } from "@/types/api/group";
import { ApiError } from "@/types/api/common";

export function useGetAllGroups(
    params?: GetAllGroupsParams
): UseQueryResult<GetAllGroupsResponse, ApiError> {
    return useQuery<GetAllGroupsResponse, ApiError>({
        queryKey: ["allGroups", params?.page ?? 0, params?.size ?? 20],
        queryFn: () => groupRepository.getAllGroups(params),
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}
