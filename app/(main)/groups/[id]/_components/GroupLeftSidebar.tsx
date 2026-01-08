"use client";

import Image from "next/image";
import { Users, Calendar, Shield, User } from "lucide-react";
import { GroupResponse } from "@/types/api/group";

interface GroupLeftSidebarProps {
    group: GroupResponse;
}

export default function GroupLeftSidebar({ group }: GroupLeftSidebarProps) {
    // Format created date
    const createdDate = new Date(group.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="space-y-6 lg:sticky lg:top-5 lg:h-fit">
            {/* About Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>

                {group.description ? (
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {group.description}
                    </p>
                ) : (
                    <p className="text-sm text-gray-400 italic mb-4">
                        No description provided
                    </p>
                )}

                <div className="space-y-4 text-sm border-t border-gray-100 pt-4">
                    {/* Members */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span>
                            <span className="font-bold text-gray-900">{group.memberCount}</span> members
                        </span>
                    </div>

                    {/* Admin */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <Shield className="w-5 h-5 text-gray-400" />
                        <div className="flex items-center gap-2">
                            <span>Created by</span>
                            <div className="flex items-center gap-1.5">
                                {group.admin.profilePicture && (
                                    <Image
                                        src={group.admin.profilePicture}
                                        alt={group.admin.name}
                                        width={20}
                                        height={20}
                                        className="rounded-full"
                                    />
                                )}
                                <span className="font-bold text-gray-900">{group.admin.name}</span>
                            </div>
                        </div>
                    </div>

                    {/* Created */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span>
                            Created <span className="font-bold text-gray-900">{createdDate}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
