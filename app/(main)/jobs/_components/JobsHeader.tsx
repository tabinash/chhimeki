"use client";

interface JobsHeaderProps {
    viewMode: 'seeking' | 'hiring';
    onViewModeChange: (mode: 'seeking' | 'hiring') => void;
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
                    onClick={() => onViewModeChange('seeking')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'seeking' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Find Work
                </button>
                <button
                    onClick={() => onViewModeChange('hiring')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'hiring' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Hiring
                </button>
            </div>
        </div>
    );
}
