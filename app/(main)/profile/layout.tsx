"use client";

import { useSearchParams } from "next/navigation";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {




    return (
        <main className="flex-1 h-full min-h-screen  max-w-[1035px]">

            {children}
        </main>
    );
}
