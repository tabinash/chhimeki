import { ExploreRightSidebar } from "./ExploreRightSidebar";

export default function ExploreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Main Explore Content */}
            <main className="flex-1 min-w-0 h-full overflow-y-auto">
                {children}
            </main>

            {/* Explore-specific Right Sidebar */}
            <div className="flex-shrink-0 h-full overflow-y-auto">
                <ExploreRightSidebar />
            </div>
        </>
    );
}
