"use client";

import { use } from "react";
import GroupHeader from "../_components/GroupHeader";
import { useGetGroupById } from "../_hook";

interface GroupLayoutProps {
    params: Promise<{
        id: string;
    }>;
    children: React.ReactNode;
}

export default function GroupLayout({ params, children }: GroupLayoutProps) {
    // Unwrap the Promise using React's use() hook (Next.js 16+)
    const { id } = use(params);
    const groupId = parseInt(id, 10);

    // Fetch group data from API
    const { data: groupData, isLoading, error } = useGetGroupById(groupId);

    // Loading state
    if (isLoading) {
        return (
            <main>
                <div className="bg-white animate-pulse">
                    <div className="h-40 bg-gray-200" />
                    <div className="px-4 -mt-10">
                        <div className="w-24 h-24 rounded-2xl bg-gray-300 border-4 border-white" />
                        <div className="h-6 w-48 bg-gray-200 rounded mt-4" />
                        <div className="h-4 w-64 bg-gray-200 rounded mt-2" />
                        <div className="h-4 w-32 bg-gray-200 rounded mt-3" />
                    </div>
                    <div className="px-4 mt-6 flex gap-6 border-b border-gray-200 pb-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-4 w-16 bg-gray-200 rounded" />
                        ))}
                    </div>
                </div>
                {children}
            </main>
        );
    }

    // Error state
    if (error || !groupData?.data) {
        return (
            <main>
                <div className="p-8 text-center">
                    <p className="text-red-500 font-medium">Failed to load group</p>
                    <p className="text-gray-500 text-sm mt-1">Please try again later</p>
                </div>
            </main>
        );
    }

    const group = groupData.data;

    return (
        <main>
            <GroupHeader group={group} />
            {children}
        </main>
    );
}
