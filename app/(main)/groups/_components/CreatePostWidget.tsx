"use client";

import { useState } from "react";
import { Edit3 } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import CreatePostModal from "../_modal/CreatePostModal";

interface CreatePostWidgetProps {
    groupId: number;
}

export default function CreatePostWidget({ groupId }: CreatePostWidgetProps) {
    const { user } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!user) return null;

    return (
        <>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        {user.profilePicture ? (
                            <Image
                                src={user.profilePicture}
                                alt={user.name}
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                        )}
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex-1 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-500 text-left rounded-xl transition-colors text-sm"
                    >
                        What's on your mind?
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                    >
                        <Edit3 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                groupId={groupId}
            />
        </>
    );
}
