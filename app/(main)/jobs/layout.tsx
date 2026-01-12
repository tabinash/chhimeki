"use client";
import { JobsRightSidebar } from "./_components/JobsRightSidebar";
import { useContentLayout } from "@/hooks/useContentLayout";

export default function JobsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { main, rightPanel } = useContentLayout("jobs");

    return (
        <div className="flex min-h-full w-full justify-center">
            {/* Main + Right sidebar container - both grow proportionally */}
            <div className="flex w-full ">
                {/* Main content - dynamic width */}
                <main
                    className="flex-shrink-0 min-h-screen"
                    style={{ width: main.width }}
                >
                    {children}
                </main>

                {/* Right sidebar - dynamic width, sticky */}
                {rightPanel.visible && (
                    <aside
                        className="flex-shrink-0 sticky top-16 max-h-[calc(100vh-64px)] overflow-y-auto self-start scrollbar-hide"
                        style={{ width: rightPanel.width }}
                    >
                        <JobsRightSidebar width={rightPanel.width} />
                    </aside>
                )}
            </div>
        </div>
    );
}
