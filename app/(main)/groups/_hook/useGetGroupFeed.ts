import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { groupRepository } from "@/repository/groupRepository";
import { GetGroupFeedResponse, GetGroupFeedParams } from "@/types/api/group";
import { ApiError } from "@/types/api/common";

export function useGetGroupFeed(
    groupId: number | null | undefined,
    params?: GetGroupFeedParams
): UseQueryResult<GetGroupFeedResponse, ApiError> {
    return useQuery<GetGroupFeedResponse, ApiError>({
        queryKey: ["groupFeed", groupId, params?.page ?? 0, params?.size ?? 20],
        queryFn: () => groupRepository.getGroupFeed(groupId!, params),
        enabled: !!groupId,
        staleTime: 1 * 60 * 1000, // 1 minute (feed data is more dynamic)
    });
}
