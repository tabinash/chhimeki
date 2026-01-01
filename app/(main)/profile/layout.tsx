export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main
            className="flex-1 h-full overflow-y-auto max-w-[1035px]"
        >
            {children}
        </main>
    );
}
