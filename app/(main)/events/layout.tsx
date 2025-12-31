import { EventsRightSidebar } from "./EventsRightSidebar";

export default function EventsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Main Events Content */}
            <main className="flex-1 min-w-0 h-full overflow-y-auto">
                {children}
            </main>

            {/* Events-specific Right Sidebar */}
            <div className="flex-shrink-0 h-full overflow-y-auto">
                <EventsRightSidebar />
            </div>
        </>
    );
}
