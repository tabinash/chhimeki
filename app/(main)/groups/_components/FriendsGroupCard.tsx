"use client";

interface FriendsGroupCardProps {
    name: string;
    members: string;
    image: string;
    memberAvatars: string[];
}

export function FriendsGroupCard({ name, members, image, memberAvatars }: FriendsGroupCardProps) {
    return (
        <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-white">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
                    {name}
                </h3>
                <p className="text-xs text-gray-500 mb-1.5">{members}</p>
                <div className="flex items-center">
                    {memberAvatars.map((avatar, idx) => (
                        <div
                            key={idx}
                            className="w-6 h-6 rounded-full overflow-hidden border-2 border-gray-50 -ml-2 first:ml-0"
                        >
                            <img
                                src={avatar}
                                alt="Member"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button className="px-4 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm flex-shrink-0 border border-gray-200">
                Join Group
            </button>
        </div>
    );
}
