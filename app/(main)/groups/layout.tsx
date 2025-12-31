import { GroupsRightSidebar } from "./GroupsRightSidebar";

export default function GroupsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Main Groups Content */}
            <main className="flex-1 min-w-0 h-full overflow-y-auto">
                {children}
            </main>

            {/* Groups-specific Right Sidebar */}
            <div className="flex-shrink-0 h-full overflow-y-auto">
                <GroupsRightSidebar />
            </div>
        </>
    );
}
