"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, CheckCircle2, Users } from "lucide-react";
import { groups } from "@/data/explore";

export default function GroupsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-8">
            {/* Header */}
            <div className="bg-white sticky top-0 z-10 px-4 py-3 shadow-sm flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <div className="flex-1">
                    <h1 className="text-lg font-bold text-gray-900 leading-tight">Communities</h1>
                    <p className="text-xs text-gray-500">Find your tribe</p>
                </div>
            </div>

            {/* Search */}
            <div className="p-4 bg-white border-b border-gray-100">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-xl">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search groups..."
                        className="flex-1 bg-transparent text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Groups List */}
            <div className="p-4 space-y-3">
                {filteredGroups.length > 0 ? (
                    filteredGroups.map((group) => (
                        <div
                            key={group.id}
                            className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex gap-4"
                        >
                            <img
                                src={group.avatar}
                                alt={group.name}
                                className="w-16 h-16 rounded-xl object-cover bg-gray-100"
                            />

                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 truncate">
                                        {group.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                        {group.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Users className="w-3.5 h-3.5" />
                                            {group.members}
                                        </div>
                                        {group.verified && (
                                            <div className="flex items-center gap-0.5 text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
                                                Verified <CheckCircle2 className="w-3 h-3" />
                                            </div>
                                        )}
                                    </div>

                                    <button className="px-4 py-1.5 text-xs font-bold bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                                        Join
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                        <p className="text-sm font-medium">No groups found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}
