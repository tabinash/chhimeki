"use client";
import { FeedRightSidebar } from "./FeedRightSidebar";
import { useFeedLayout } from "@/hooks/useFeedLayout";

export default function FeedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { main, rightPanel } = useFeedLayout();

    return (
        <div className="flex h-full ">
            <main
                className="flex-1 h-full overflow-y-auto "
                style={{ maxWidth: main.width }}
            >
                {children}
            </main>

            {rightPanel.visible && (
                <div className="flex-shrink-0 h-full overflow-y-auto ">
                    <FeedRightSidebar
                        width={rightPanel.width}
                        compact={rightPanel.compact}
                    />
                </div>
            )}
        </div>
    );
}
