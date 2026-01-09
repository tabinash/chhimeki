export function UserCardSkeleton() {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
            <div className="aspect-[4/3] bg-gray-200" />
            <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-10 bg-gray-200 rounded" />
            </div>
        </div>
    );
}
