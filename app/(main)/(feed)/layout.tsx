import { FeedRightSidebar } from "./FeedRightSidebar";

export default function FeedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Main Feed Content */}
            <main className="flex-1 min-w-0 h-full overflow-y-auto">
                {children}
            </main>

            {/* Feed-specific Right Panel */}
            <div className="flex-shrink-0 h-full overflow-y-auto">
                <FeedRightSidebar />
            </div>
        </>
    );
}
