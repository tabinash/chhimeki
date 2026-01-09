"use client";

import Image from "next/image";
import {
    Briefcase,
    Home,
    MapPin,
    Calendar,
    Mail,
    Phone
} from "lucide-react";
import { UserProfileResponse } from "@/types/api/user";

interface ProfileLeftSidebarProps {
    user: UserProfileResponse;
}

export default function ProfileLeftSidebar({ user }: ProfileLeftSidebarProps) {
    // Format created date
    const joinedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="space-y-6 lg:sticky lg:top-5 lg:h-fit">

            {/* Intro Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Intro</h2>
                <div className="space-y-4 text-sm">
                    {/* User Type */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <Briefcase className="w-5 h-5 text-gray-400" />
                        <span>
                            {user.userType === "GENERAL" && "General User"}
                            {user.userType === "GOVERNMENT_OFFICE" && <span className="font-bold text-gray-900">Government Office</span>}
                            {user.userType === "BUSINESS" && <span className="font-bold text-gray-900">Business</span>}
                        </span>
                    </div>

                    {/* Lives in */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <Home className="w-5 h-5 text-gray-400" />
                        <span>Lives in <span className="font-bold text-gray-900">{user.palika}</span></span>
                    </div>

                    {/* Ward */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span>Ward <span className="font-bold text-gray-900">{user.wada}</span>, {user.district}</span>
                    </div>

                    {/* Joined */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span>Joined <span className="font-bold text-gray-900">{joinedDate}</span></span>
                    </div>
                </div>
                {/* email */}
                <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>Email <span className="font-bold text-gray-900">{user.email}</span></span>
                </div>

                {/* phone number */}
                <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>Phone <span className="font-bold text-gray-900">{user.phone}</span></span>
                </div>

                {user.isMine && (
                    <button className="w-full mt-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm transition-colors">
                        Edit Details
                    </button>
                )}
            </div>



        </div>
    );
}
