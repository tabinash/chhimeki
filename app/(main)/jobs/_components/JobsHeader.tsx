"use client";

interface JobsHeaderProps {
    viewMode: 'all' | 'my jobs';
    onViewModeChange: (mode: 'all' | 'my jobs') => void;
}

export function JobsHeader({ viewMode, onViewModeChange }: JobsHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-100 pb-6 md:pb-0 md:border-0">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Neighborhood Jobs</h1>
                <p className="text-gray-500 text-sm mt-1">Find work nearby or hire a neighbor.</p>
            </div>

            <div className="flex items-center gap-4 bg-gray-100/80 p-1.5 rounded-xl self-start md:self-auto">
                <button
                    onClick={() => onViewModeChange('all')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    All Jobs
                </button>
                <button
                    onClick={() => onViewModeChange('my jobs')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'my jobs' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    My Jobs
                </button>
            </div>
        </div>
    );
}
