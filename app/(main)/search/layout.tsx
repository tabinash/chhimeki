export default function SearchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Main Search Content */}
            <main className="flex-1 max-w-3xl  h-full overflow-y-auto">
                {children}
            </main>
        </>
    );
}
