import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupRepository } from "@/repository/groupRepository";
import { UpdateGroupRequest, UpdateGroupResponse } from "@/types/api/group";
import { ApiError } from "@/types/api/common";

/**
 * Unified hook to update group
 * Supports updating:
 * - Group info only (name, description)
 * - Profile image only
 * - Cover image only
 * - Any combination of the above
 * 
 * Invalidates group cache on success
 */
export function useUpdateGroup(groupId: number) {
    const queryClient = useQueryClient();

    return useMutation<UpdateGroupResponse, ApiError, UpdateGroupRequest>({
        mutationFn: (data: UpdateGroupRequest) => groupRepository.updateGroup(groupId, data),
        onSuccess: () => {
            // Invalidate group detail cache to refresh data
            queryClient.invalidateQueries({ queryKey: ["groupById", groupId] });
            // Also invalidate group lists
            queryClient.invalidateQueries({ queryKey: ["allGroups"] });
            queryClient.invalidateQueries({ queryKey: ["myGroups"] });
        },
    });
}
