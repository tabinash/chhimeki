export function InstitutionCardSkeleton() {
    return (
        <div className="bg-white rounded-3xl p-5 flex items-center gap-3 shadow-sm animate-pulse">
            <div className="w-16 h-16 rounded-2xl bg-gray-200" />
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
        </div>
    );
}
