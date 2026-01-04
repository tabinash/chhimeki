interface OrganizationCardProps {
    organization: {
        name: string;
        type: string;
        icon: string;
    };
}

export default function OrganizationCard({ organization }: OrganizationCardProps) {
    return (
        <div className="snap-center w-[240px] flex-shrink-0 bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden">
            <div className="h-20 bg-gray-100 relative">
                <span className="absolute -bottom-5 left-4 text-3xl">
                    {organization.icon}
                </span>
            </div>
            <div className="pt-7 px-4 pb-4">
                <h3 className="font-bold">{organization.name}</h3>
                <p className="text-xs text-gray-500">{organization.type}</p>
                <button className="mt-2 px-3 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg">
                    Follow
                </button>
            </div>
        </div>
    );
}
