import { BusinessLeftSidebar } from "./BusinessLeftSidebar";

export default function BusinessLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-full">
            {/* Left Sidebar */}
            {/* <div className="hidden lg:block h-full overflow-y-auto border-r border-gray-100">
                <BusinessLeftSidebar />
            </div> */}

            <main className="flex-1 min-w-0 h-full overflow-y-auto">
                {children}
            </main>


            {/* Right Sidebar (Optional/Placeholder) */}
            {/* <div className="hidden xl:block w-80 h-full border-l border-gray-100 p-4">
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2">Did you know?</h3>
                    <p className="text-sm text-blue-600">
                        85% of Chhimeki users prefer buying from local shops that share daily updates.
                    </p>
                </div>
            </div> */}
        </div>
    );
}
