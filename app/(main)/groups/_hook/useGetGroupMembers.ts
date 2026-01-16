import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { groupRepository } from "@/repository/groupRepository";
import { GetGroupMembersResponse, GetGroupMembersParams } from "@/types/api/group";
import { ApiError } from "@/types/api/common";

export function useGetGroupMembers(
    groupId: number | null | undefined,
    params?: GetGroupMembersParams
): UseQueryResult<GetGroupMembersResponse, ApiError> {
    return useQuery<GetGroupMembersResponse, ApiError>({
        queryKey: ["groupMembers", groupId, params?.page ?? 0, params?.size ?? 20],
        queryFn: () => groupRepository.getGroupMembers(groupId!, params),
        enabled: !!groupId,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}
