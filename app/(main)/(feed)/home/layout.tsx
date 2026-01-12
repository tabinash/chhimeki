"use client";
import { FeedRightSidebar } from "./_components/FeedRightSidebar";
import { useFeedLayout } from "@/hooks/useFeedLayout";

export default function FeedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { main, rightPanel } = useFeedLayout();

    return (
        <div className="flex min-h-full w-full justify-center">
            {/* 
                Main + Right sidebar container
                Both grow proportionally based on available space
            */}
            <div className="flex w-full gap-6">
                {/* Main content - dynamic width */}
                <main
                    className="flex-shrink-0"
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
                        <FeedRightSidebar
                            width={rightPanel.width}
                            compact={rightPanel.compact}
                        />
                    </aside>
                )}
            </div>
        </div>
    );
}
