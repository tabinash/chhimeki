"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useRef, ChangeEvent } from "react";
import {
    Users,
    Settings,
    UserPlus,
    UserMinus,
    Shield,
    Loader2,
    MessageSquare,
    UserCheck,
    MoreHorizontal,
    Briefcase,
    Camera,
    X,
    Trash2,
} from "lucide-react";
import { GroupResponse } from "@/types/api/group";
import { useJoinGroup, useLeaveGroup, useUpdateGroup, useDeleteGroup } from "../../_hook";
import { useRouter } from "next/navigation";

interface GroupHeaderProps {
    group: GroupResponse;
}

export default function GroupHeader({ group }: GroupHeaderProps) {
    const params = useParams();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "feed";
    const groupId = Number(params.id);
    const router = useRouter();

    const joinMutation = useJoinGroup();
    const leaveMutation = useLeaveGroup();
    const updateGroup = useUpdateGroup(groupId);
    const deleteMutation = useDeleteGroup();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: group.name,
        description: group.description || ""
    });

    // Refs for file inputs
    const profileImageInputRef = useRef<HTMLInputElement>(null);
    const coverImageInputRef = useRef<HTMLInputElement>(null);

    const isAdmin = group.isAdmin;
    const isMember = group.isMember;

    // Default images
    const profileImage = group.profileImage || `https://ui-avatars.com/api/?background=6366f1&color=fff&name=${encodeURIComponent(group.name)}`;
    const coverImage = group.coverImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop";

    const handleJoinLeave = () => {
        if (isMember) {
            if (isAdmin) {
                alert("Admins cannot leave their own group");
                return;
            }
            leaveMutation.mutate(groupId);
        } else {
            joinMutation.mutate(groupId);
        }
    };

    // Handle image updates
    const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateGroup.mutate({ coverImage: file });
        }
    };

    const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateGroup.mutate({ profileImage: file });
        }
    };

    // Handle group info update
    const handleGroupInfoSave = () => {
        updateGroup.mutate(
            {
                name: formData.name,
                description: formData.description || undefined,
            },
            {
                onSuccess: () => {
                    setIsEditModalOpen(false);
                },
            }
        );
    };

    const handleDeleteGroup = () => {
        deleteMutation.mutate(groupId, {
            onSuccess: () => {
                // Redirect to groups page after successful deletion
                router.push("/groups");
            },
            onError: (error) => {
                alert(`Failed to delete group: ${error.message}`);
            },
        });
    };

    const tabs = [
        { id: "feed", label: "Feed", icon: <Briefcase className="w-4 h-4" /> },
        { id: "members", label: "Members", icon: <Users className="w-4 h-4" /> },
    ];

    return (
        <div className="max-w-6xl mx-auto pt-6 px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Cover Photo */}
                <div className="relative h-48 sm:h-64 md:h-80 bg-gray-100">
                    <Image
                        src={coverImage}
                        alt="Cover"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Cover Edit Button (admin only) */}
                    {isAdmin && (
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
                                disabled={updateGroup.isPending}
                                className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-xs font-bold hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed z-10 cursor-pointer"
                            >
                                {updateGroup.isPending ? (
                                    <>
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <Camera className="w-4 h-4" />
                                )}
                            </button>
                        </>
                    )}
                </div>

                {/* Group Header Content */}
                <div className="px-6 pb-6 sm:px-10">
                    <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-12 md:-mt-16 mb-4 relative z-10">
                        {/* Profile Image */}
                        <div className="relative flex-shrink-0 mx-auto md:mx-0">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden relative">
                                <Image
                                    src={profileImage}
                                    alt={group.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Admin Badge */}
                            {isAdmin && (
                                <div
                                    className="absolute bottom-2 right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white shadow-md text-white"
                                    title="You are admin"
                                >
                                    <Shield className="w-4 h-4" />
                                </div>
                            )}

                            {/* Member Badge */}
                            {isMember && !isAdmin && (
                                <div
                                    className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md text-white"
                                    title="Member"
                                >
                                    <UserCheck className="w-4 h-4" />
                                </div>
                            )}

                            {/* Camera Button (admin only) */}
                            {isAdmin && (
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
                                        disabled={updateGroup.isPending}
                                        className="absolute bottom-2 left-2 w-8 h-8 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center border-2 border-white shadow-md text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Change profile picture"
                                    >
                                        {updateGroup.isPending ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Camera className="w-4 h-4" />
                                        )}
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Main Info */}
                        <div className="flex-1 text-center md:text-left pt-2 md:pt-0 md:pb-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                                <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500 justify-center md:justify-start">
                                <span>{group.memberCount} {group.memberCount === 1 ? 'member' : 'members'}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 justify-center md:justify-end md:pb-4">
                            {isAdmin ? (
                                <>
                                    <button
                                        onClick={() => setIsEditModalOpen(true)}
                                        className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
                                    >
                                        <Settings className="w-4 h-4" />
                                        Edit Group
                                    </button>
                                    <button
                                        onClick={() => setIsDeleteModalOpen(true)}
                                        className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleJoinLeave}
                                    disabled={joinMutation.isPending || leaveMutation.isPending}
                                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${isMember
                                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                                        }`}
                                >
                                    {joinMutation.isPending || leaveMutation.isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Loading...
                                        </>
                                    ) : isMember ? (
                                        <>
                                            <UserMinus className="w-4 h-4" />
                                            Leave Group
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="w-4 h-4" />
                                            Join Group
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-1 border-t border-gray-100 pt-1 mt-6 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.id}
                                href={`/groups/${groupId}?tab=${tab.id}`}
                                className={`relative px-6 py-4 text-sm font-bold transition-all flex-shrink-0 ${activeTab === tab.id
                                    ? "text-blue-600"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    {tab.icon}
                                    {tab.label}
                                </span>
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full mx-4" />
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Edit Group Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Edit Group</h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Group Name */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Group Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter group name"
                                    maxLength={100}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    placeholder="Describe your group..."
                                    rows={4}
                                    maxLength={500}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleGroupInfoSave}
                                disabled={updateGroup.isPending}
                                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {updateGroup.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-red-600">Delete Group</h2>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                disabled={deleteMutation.isPending}
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-600" />
                            </div>
                            <p className="text-gray-800 text-center mb-2">
                                Are you sure you want to delete <span className="font-bold">{group.name}</span>?
                            </p>
                            <p className="text-sm text-gray-500 text-center">
                                This action cannot be undone. All posts, members, and data will be permanently removed.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                disabled={deleteMutation.isPending}
                                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteGroup}
                                disabled={deleteMutation.isPending}
                                className="flex-1 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {deleteMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Delete Permanently
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
