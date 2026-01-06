import { CheckCircle2 } from "lucide-react";

interface PeopleCardProps {
    user: {
        name: string;
        username: string;
        avatar: string;
        verified: boolean;
    };
}

export default function PeopleCard({ user }: PeopleCardProps) {
    return (
        <div className="snap-start flex-shrink-0 w-[140px] bg-white border border-gray-300 rounded-2xl p-3 text-center shadow-sm">
            <div className="relative w-16 h-16 mx-auto">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                />
                {user.verified && (
                    <span className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                    </span>
                )}
            </div>
            <h3 className="mt-2 text-sm font-semibold truncate">
                {user.name}
            </h3>
            <p className="text-[10px] text-gray-500 truncate">
                {user.username}
            </p>
            <button className="mt-2 w-full py-1.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-lg">
                Follow
            </button>
        </div>
    );
}
