export default function MessagesLayout({
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
