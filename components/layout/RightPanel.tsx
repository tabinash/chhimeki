"use client";
import Image from "next/image";
import { Search } from "lucide-react";
import { useResponsive } from "@/hooks/useResponsive";

const contacts = [
    {
        name: "Julia Austin",
        username: "@jk.kkk",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        messageCount: 5,
    },
    {
        name: "Luca Nicole",
        username: "@jk.kkk",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        messageCount: 2,
    },
    {
        name: "Claire Eric",
        username: "@cla.eric",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
        time: "6 mins",
    },
    {
        name: "Reynra Chris",
        username: "@rey.chris",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
        time: "12 mins",
    },
];

const groups = [
    {
        name: "Ui Design Team",
        members: "Freelance",
        icon: "🎨",
        bgColor: "bg-[#daf4aa]",
        memberCount: 5,
    },
    {
        name: "Motion graphic team",
        members: "Freelance",
        icon: "🎬",
        bgColor: "bg-cyan-100",
        memberCount: 2,
    },
    {
        name: "Ux design team",
        members: "Freelance",
        icon: "🎯",
        bgColor: "bg-pink-100",
        time: "6 mins",
    },
];

export function RightPanel() {
    const { layout } = useResponsive();

    // Only show when visible flag is true
    if (!layout.rightPanel.visible) return null;

    const isCompact = layout.rightPanel.compact;

    return (
        <aside
            className="flex-shrink-0 flex flex-col p-4 transition-all duration-300"
            style={{ width: `${layout.rightPanel.width}px` }}
        >
            {/* Main Card Container */}
            <div className="bg-white rounded-3xl shadow-sm p-4 flex flex-col h-full overflow-hidden">
                {/* Contact Section */}
                <div className="mb-4">
                    <h2 className={`font-semibold text-gray-900 mb-3 ${isCompact ? 'text-base' : 'text-xl'}`}>
                        Contact
                    </h2>
                    <div className="space-y-2">
                        {contacts.slice(0, isCompact ? 3 : 4).map((contact, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <div className={`relative rounded-full overflow-hidden flex-shrink-0 ${isCompact ? 'w-8 h-8' : 'w-10 h-10'}`}>
                                    <Image
                                        src={contact.avatar}
                                        alt={contact.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                {!isCompact && (
                                    <>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {contact.name}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {contact.username}
                                            </p>
                                        </div>
                                        {contact.messageCount ? (
                                            <div className="w-6 h-6 rounded-full bg-[#daf4aa] flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs font-semibold text-black">
                                                    {contact.messageCount}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400 flex-shrink-0">
                                                {contact.time}
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Groups Section */}
                <div className="mb-4 flex-1 overflow-y-auto">
                    <h2 className={`font-semibold text-gray-900 mb-3 ${isCompact ? 'text-base' : 'text-xl'}`}>
                        Groups
                    </h2>
                    <div className="space-y-2">
                        {groups.slice(0, isCompact ? 2 : 3).map((group, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <div
                                    className={`rounded-full ${group.bgColor} flex items-center justify-center flex-shrink-0 ${isCompact ? 'w-8 h-8 text-base' : 'w-10 h-10 text-lg'}`}
                                >
                                    {group.icon}
                                </div>
                                {!isCompact && (
                                    <>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {group.name}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">{group.members}</p>
                                        </div>
                                        {group.memberCount ? (
                                            <div className="w-6 h-6 rounded-full bg-[#daf4aa] flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs font-semibold text-black">
                                                    {group.memberCount}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400 flex-shrink-0">
                                                {group.time}
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search Bar - Only show in full mode */}
                {!isCompact && (
                    <div className="mt-auto pt-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
