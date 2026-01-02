import { MarketplaceLeftSidebar } from "./MarketplaceLeftSidebar";

export default function MarketplaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Main Marketplace Content */}
            <div className="flex-shrink-0 h-full overflow-y-auto">
                <MarketplaceLeftSidebar />
            </div>
            <main className="flex-1 min-w-0 h-full overflow-y-auto">
                {children}
            </main>

            {/* Marketplace-specific Right Sidebar */}
        </>
    );
}
