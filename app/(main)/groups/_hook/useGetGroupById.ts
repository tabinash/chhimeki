import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { groupRepository } from "@/repository/groupRepository";
import { GetGroupByIdResponse } from "@/types/api/group";
import { ApiError } from "@/types/api/common";

export function useGetGroupById(
    groupId: number | null | undefined
): UseQueryResult<GetGroupByIdResponse, ApiError> {
    return useQuery<GetGroupByIdResponse, ApiError>({
        queryKey: ["groupById", groupId],
        queryFn: () => groupRepository.getGroupById(groupId!),
        enabled: !!groupId,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
