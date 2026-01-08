"use client";


export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <main className="flex-1 min-h-screen overflow-y-auto max-w-[1035px]">

            {children}
        </main>
    );
}
