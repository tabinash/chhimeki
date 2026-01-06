export default function GroupsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="h-full">
            {children}
        </main>
    );
}
