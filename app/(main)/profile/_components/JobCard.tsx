import Link from "next/link";

interface JobCardProps {
    job: {
        id: number;
        title: string;
        employer: string;
        salary: string;
        type: string;
        posted: string;
    };
    isOwnProfile: boolean;
}

export default function JobCard({ job, isOwnProfile }: JobCardProps) {
    return (
        <div className="p-4 bg-white">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="font-bold text-gray-900 text-base">{job.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-medium text-gray-600">{job.employer}</span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold">
                            {job.type}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-500 mt-3">
                <span className="font-semibold text-green-700">💰 {job.salary}</span>
                <span>•</span>
                <span>{job.posted}</span>
            </div>

            <div className="mt-3 flex gap-2">
                <Link
                    href={`/jobs/${job.id}`}
                    className="flex-1 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold text-center hover:bg-gray-800 transition-colors"
                >
                    Apply Now
                </Link>
                {isOwnProfile && (
                    <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors">
                        Manage
                    </button>
                )}
            </div>
        </div>
    );
}
