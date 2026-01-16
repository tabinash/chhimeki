import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { groupRepository } from "@/repository/groupRepository";
import { RemoveMemberResponse } from "@/types/api/group";
import { ApiError } from "@/types/api/common";

interface RemoveMemberParams {
    groupId: number;
    userId: number;
}

export function useRemoveMember(): UseMutationResult<
    RemoveMemberResponse,
    ApiError,
    RemoveMemberParams
> {
    const queryClient = useQueryClient();

    return useMutation<RemoveMemberResponse, ApiError, RemoveMemberParams>({
        mutationFn: ({ groupId, userId }: RemoveMemberParams) =>
            groupRepository.removeMember(groupId, userId),
        onSuccess: (_, variables) => {
            // Update group details and members list
            queryClient.invalidateQueries({ queryKey: ["group", variables.groupId] });
            queryClient.invalidateQueries({ queryKey: ["groupMembers", variables.groupId] });
        },
    });
}
