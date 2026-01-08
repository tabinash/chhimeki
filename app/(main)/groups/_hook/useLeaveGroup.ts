import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { groupRepository } from "@/repository/groupRepository";
import { LeaveGroupResponse } from "@/types/api/group";
import { ApiError } from "@/types/api/common";

export function useLeaveGroup(): UseMutationResult<
    LeaveGroupResponse,
    ApiError,
    number
> {
    const queryClient = useQueryClient();

    return useMutation<LeaveGroupResponse, ApiError, number>({
        mutationFn: (groupId: number) => groupRepository.leaveGroup(groupId),
        onSuccess: (_, groupId) => {
            // Update group details and lists
            queryClient.invalidateQueries({ queryKey: ["group", groupId] });
            queryClient.invalidateQueries({ queryKey: ["allGroups"] });
            queryClient.invalidateQueries({ queryKey: ["myGroups"] });
            // Also invalidate group feed and members since user is no longer a member
            queryClient.removeQueries({ queryKey: ["groupFeed", groupId] });
            queryClient.removeQueries({ queryKey: ["groupMembers", groupId] });
        },
    });
}
