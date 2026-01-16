import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { groupRepository } from "@/repository/groupRepository";
import { CreateGroupRequest, CreateGroupResponse } from "@/types/api/group";
import { ApiError } from "@/types/api/common";

export function useCreateGroup(): UseMutationResult<
    CreateGroupResponse,
    ApiError,
    CreateGroupRequest
> {
    const queryClient = useQueryClient();

    return useMutation<CreateGroupResponse, ApiError, CreateGroupRequest>({
        mutationFn: (data: CreateGroupRequest) => groupRepository.createGroup(data),
        onSuccess: () => {
            // Invalidate and refetch groups lists
            queryClient.invalidateQueries({ queryKey: ["allGroups"] });
            queryClient.invalidateQueries({ queryKey: ["myGroups"] });
        },
    });
}
