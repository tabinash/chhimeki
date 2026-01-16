"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useState, ChangeEvent } from "react";
import {
    Users,
    ArrowLeft,
    ShieldCheck,
    Loader2,
    Camera,
    Edit3,
} from "lucide-react";
import { GroupResponse } from "@/types/api/group";
import { useJoinGroup, useLeaveGroup, useUpdateGroup, useDeleteGroup } from "../_hook";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditGroupModal from "./EditGroupModal";

interface GroupHeaderProps {
    group: GroupResponse;
}


export default function GroupHeader({ group }: GroupHeaderProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "posts";

    // Refs for file inputs
    const coverImageInputRef = useRef<HTMLInputElement>(null);
    const profileImageInputRef = useRef<HTMLInputElement>(null);

    // State for modals
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Mutation hooks
    const joinMutation = useJoinGroup();
    const leaveMutation = useLeaveGroup();
    const updateGroupMutation = useUpdateGroup(group.id);
    const deleteMutation = useDeleteGroup();

    const tabs = [
        { id: "posts", label: "Posts" },
        { id: "members", label: "Members" },
        { id: "about", label: "About" },
        { id: "media", label: "Media" },
    ];

    // Default images
    const coverImage = group.coverImage || "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=400&fit=crop";
    const profileImage = group.profileImage;

    // Handle image updates
    const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateGroupMutation.mutate({ coverImage: file });
        }
    };

    const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateGroupMutation.mutate({ profileImage: file });
        }
    };

    const handleJoinLeave = () => {
        if (group.isMember) {
            // Admin cannot leave their own group
            if (group.isAdmin) {
                alert("Admins cannot leave their own group");
                return;
            }
            leaveMutation.mutate(group.id);
        } else {
            joinMutation.mutate(group.id);
        }
    };

    const handleDeleteGroup = () => {
        deleteMutation.mutate(group.id, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                // Redirect to groups page after successful deletion
                router.push("/groups");
            },
            onError: (error) => {
                alert(`Failed to delete group: ${error.message}`);
            },
        });
    };

    const handleEditGroup = (data: { name: string; description: string }) => {
        updateGroupMutation.mutate(
            { name: data.name, description: data.description },
            {
                onSuccess: () => {
                    setIsEditModalOpen(false);
                },
                onError: (error) => {
                    alert(`Failed to update group: ${error.message}`);
                },
            }
        );
    };

    const isLoading = joinMutation.isPending || leaveMutation.isPending;
    const isUpdating = updateGroupMutation.isPending;

    return (
        <>
            <div className="bg-white pb-1">
                {/* Cover Photo */}
                <div className="relative h-40 md:h-52 bg-gray-100">
                    <Image
                        src={coverImage}
                        alt="Cover"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-colors z-10"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>


                    {/* Cover Image Edit Button (Admin only) */}
                    {group.isAdmin && (
                        <>
                            <input
                                ref={coverImageInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleCoverChange}
                            />
                            <button
                                onClick={() => coverImageInputRef.current?.click()}
                                disabled={isUpdating}
                                className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium hover:bg-black/70 transition-colors z-10 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUpdating ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                    <Camera className="w-3.5 h-3.5" />
                                )}
                                Edit
                            </button>
                        </>
                    )}
                </div>

                {/* Group Info */}
                <div className="px-4 relative">
                    {/* Avatar & Actions Row */}
                    <div className="flex justify-between items-end -mt-10 mb-4">
                        {/* Group Avatar */}
                        <div className="relative">
                            <div className=" ">
                                {profileImage ? (
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden relative">
                                        <Image
                                            src={profileImage}
                                            alt={group.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <Users className="w-10 h-10 text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Profile Image Edit Button (Admin only) */}
                            {group.isAdmin && (
                                <>
                                    <input
                                        ref={profileImageInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleProfileImageChange}
                                    />
                                    <button
                                        onClick={() => profileImageInputRef.current?.click()}
                                        disabled={isUpdating}
                                        className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center border-2 border-white shadow-md text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Change profile picture"
                                    >
                                        {isUpdating ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Camera className="w-4 h-4" />
                                        )}
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mb-1">
                            {group.isMember ? (
                                <>
                                    {/* Edit - Admin only */}
                                    {group.isAdmin && (
                                        <button
                                            onClick={() => setIsEditModalOpen(true)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                                            title="Edit Group"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            Edit
                                        </button>
                                    )}
                                    {/* Delete - Admin only */}
                                    {group.isAdmin && (
                                        <button
                                            onClick={() => setIsDeleteModalOpen(true)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-bold hover:bg-red-700 transition-colors"
                                            title="Delete Group"
                                        >
                                            Delete
                                        </button>
                                    )}
                                    {/* Leave - Members only (admin cannot leave) */}
                                    {!group.isAdmin && (
                                        <button
                                            onClick={handleJoinLeave}
                                            disabled={isLoading}
                                            className="px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-bold border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Leave Group"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                "Leave Group"
                                            )}
                                        </button>
                                    )}
                                </>
                            ) : (
                                /* Join - Non-members only (direct join, no approval) */
                                <button
                                    onClick={handleJoinLeave}
                                    disabled={isLoading}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Joining...
                                        </>
                                    ) : (
                                        "Join Group"
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Name & Description */}
                    <div className="mb-5">
                        <h1 className="text-2xl font-bold text-gray-900 leading-tight">{group.name}</h1>

                        {group.description && (
                            <p className="text-gray-600 text-[15px] mt-1 line-clamp-2">
                                {group.description}
                            </p>
                        )}

                        {/* Stats & Admin Row */}
                        <div className="flex items-center gap-4 mt-3">
                            {/* Member Count */}
                            <div className="flex bg-[#e4e1dd] px-2 py-1 rounded-full items-center gap-1.5">
                                <Users className="w-6 h-6 text-gray-500" />
                                <span className="font-bold text-gray-900">{group.memberCount.toLocaleString()}</span>
                                <span className="text-gray-500  text-[15px] font-medium">members</span>
                            </div>



                            {/* Admin Info */}
                            <div className="flex bg-[#e4e1dd] px-2 py-1 rounded-full items-center gap-1.5">
                                <ShieldCheck className="w-5 h-5 text-orange-500" />
                                <span className="text-gray-500 text-[15px]">Admin:</span>
                                <span className="font-medium text-gray-900 text-[15px]">{group.admin.name}</span>
                            </div>
                        </div>

                        {/* Membership Badge */}
                        {group.isMember && (
                            <div className="mt-3">
                                <span className={`inline-block px-2.5 py-1 rounded-full text-[15px] font-bold ${group.isAdmin
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-green-100 text-green-700"
                                    }`}>
                                    {group.isAdmin ? "Admin" : "Member"}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-6 border-b border-gray-300 -mx-4 px-4 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.id}
                                href={`/groups/${group.id}?tab=${tab.id}`}
                                className={`relative py-3 text-base font-bold whitespace-nowrap transition-colors ${activeTab === tab.id
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-900 hover:text-gray-700"
                                    }`}
                            >
                                {tab.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteGroup}
                isLoading={deleteMutation.isPending}
                title="Delete Group"
                itemName={group.name}
                description="This action cannot be undone. All posts and data will be permanently removed."
            />

            {/* Edit Group Modal */}
            <EditGroupModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleEditGroup}
                isLoading={isUpdating}
                currentName={group.name}
                currentDescription={group.description || ""}
            />
        </>
    );
}
