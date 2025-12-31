import { JobsRightSidebar } from "./JobsRightSidebar";

export default function JobsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Main Jobs Content */}
            <main className="flex-1 min-w-0 h-full overflow-y-auto">
                {children}
            </main>

            {/* Jobs-specific Right Sidebar */}
            <div className="flex-shrink-0 h-full overflow-y-auto">
                <JobsRightSidebar />
            </div>
        </>
    );
}
