"use client";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { useSearchParams } from "next/navigation";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const searchParams = useSearchParams();
    const showHeader = searchParams.get("header") === "true";
    const showBottomNav = searchParams.get("bottomNav") === "false";

    return (
        <div className="min-h-screen">
            {/* Header - Conditional Rendering */}
            {showHeader && <Header />}

            {/* Main Content Area */}
            <div className="pb-20 px-0">
                <div className="w-full max-w-md mx-auto min-h-[calc(100vh-180px)]">
                    {children}
                </div>
            </div>

            {/* Bottom Navigation */}
            {!showBottomNav && <BottomNav />}
        </div>
    );
}
