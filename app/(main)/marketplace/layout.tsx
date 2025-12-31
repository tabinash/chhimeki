import { MarketplaceRightSidebar } from "./MarketplaceRightSidebar";

export default function MarketplaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <MarketplaceRightSidebar />
            {/* Main Marketplace Content */}
            <main className="flex-1 min-w-0 h-full overflow-y-auto">
                {children}
            </main>

            {/* Marketplace-specific Right Sidebar */}
            <div className="flex-shrink-0 h-full overflow-y-auto">
            </div>
        </>
    );
}
