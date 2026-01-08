
export default function MarketplaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex-1 min-w-0 h-full overflow-y-auto">
            {children}
        </main>
    );
}
