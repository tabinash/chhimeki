interface JobCardProps {
    id: string;
    title: string;
    company: string;
    type: "Full-time" | "Part-time" | "One-time";
    salary: string;
    postedDate: string;
    status: "Open" | "Closed";
    isOwnProfile?: boolean;
}

export default function JobCard({
    title,
    company,
    type,
    salary,
    postedDate,
    status,
    isOwnProfile = false
}: JobCardProps) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors cursor-pointer">
                        {title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium text-gray-700">{company}</span>
                        <span className="text-gray-300">•</span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs font-bold">
                            {type}
                        </span>
                    </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${status === 'Open'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                    {status}
                </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-50">
                <span className="font-semibold text-green-600 flex items-center gap-1">
                    💰 {salary}
                </span>
                <span className="flex items-center gap-1">
                    🕒 {postedDate}
                </span>
            </div>

            <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
                    Apply Now
                </button>
                {isOwnProfile && (
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
                        Manage
                    </button>
                )}
            </div>
        </div>
    );
}
