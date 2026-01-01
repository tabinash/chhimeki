"use client";
import { MessagesSidebar } from "./MessagesSidebar";

export default function MessagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Left Sidebar - Conversation List */}
            <div className="flex-shrink-0 w-80 lg:w-96 border-r border-gray-200 flex flex-col bg-white h-full overflow-hidden">
                <MessagesSidebar />
            </div>

            {/* Main Chat Area */}
            <main className="flex-1 min-w-0 h-full overflow-hidden">
                {children}
            </main>
        </>
    );
}
