import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { groupRepository } from "@/repository/groupRepository";
import { DeleteGroupResponse } from "@/types/api/group";
import { ApiError } from "@/types/api/common";

export function useDeleteGroup(): UseMutationResult<
    DeleteGroupResponse,
    ApiError,
    number
> {
    const queryClient = useQueryClient();

    return useMutation<DeleteGroupResponse, ApiError, number>({
        mutationFn: (groupId: number) => groupRepository.deleteGroup(groupId),
        onSuccess: (_, groupId) => {
            // Remove from cache and invalidate lists
            queryClient.removeQueries({ queryKey: ["group", groupId] });
            queryClient.invalidateQueries({ queryKey: ["allGroups"] });
            queryClient.invalidateQueries({ queryKey: ["myGroups"] });
        },
    });
}
