export default function ExploreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex-1 min-w-0 h-full">
            {children}
        </main>
    );
}
