import { CheckCircle2 } from "lucide-react";

interface GroupCardProps {
    group: {
        id: number;
        name: string;
        description: string;
        avatar: string;
        members: string;
        verified: boolean;
    };
}

export default function GroupCard({ group }: GroupCardProps) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white border text-start border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <img
                src={group.avatar}
                alt={group.name}
                className="w-12 h-12 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold truncate text-gray-900">
                    {group.name}
                </h3>
                <p className="text-xs text-gray-500 truncate mb-0.5">
                    {group.description}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                    <span>{group.members}</span>
                    {group.verified && (
                        <>
                            <span>•</span>
                            <span className="text-blue-600 flex items-center gap-0.5">
                                Verified <CheckCircle2 className="w-2.5 h-2.5" />
                            </span>
                        </>
                    )}
                </div>
            </div>
            <button className="px-4 py-2 text-xs font-bold bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                Join
            </button>
        </div>
    );
}
