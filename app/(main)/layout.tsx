"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/header";


export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="min-h-screen bg-white ">
            {/* Header - Fixed at top */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white">
                <Header />
            </div>

            {/* Main Layout - with top padding for fixed header */}
            <div className="flex pt-16">
                {/* Container with max-width */}
                <div className="w-full max-w-[1400px] flex mx-auto">
                    {/* Left Sidebar - Sticky */}
                    <div className="flex-shrink-0 sticky top-16 h-[calc(100vh-64px)] self-start">
                        <Sidebar />
                    </div>

                    {/* Main Content Area - flows naturally, uses window scroll */}
                    <div className="flex-1 flex min-w-0 ">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
