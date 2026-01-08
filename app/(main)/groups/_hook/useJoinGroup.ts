import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { groupRepository } from "@/repository/groupRepository";
import { JoinGroupResponse } from "@/types/api/group";
import { ApiError } from "@/types/api/common";

export function useJoinGroup(): UseMutationResult<
    JoinGroupResponse,
    ApiError,
    number
> {
    const queryClient = useQueryClient();

    return useMutation<JoinGroupResponse, ApiError, number>({
        mutationFn: (groupId: number) => groupRepository.joinGroup(groupId),
        onSuccess: (_, groupId) => {
            // Update group details and lists
            queryClient.invalidateQueries({ queryKey: ["group", groupId] });
            queryClient.invalidateQueries({ queryKey: ["allGroups"] });
            queryClient.invalidateQueries({ queryKey: ["myGroups"] });
        },
    });
}
