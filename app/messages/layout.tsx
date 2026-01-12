"use client";
import { useSearchParams } from "next/navigation";
import { MessagesSidebar } from "./_components/MessagesSidebar";

export default function MessagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const searchParams = useSearchParams();
    const hideSidebar = searchParams.get("hideMessageSidebar") === "true";

    return (
        <div className="flex h-screen w-full bg-white">
            {/* Left Sidebar - Conversation List */}
            {!hideSidebar && (
                <div className="flex-shrink-0 w-80 lg:w-96 border-r border-gray-200 flex flex-col bg-white h-full overflow-hidden">
                    <MessagesSidebar />
                </div>
            )}

            {/* Main Chat Area */}
            <main className="flex-1 min-w-0 h-full overflow-hidden flex flex-col">
                {children}
            </main>
        </div>
    );
}
