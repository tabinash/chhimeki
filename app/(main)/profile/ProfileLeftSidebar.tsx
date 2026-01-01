"use client";

import Image from "next/image";
import {
    Briefcase,
    Home,
    MapPin,
    Calendar
} from "lucide-react";
import { UserProfile } from "@/data/mockProfileData";

interface ProfileLeftSidebarProps {
    user: UserProfile;
    isOwnProfile: boolean;
}

export default function ProfileLeftSidebar({ user, isOwnProfile }: ProfileLeftSidebarProps) {
    return (
        <div className="space-y-6 lg:sticky lg:top-5 lg:h-fit">

            {/* Intro Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Intro</h2>
                <div className="space-y-4 text-sm">
                    {/* Job */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <Briefcase className="w-5 h-5 text-gray-400" />
                        <span>Works at <span className="font-bold text-gray-900">Freelance</span></span>
                    </div>

                    {/* Lives in */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <Home className="w-5 h-5 text-gray-400" />
                        <span>Lives in <span className="font-bold text-gray-900">{user.tole}, {user.city}</span></span>
                    </div>

                    {/* From */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span>From <span className="font-bold text-gray-900">{user.city}, Nepal</span></span>
                    </div>

                    {/* Joined */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span>Joined <span className="font-bold text-gray-900">{user.joinedDate}</span></span>
                    </div>
                </div>

                {isOwnProfile && (
                    <button className="w-full mt-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm transition-colors">
                        Edit Details
                    </button>
                )}
            </div>



        </div>
    );
}
