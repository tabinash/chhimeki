"use client";

interface SuggestedGroupCardProps {
    name: string;
    members: string;
    image: string;
}

export function SuggestedGroupCard({ name, members, image }: SuggestedGroupCardProps) {
    return (
        <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden bg-white">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-0.5">
                    {name}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{members}</p>
                <button className="w-full py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm border border-gray-200">
                    Join Group
                </button>
            </div>
        </div>
    );
}
