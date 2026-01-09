"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";


export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="min-h-screen flex flex-col ">
            {/* Header - Fixed at top */}
            <Header />

            {/* Main Layout */}
            <div className="flex-1 flex justify-left ">
                {/* Container with max-width */}
                <div className="w-full max-w-[1400px] flex h-[calc(100vh-64px)] ">
                    {/* Left Sidebar - Sticky */}
                    <div className="flex-shrink-0 h-full ">
                        <Sidebar />
                    </div>

                    {/* Main Content Area - Scrollable - Children will add their own right sidebars */}
                    <div className="flex-1 flex min-w-0 h-full ">
                        {children}
                    </div>


                </div>



            </div>
        </div>
    );
}
