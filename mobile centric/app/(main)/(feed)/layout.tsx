export default function FeedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex-1 h-full overflow-y-auto">
            {children}
        </main>
    );
}
