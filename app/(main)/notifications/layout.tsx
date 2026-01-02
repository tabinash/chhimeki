"use client";

import { useFeedLayout } from "@/hooks/useFeedLayout";
import { FeedRightSidebar } from "@/app/(main)/(feed)/FeedRightSidebar";

export default function NotificationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { main, rightPanel } = useFeedLayout();

    return (
        <>
            <main
                className="flex-1 h-full overflow-y-auto"
                style={{ maxWidth: main.width }}
            >
                {children}
            </main>


        </>
    );
}
