"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { useResponsive } from "@/hooks/useResponsive";


export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { screenSize,
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
        width,
        layout } = useResponsive();
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header - Fixed at top */}
            <Header />

            {/* Main Layout */}
            <div className="flex-1 flex justify-left">
                {/* Container with max-width */}
                <div className="w-full max-w-[1400px] flex h-[calc(100vh-64px)] overflow-hidden">
                    {/* Left Sidebar - Sticky */}
                    <div className="flex-shrink-0 h-full overflow-y-auto">
                        <Sidebar />
                    </div>

                    {/* Main Content Area - Scrollable - Children will add their own right sidebars */}
                    <div className="flex-1 flex min-w-0 h-full">
                        {children}
                    </div>
                    {/* in a systematic and semantic and logical hirrrerachy show the useresponse hook parameters in this left over space */}
                    <div>

                    </div>

                </div>
                {/* in a systematic and semantic and logical hirrrerachy show the useresponse hook parameters in this left over space */}



            </div>
        </div>
    );
}
